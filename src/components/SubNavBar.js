import React from 'react';
import './SubNavBar.css';

const SubNavBar = ({children}) => {
    return (
        <div className="SubNavBar">
                <ul className="SubNavBar-ul">
                    {children}
                </ul>
        </div>
    )
}

export default SubNavBar;