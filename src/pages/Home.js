import React, { useContext } from 'react';
import './Home.css';
import logo from '../images/rccg-trans-logo.png';
import { Link, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {FaChurch} from 'react-icons/fa';
import {RiAdminFill} from 'react-icons/ri';


const Home = () => {
    const {isAuthenticated} = useContext(AuthContext);
    
    if (isAuthenticated()) return <Redirect to="/dashboard" />

    return (
        <div className="Home">
            <img alt="RCCG LOGO" src={logo} className="Home-logo" />
            <div className="Home-buttons">
                <Link className="btn-custom btn-custom-primary" to="/login">ADMIN/PASTORS <RiAdminFill className="btn-icon" /></Link>
                <Link className="btn-custom btn-custom-secondary ml-4" to="/parish/login">PARISHES <FaChurch className="btn-icon" /></Link>
            </div>
        </div>
    )
}

export default Home;