import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import requestAxios from '../../util/requestAxios';
import Province from './Province';

const ProvinceList = ({setIsEditing}) => {
   const history = useHistory();
    const [provinces, setProvinces] = useState([]);

    useEffect(() => {
        const getProvinces = async () => {
            try{
            const {data} = await requestAxios.get(`/provinces`);
            setProvinces(data.body);
            }catch(err){
                console.error(err.message);
            }
        }

        getProvinces();
    }, [])

    const handleUpdate = () => {
        setIsEditing(true);
        history.push('/provinces');
    }
    return (
        <ul>
            {provinces.map(province => {
                return <Province key={province.id} province={province} handleUpdate={handleUpdate} />
            })}
        </ul>
    )
}

export default ProvinceList;