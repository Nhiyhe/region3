import React, {useEffect, useContext, useState} from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import requestAxios from '../../../../util/requestAxios';
import axios from 'axios';
import './ParishDetail.css';
import Card from '../../../../components/Card';
import { AiOutlineMail } from 'react-icons/ai';
import { FaPhoneAlt } from 'react-icons/fa';
import { ImLocation } from 'react-icons/im';
import { FcBusinessman, FcBusinesswoman } from 'react-icons/fc';
import Loading from '../../../../components/Loading';

const ParishDetail = () => {
    const [parish, setParish] = useState({});

    const {userInfo} = useContext(AuthContext); 

    useEffect(() => {
        const source = axios.CancelToken.source();
        const getParishDetail = async() => {
            try{
                const {data} = await requestAxios.get(`/parishes/${userInfo.id}`, {cancelToken:source.cancel()});
                setParish(data.body);
            }catch(ex){
                console.error(ex.message);
            }
        }
        getParishDetail();
        return () => {
            source.cancel();
        }
    },[userInfo.id])

    if(!parish.name){
        return <Loading />
    }

    return (
        <section className="ParishDetail">
                <h2 className="ParishDetail-name">Welcome, {parish?.name}</h2>
                <Card>
                    <section className="ParishDetail-container">
                        <div>
                            <p><FaPhoneAlt/> {parish.phoneNo}</p>
                            <p><AiOutlineMail /> {parish.email}</p>
                            <p><ImLocation/> {parish?.worshipCenterAddress}, {parish?.country?.countryName}, {parish?.country?.countryCapital}.</p>                            
                        </div>
                        <div>
                            <h5 className="ParishDetail-pname">{parish?.parishPastor?.gender === 'Male' ? <FcBusinessman /> : <FcBusinesswoman/>}{parish?.parishPastor?.firstName} {parish?.parishPastor?.lastName}</h5> 
                            <div className="ParishDetail-location">
                                <p className="ParishDetail-coutry">{parish?.country?.zone?.province?.name}, {parish?.country?.zone?.name}.</p>
                                <p>Ref: {parish.referenceNo?.toUpperCase()}</p> 
                            </div>                       
                        </div>
                       
                    </section>
                </Card>
        </section>
    )
}

export default ParishDetail;