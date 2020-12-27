import React from 'react';

const Province = ({province,handleUpdate}) => {
    return (
        <li>{province.name} {province.locationAddress} {province.pastor.pastorName} 
                        <button className="btn btn-info btn-sm" onClick={() => handleUpdate()}>Edit</button>
                        <button className="btn btn-danger btn-sm">Delete</button>
                    </li>
    )
}

export default Province;