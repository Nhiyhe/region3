import React, {useState, useEffect} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import R3Card from '../../../../components/Card';
import requestAxios from '../../../../util/requestAxios';
import axios from 'axios';
import { useAlert } from 'react-alert';
import moment from 'moment';
import { dateFormatList } from '../../../../helpers/dateHelper';
import './ParishDetailReport.css';

const ParishDetailReport = () => {

    const {id} = useParams();
    const history = useHistory();
    const [parish, setParish] = useState({});
    const alert = useAlert();

    useEffect(() => {
        const source = axios.CancelToken.source();
        const getOutreach = async () => {

            try{
                const {data} = await requestAxios.get(`/parishes/${id}`,{cancelToken:source.token});
                console.log(data.body);
                setParish(data.body);

            }catch(err){
                if(err.response && err.response.data){
                    alert.error(err.response.data.message);
                  }else{
                  alert.error("An unexpected error occured.");
                  }
            }
        }

        getOutreach();

        return (() =>{
            source.cancel();
        })
    },[]);
    return(
        <div className="ParishDetailReport">
            <R3Card>
                 <h1 className="ParishDetailReport-heading">{parish.name}</h1>
                <div className="ParishDetailReport-location">{parish.worshipCenterAddress}, {parish.city}</div>
                <h2 className="ParishDetailReport-pastor">{parish.parishPastor?.firstName} {parish.parishPastor?.lastName}</h2>
                <div>Parish Phone No: {parish.phoneNo}</div>
                <div>Date of Birth: {moment(parish.parishPastor?.dateOfBirth).format(dateFormatList[0])}</div>
                <div>Memorable Occassion: {parish.parishPastor?.memorableOccassion}</div>
                <div>Date of Memorable Occassion: {moment(parish.parishPastor?.dateOfMemorableOccassion).format(dateFormatList[0])}</div>

                
                <button className="btn btn-info" onClick={() => history.goBack()}>Go Back</button>
            </R3Card>
        </div>
    )
}

export default ParishDetailReport;