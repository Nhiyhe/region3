import React from 'react';
import './Home.css';
import logo from '../images/rccg.png';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="Home">
            <img src={logo} className="Home-logo" />
            <div className="Home-buttons">
                <Link className="btn btn-primary btn-lg mr-3" to="/login">PASTORS LOGIN PAGE</Link>
                <Link className="btn btn-primary btn-lg" to="/parish/login">PARISHES LOGIN PAGE</Link>
            </div>
        </div>
    )
}

export default Home;