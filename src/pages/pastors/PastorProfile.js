import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import requestAxios from '../../util/requestAxios';
import {AuthContext} from '../../context/AuthContext';
import { useAlert } from 'react-alert';
import Loading from '../../components/Loading';
import R3Card from '../../components/Card';
import { AiOutlineMail } from 'react-icons/ai';
import { BiCalendar } from 'react-icons/bi';
import { FaPhoneAlt } from 'react-icons/fa';
import { FaMale, FaFemale, FaBirthdayCake } from 'react-icons/fa';
import moment from 'moment';
import './PastorProfile.css';

const PastorProfile = () => {
    const {userInfo} = useContext(AuthContext);
    const [pastor, setPastor] = useState({});

    const alert = useAlert();

    useEffect(() => {
        const source = axios.CancelToken.source();

        const getPastor = async() => {
            try{
            const {data} = await requestAxios.get(`/pastors/${userInfo.id}`, {cancelToken:source.token});
            setPastor(data.body);
            }catch(err){
                console.error(err);
                if(err.response && err.response.data){
                    alert.error(err.response.data.message);
                  }else{
                  alert.error("An unexpected error occured.");
                  }
            }
        }
        getPastor();

                
   return (() => {
    source.cancel()
  })
    },[]);

    if(!pastor.firstName) return <Loading />

    return(
        <div>
            <h2 className="PastorProfile-name">{pastor.firstName} {pastor.middleName} {pastor.lastName}</h2>
            <R3Card>
                <h3 className="PastorProfile-title">Basic Info</h3>
                <section className="PastorProfile">
                    <div className="PastorProfile-item">
                        <AiOutlineMail className="PastorProfile-icon" />
                        <div className="PastorProfile-info" >
                            <p>{pastor.email}</p>
                            <h5>Email</h5>
                        </div>
                    </div>

                    <div className="PastorProfile-item">
                        <FaPhoneAlt className="PastorProfile-icon"  />
                        <div className="PastorProfile-info">
                            <p>{pastor.phone}</p>
                            <h5>Mobile</h5>
                        </div>
                    </div>

                    <div className="PastorProfile-item">
                        {pastor.gender === 'Male' ? <FaMale className="PastorProfile-icon"  /> : <FaFemale className="PastorProfile-icon" />}
                        <div className="PastorProfile-info">
                            <p>{pastor.gender}</p>
                            <h5>Gender</h5>
                        </div>
                    </div>

                    <div className="PastorProfile-item">
                        <FaBirthdayCake className="PastorProfile-icon"  />
                        <div className="PastorProfile-info">
                            <p>{pastor.dateOfBirth.toString()}</p>
                            <h5>Date of Birth</h5>
                        </div>
                    </div>
                </section>
            </R3Card>

            <R3Card>
                <h3 className="PastorProfile-title">Spouse Info</h3>
                <section>
                  <div className="PastorProfile-item">
                    {pastor.gender === 'FeMale' ? <FaMale className="PastorProfile-icon"  /> : <FaFemale className="PastorProfile-icon" />}
                        <div className="PastorProfile-info">
                            <p>Married to {pastor.spouseFirstName} {pastor.spouseLastName}</p>
                            <h5>Relationship</h5>
                        </div>
                    </div>
                    <div className="PastorProfile-item">
                        <FaBirthdayCake className="PastorProfile-icon"  />
                        <div className="PastorProfile-info">
                            <p>{pastor.spouseDateOfBirth.toString()}</p>
                            <h5>Date of Birth</h5>
                        </div>
                    </div>

                    <div className="PastorProfile-item">
                        <BiCalendar className="PastorProfile-icon"  />
                        <div className="PastorProfile-info">
                            <p>{pastor.dateOfMemorableOccassion}</p>
                            <h5>{pastor.memorableOccassion}</h5>
                        </div>
                    </div>
                </section>
            </R3Card>
        </div>
    )
}

export default PastorProfile;