import React, { useEffect, useState, useContext } from 'react';
import R3Card from '../../components/Card';
import { FaChurch } from 'react-icons/fa';
import {BiWorld} from 'react-icons/bi';
import { AiFillAppstore } from 'react-icons/ai';
import requestAxios from '../../util/requestAxios';
import Tile from '../../components/Tile';
import {AuthContext} from '../../context/AuthContext';
import Loading from '../../components/Loading';
import R3List from '../../components/R3List';
import { List, Tag } from 'antd';
import './AdminDashboard.css';


const AdminDashboard = () => {
    const {userInfo} = useContext(AuthContext);
    const [provinces, setProvinces] = useState([]);
    const [zones, setZones] = useState([]);
    const [countries, setCountries] = useState([]);
    const [parishes, setParishes] = useState([]);
    const [pastor, setPastor] = useState({});

    const getProvincePastor = async() => {
        try{
            const {data} = await requestAxios.get(`/pastors/${userInfo.id}`);
            setPastor(data.body);
        }catch(err){
            console.error(err);
        }
    }
    
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

    useEffect(() => {
        getProvincePastor();
    },[userInfo.id]);

    if(!provinces.length) return <Loading />
    return(
        <div className="AdminDashboard">
            <div className="container">
                <h1 className="AdminDashboard-name">Hello, {pastor.firstName} {pastor.lastName}{userInfo.isAdmin ? ' (Administrator)' : ' (Province Pastor)'}.</h1>
                     <R3Card>
                            <div className="row AdminDashboard-container">
                                <Tile name="Provinces" count={ userInfo.isAdmin ? provinces.length : (provinces.filter(prov => prov.pastor?.id === userInfo.id)).length} color="orange"> <BiWorld /> </Tile>
                                <Tile name="Zones" count={ userInfo.isAdmin ? zones.length : (zones.filter(zone => zone.pastor?.id === userInfo.id)).length} color="#1BC5BD"><AiFillAppstore /> </Tile>
                                <Tile name="Countries" count={ userInfo.isAdmin ? countries?.length : (countries.filter(country => country.pastor?.id === userInfo.id)).length} color="#8950FC"><AiFillAppstore /> </Tile>
                                <Tile name="Parishes" count={ userInfo.isAdmin ? parishes?.length : (parishes.filter(parish => parish.pastor?.id === userInfo.id)).length} color="#17a2b8"><FaChurch/> </Tile>
                            </div>
                     </R3Card>

                         <div className="row">
                            <div className="col-6">
                                <R3Card>
                                    <R3List title="Provinces" data={provinces} size="small" renderItem={
                                        province => (                                                
                                                    <List.Item>
                                                        <List.Item.Meta title={province?.name} />

                                                        <div><Tag color="processing">{province?.zones?.length} zones</Tag></div>
                                                    </List.Item>
                                          )
                                    } />
                                    </R3Card>
                            </div>

                            <div className="col-6">
                                <R3Card>
                                <R3List title="Zones" data={zones} size="small" renderItem={
                                        zone => (                                                
                                                    <List.Item>
                                                        <List.Item.Meta 
                                                        title={zone.province?.name} 
                                                        description={`${zone.name}, ${zone.locationAddress}`} />

                                                        <div><Tag color="processing">{zone.countries?.length} countries</Tag></div>
                                                    </List.Item>
                                          )
                                    } />
                                </R3Card>
                            </div>
                         </div>
            </div>
        </div>    
    )
}

export default AdminDashboard;