import React, { useState, useEffect } from 'react';
import R3Card from '../../../../components/Card';
import './TestimonyReportDetail.css';
import moment from 'moment';
import {dateFormatList} from '../../../../helpers/dateHelper';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import requestAxios from '../../../../util/requestAxios';
import Loading from '../../../../components/Loading';
import { useAlert } from 'react-alert';

const TestimonyReportDetail = () => {

    const [testimony, setTestimony] = useState({});
    const history = useHistory();
    const {id} = useParams();
    const alert = useAlert();

    useEffect(() => {
        const source = axios.CancelToken.source();
        const getTestimonies = async () => {

            try{
                const updatedData = {read:true};
                const {data} = await requestAxios.put(`/testimonies/${id}`,updatedData, {cancelToken:source.token});
                setTestimony(data.body);

            }catch(err){
                if(err.response && err.response.data){
                    alert.error(err.response.data.message);
                  }else{
                  alert.error("An unexpected error occured.");
                  }
            }
        }

        getTestimonies();

        return (() =>{
            source.cancel();
        })
    },[]);

    if(!testimony.body) return <Loading />

    return (
            <R3Card>
            <div className="TestimonyReportDetail">
                    <h1 className="TestimonyReportDetail-heading">Testimony</h1>
                    <h3 className="TestimonyReportDetail-date">Date: {moment(testimony.createdAt).format(dateFormatList[0])}</h3>
                    <h2 className="TestimonyReportDetail-title">Title: {testimony.title}, given by <span  className="TestimonyDetail-testifier">{testimony.testifier}</span></h2>
                    <div className="TestimonyReportDetail-details">
                        <h4>Your Testimony:</h4>
                        <p>{testimony.body}</p>
                    </div>
                    <div>
                        <button className="btn btn-info btn-lg" onClick={() =>  history.goBack() }>Go Back</button>
                    </div>
                </div>
            </R3Card>
    )
}

export default TestimonyReportDetail;