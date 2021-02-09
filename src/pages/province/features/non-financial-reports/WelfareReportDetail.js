import React, {useEffect, useState} from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import requestAxios from '../../../../util/requestAxios';
import axios from 'axios';
import R3Card from '../../../../components/Card';
import moment from 'moment';
import {dateFormatList} from '../../../../helpers/dateHelper';
import './WelfareReportDetail.css';

const WelfareReportDetail = () => {

    const history = useHistory();
    const {id} = useParams();

    const [message, setMessage] = useState({});

    useEffect(() => {

        const source = axios.CancelToken.source();
        const getMessage = async () => {

            const updateData = {read:true};
            try{
                const {data} = await requestAxios.put(`welfares/${id}`, updateData, {cancelToken:source.token});
                setMessage(data.body);
            }catch(err){
                console.log(err);
            }
        }

        getMessage();

        return (() => {
            source.cancel()
        })

    }, [])

    console.log(message);
    return (
        <div className="WelfareReportDetail">
            <R3Card>
                <h2 className="WelfareReportDetail-title">Welfare Check Message</h2>
                <h4 className="WelfareReportDetail-h4">Date: {moment(message.createdAt).format(dateFormatList[0])}</h4>
                <h4 className="WelfareReportDetail-h4">Church: {message.parishName}</h4>
                <h4 className="WelfareReportDetail-h4">Pastor Name: {message.pastorName}</h4>
                <h4 className="WelfareReportDetail-subject">Subject: {message.subject}</h4>
                <p className="WelfareReportDetail-message">{message.message}</p>
                <div><button className="btn btn-info btn-lg" onClick={() => history.goBack()}>Go Back</button></div>
            </R3Card>
        </div>
    )
}

export default WelfareReportDetail;