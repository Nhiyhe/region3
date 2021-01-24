import React from 'react';
import './Footer.css';

const Footer = () => {
    return(
    <div className="Footer">
        <p className="Footer-text">Region 3 © {new Date().getFullYear()}</p>
    </div>    
    )
}


export default Footer;