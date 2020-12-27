import React from 'react';
import './Tile.css';

const Tile = ({children, name, count, color}) => {
    return (
        <div className="Tile" style={{backgroundColor:color}}>
            {children}
             <div className="Tile-content">
                <h3 className="Tile-content-name">{name}</h3>
                <span className="Tile-content-count">{count}</span>
             </div>
        </div>
    )
}

export default Tile;