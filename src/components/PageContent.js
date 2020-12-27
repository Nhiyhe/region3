import React from 'react';
import './PageContent.css';

const PageContent = ({children}) => {
    return (
        <div className="PageContent container">
            {children}
        </div>
    )
}

export default PageContent;