# MERN STACK 
# To-Do List
- Read all bookmarked pages 
- Read about dot environment variables
- Read Documentations
- middleware(body parse, cookie parse, CORS)
- CORS
- template engine
- routing in express(documentation)
- express router
- controllers 
- robo 3T
- postman

## error codes 
- 200 OK 
- 401 Unauthorized
- 500 Internal Server Error 
- 404 Not Found 
- 550 Permission denied
---

## npm init 
<p>npm stands for node package manager and init means initialise. This will create a package.json file</p>

---

## npm i express
<p> to install express in the system and will mark a dependecy in package.json </p>

---

```js
//to use express
//you will have to mention in this file what are you using 
const express = require("express");
const app = express();
```
---

## npm i cors
<p> Cross Origin Resource Sharing
It allows client on a different server to access or retrieve data from your server example a 5500 host will not be able to fetch or retrieve data from a 3000 host as the default policy of Access-Control-Allow-Origin is to  allow the same host only but with cors we can mention which hosts to allow as a header file response</p>

```js
const express = require("express");
const app = express();

const cors = require("cors")
app.use(cors({
    //actual URL 
    origin: "https://localhost:5500",
}))
```

---



## creating a express server
<p> requests are of many types </p>

- get = get any data 
- post = send some data or expecting some data from frontend
- put = updating 
- delete 


```js
const express = require("express");
const app = express();

//can be any port
const port = 3000

//make a request
// '/' route you want to use app.get on can be anything like /login, /signout

//callback (req, res) is also a method doesnt has any name, if using {} then need to return something else ()

//=> defining method on the go

//Each route can have one or more handler functions, which are executed when the route is matched.

//app.METHOD(PATH, HANDLER)
//PATH is a path on the server.
//HANDLER is the function executed when the route is matched.

app.get('/', (req, res) => res.send("Hello world"))


app.listen(port, () => console.log('Example app listening on port {$port}'))
```
---

## nodemon
<p>For "start" script in package.json we can use 'npm start' directly and that will initiate the nodemon but for any other like 'abs' we need to use 'npm run abc'</p> 

---

## Mongoose
<p>For writing things for connections, schemas, rules for MongoDB can be complicated codes. These codes can be simplfied using object modeling.</p>
<p>It is object modeling for NodeJS.</p>


```js
var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        //the database will always require this if it's true
        required: true,
        maxlength: 32,
        //trim spaces
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true,
    },
    userinfo: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    salt: String,
    role: {
        type: Number,
        deafault: 0
    },
    purchases: {
        type: Array,
        default: []
    }
});

//to export this schema 
module.exports = mongoose.model("User", userSchema)
```
<br>

- Virtual Fields - Created either on the go or are computed from existing info that user is already passing.
Example, if we need to extraxct domains from the users's email.

- uuid

- salt

- crypto

---

## Middleware
<p> next - means yes i'm done now pass the request further to another middleware or to responce. Rfere test_backend -> index.js</p>