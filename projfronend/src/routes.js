import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './core/Home';

export default function routes() {
    return(
        <Router>
            <Routes>
                <Route path = "/" element = {<Home/>}/>
            </Routes>
        </Router>
    )
}
