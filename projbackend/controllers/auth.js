const User = require("../models/user");
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken'); //read
var ejwt = require('express-jwt'); //read  

exports.signUp = (req, res) => {
    // console.log("statement 3");
    // console.log("REQ BODY", req.body);
    // res.json({
    //     message: "SignUp works just fine"
    // });
    // const test = 7;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        // console.log("statement 4");
        console.log(errors);
        return res.status(422).json({
            error: errors.array()[0].msg,
            field: errors.array()[0].param
        });
    }
    const user = new User(req.body);
    user.save((err, user) => {
        if(err){
            return res.status(400).json({
                err: "Not able to create user"
            });
        }
        return res.json({
            name: user.name,
            email: user.email,
            id: user._id
        });
    })
};
// console.log(test);


exports.signIn = (req, res) => {
    // console.log("entering signin");
    const { email, password } = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg,
            field: errors.array()[0].param
        });
    }

    User.findOne({email}, (err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "User email is not registered"
            })
        }
        if(!user.authenticate(password)){
            console.log("singin unsuccessfull");
            return res.status(401).json({
                error: "email and password don't match"
            })
        }
        //create token
        const token = jwt.sign({_id: user._id}, process.env.SECRET)
        
        //put token in cookie
        res.cookie("token", token, {expire: new Date() + 9999});

        //send response to frontend
        const {_id, name, email, role, timestamps} = user;
        console.log("singin successfull");
        return  res.json({token, user: {_id, name, email, role, timestamps}});
    })
}


exports.signOut = (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "User signed out successfully"
    });
};


//protected routes
exports.isSignedIn = ejwt({
    secret: process.env.SECRET,
    userProperty: "auth"
});


//profile will be set from front end if and only if the user is logged in 
exports.isAuthenticated = (req, res, next) => {
    let check = req.profile && req.auth && req.profile._id == req.auth._id
    if(!check){
        return res.status(403).json({
            error: "ACCESS DENIED"
        });
    }
    next();
}


exports.isAdmin = (req, res, next) => {
    if(req.profile.role === 0){
        return res.status(403).json({
            error: "Not an ADMIN. ACCESS DENIED"
        }); 
    }
    next();
}