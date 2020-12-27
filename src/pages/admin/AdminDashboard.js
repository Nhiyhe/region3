import React, { useEffect, useState } from 'react';
import R3Card from '../../components/Card';
import { FaChurch } from 'react-icons/fa';
import {BiWorld} from 'react-icons/bi';
import { AiFillAppstore } from 'react-icons/ai';
import './AdminDashboard.css';
import requestAxios from '../../util/requestAxios';
import Tile from '../../components/Tile';

const AdminDashboard = () => {
    const [provinces, setProvinces] = useState([]);
    const [zones, setZones] = useState([]);
    const [countries, setCountries] = useState([]);
    const [parishes, setParishes] = useState([]);
    
    const getProvinces = async () => {
        try{
            const {data} = await requestAxios.get('/provinces');
            setProvinces(data.body);
        }catch(err){
            console.error(err.message)
        }
    }

    const getZones = async () => {
        try{
            const {data} = await requestAxios.get('/zones');
            setZones(data.body);
        }catch(err){
            console.error(err.message);
        }
    }

    const getCountries = async () => {
        try{
            const {data} = await requestAxios.get('/countries');
            setCountries(data.body);
        }catch(err){
            console.error(err.message);
        }
    }

    const getParishes = async () => {
        try{
            const {data} = await requestAxios.get('/parishes');
            setParishes(data.body);
        }catch(err){
            console.error(err.message);
        }
    }


    useEffect(() => {
        getProvinces();
        getZones();
        getCountries();
        getParishes();
    }, [])

    console.log(countries, zones);

    return(
        <div className="AdminDashboard">
            <div className="container">
                     <R3Card>
                            <div className="row AdminDashboard-container">
                                <Tile name="Provinces" count={provinces.length} color="orange"> <BiWorld /> </Tile>
                                <Tile name="Countries" count={countries.length} color="#8950FC"><AiFillAppstore /> </Tile>
                                <Tile name="Parishes" count={parishes.length} color="#17a2b8"><FaChurch/> </Tile>
                            </div>
                     </R3Card>

                         <div className="row">
                            <div className="col-6">
                                <R3Card>
                                    <div>

                                    </div>
                                </R3Card>
                            </div>

                            <div className="col-4">
                                <R3Card>

                                </R3Card>
                            </div>
                         </div>
            </div>
        </div>    
    )
}

export default AdminDashboard;