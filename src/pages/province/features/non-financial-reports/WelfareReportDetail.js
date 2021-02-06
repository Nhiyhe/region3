import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import requestAxios from '../../../../util/requestAxios';
import axios from 'axios';
import R3Card from '../../../../components/Card';

const WelfareReportDetail = () => {
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
        <div>
            <R3Card>
                <h2>{message.parishName}</h2>
                <h2>{message.pastorName}</h2>
                <h3>{message.subject}</h3>
                <p>{message.message}</p>
            </R3Card>
        </div>
    )
}

export default WelfareReportDetail;