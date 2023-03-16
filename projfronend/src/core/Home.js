import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import "../styles.css"
import { API } from '../backend';
import Base from './Base';
export default function Home(){
    // let navigate = useNavigate();
    console.log("API IS ", API);
    return(
        <Base title='Home Page' description='This is your homepage done in Home.js frontend'>
            <div className = 'row'>
                <div className = 'col-4'>
                    <button className = 'btn btn-success'>TEST</button>
                </div>
                <div className = 'col-4'>
                    <button className = 'btn btn-success'>TEST</button>
                </div>
                <div className = 'col-4'>
                    <button className = 'btn btn-success'>TEST</button>
                </div>
            </div>
        </Base>
    )
}