import React from 'react'
import { Link, useNavigate } from'react-router-dom'

const CurrTab = (history, path) => {
    // const location = useLocation();
    if(history.location.pathname === path){
        return{
            color: "#2ecc72"
        };
    }
    else{
        return{
            color: "FFFFFF"
        };
    }
};

export default function Menu({history}){
    const navigate = useNavigate();
    return(
        <div>
            <ul className = 'nav nav-tabs bg-dark'>
                <li className = 'nav-item'>
                    <Link style = {CurrTab(history, "/")} className = 'nav-link' to = "/">
                        Home
                    </Link>
                </li>
                <li className = 'nav-item'>
                    <Link style = {CurrTab(history, "/cart")} className = 'nav-link' to = {"/cart"}>
                        Cart
                    </Link>
                </li>
                <li className = 'nav-item'>
                    <Link style = {CurrTab(history, "/user/dashboard")} className = 'nav-link' to = {"/user/dashboard"}>
                        Dashboard
                    </Link>
                </li>
                <li className = 'nav-item'>
                    <Link style = {CurrTab(history, "/admin/dashboard")} className = 'nav-link' to = {"/admin/dashboard"}>
                        Admin Dashboard
                    </Link>
                </li>
                <li className = 'nav-item'>
                    <Link style = {CurrTab(history, "/signup")} className = 'nav-link' to = {"/signup"}>
                        SignUp
                    </Link>
                </li>
                <li className = 'nav-item'>
                    <Link style = {CurrTab(history, "/signin")} className = 'nav-link' to = {"/signin"}>
                        SignIn
                    </Link>
                </li>
                <li className = 'nav-item'>
                    <Link style = {CurrTab(history, "/signout")} className = 'nav-link' to = {"/signout"}>
                        SignOut
                    </Link>
                </li>
            </ul>
        </div>
    )
}

// export default withRouter(Menu);