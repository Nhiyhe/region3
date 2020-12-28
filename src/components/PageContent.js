import React from 'react';
import './PageContent.css';

const PageContent = ({children}) => {
    return (
        <div className="">
            <div className="container">
                <div className="PageContent">{children}</div>
            </div>
        </div>
    )
}

export default PageContent;