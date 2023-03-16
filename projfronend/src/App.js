// import React from 'react';
// //Routes in place of switch
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import Home from './Home';
// import User from './User';
// import Visit from './Visit';
// import Error from './ErrorPage';


// export default function App(){
//   return(
//     <Router>
//       <ul>
//         <li><Link to = "/">Home</Link></li>
//         <li><Link to = "/user">user</Link></li>
//         <li><Link to = "/visit">visit</Link></li>
//       </ul>
//       <Routes>
//           <Route path = "/" element = {<Home/>}/>
//           <Route path = "/user/:username" element = {<User/>}/>x
//           <Route path = "/visit" element = {<Visit/>}/>
//           <Route path = "*" element = {<Error/>}/>
//       </Routes>
//   </Router>
//   )
// }
import React from "react";

export default function App(){
    return(
        <div>
            <h1>Hello from App.js</h1>
        </div>
    )
}