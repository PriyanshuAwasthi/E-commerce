const express = require("express");
const app = express();
const port = 8000;

// const admin = (req, res) => {
//     return res.send('Hello adminsss')
// };

app.get("/", (req, res) => {
    return res.send('Hello World')
});

// var flag = true; //is working
// const issAdmin = (req, res, next) => {
//     if(!flag) return res.send("not allowed"); // is working
//     console.log("issadmin running");
//     next();
// }

// app.get("/admin", issAdmin, admin);
const test = (req, res, next) => {
    console.log("hello test");
    next();
}
// app.use(test);

// app.get("/login%%", test, (req, res) => {
//     console.log("entering");
//     return res.send('Hello login')
// });

// app.get("/login/:userId/another/anothers/:userName/another/:number/:home-:city", (req, res) => {
//     console.log("entering");
//     return res.send(req.params)
// });

app.route('/book')
  .get((req, res) => {
    res.send('Get a random book')
  })
  .post((req, res) => {
    res.send('Add a book')
  })
  .put((req, res) => {
    res.send('Update the book')
  })


app.listen(port, () => console.log(`Listening on ${port}`));