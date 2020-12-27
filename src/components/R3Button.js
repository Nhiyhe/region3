import React from 'react';
import './R3Button.css';

const R3Button = ({children, onClick, color, rounded}) => {
    
    return(
        <div className="R3Button" onClick={onClick} style={{backgroundColor:color,borderRadius: rounded ? '10rem':''}} >
            {children}
        </div>
    )
}

export default R3Button;