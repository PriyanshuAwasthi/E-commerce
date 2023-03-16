const User = require("../models/user");
const Order = require("../models/order");


exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((error, user) => {
        if(error || !user) return res.status(400).json({
            error: "No user found"
        });
        req.profile = user;
        next();
    });
};


exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    return res.json(req.profile);
};


exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        {_id: req.profile._id},
        {$set: req.body},
        {new: true, useFindAndModify: false},
        //read about them
        (error, user) => {
            if(error || !user) return res.status(400).json({
                error: "Not authorized"
            })
            user.salt = undefined;
            user.encry_password = undefined;
            return res.json(user);
        }
    );
};
// exports.getAllUsers = (req, res) => {
//     User.find().exec((error, users) => {
//         if(error || !users) return res.status(400).json({
//             error: "No user found"
//         });
//         return res.json(users);
//     });
   
// };


exports.userPurchaseList = (req, res) => {
    Order.find({user: req.profile._id})
    .populate("user", "_id name")
    .exec((error, order) => {
        if(error) return res.status(400).json({
            error: "Not orders to show in this account"
        })
        return res.json(order);
    });
};


exports.pushOrderInPurchaseList = (req, res, next) => {
    const purchase = []
    req.body.order.products.forEach(item => {
        purchase.push({
            _id: item._id,
            name: item.name,
            description: itme.description,
            category: item.category,
            quantity: item.quantity,
            amount: req.body.order.amount,
            transaction_id: req.body.transaction_id
        });
    });
    User.findOneAndUpdate(
        {_id: req.profile._id},
        {$set: {purchases: purchase}},
        {new: true},
        (error, order) => {
            if(error) return res.status(400).json({
                error: "unable to save purchase"
            })
            next();
        }
    );
}