import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import requestAxios from '../../../../util/requestAxios';
import { useAlert } from 'react-alert';
import R3Card from '../../../../components/Card';
import './TestimonyDetail.css';
import moment from 'moment';
import { dateFormatList } from '../../../../helpers/dateHelper';


const TestimonyDetail = () => {
    const [testimony, setTestimony] = useState({});
    const alert = useAlert();
    const {id} = useParams();
    const history = useHistory();

    useEffect(() => {
        const source = axios.CancelToken.source();
        const getTestimonies = async () => {
            try{
                const {data} = await requestAxios.get(`/testimonies/${id}`, {cancelToken:source.token});
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


    return(
            <R3Card>
                <div className="TestimonyDetail">
                    <h1 className="TestimonyDetail-title">Title: {testimony.title}, given by <span  className="TestimonyDetail-testifier">{testimony.testifier}</span></h1>
                    <h3 className="TestimonyDetail-date">Date: {moment(testimony.createdAt).format(dateFormatList[0])}</h3>
                    <div className="TestimonyDetail-details">
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

export default TestimonyDetail;