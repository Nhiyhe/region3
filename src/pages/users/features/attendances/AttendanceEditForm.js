import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import requestAxios from '../../../../util/requestAxios';
import NewAttendanceForm from './NewAttendanceForm';
import axios from 'axios';

const AttendanceEditForm = () =>{
const {id} = useParams();
const [attendance, setAttendance] = useState({});

    useEffect(() => {
        const source = axios.CancelToken.source();

        const getAttendanceById = async () => {
            try{
                const {data} = await requestAxios.get(`/attendances/${id}`, {cancelToken:source.token});
                setAttendance(data.body);
            }catch(err){
                if(err.response && err.response.data){
                    alert.error(err.response.data.message);
                  }else{
                  alert.error("An unexpected error occured.");
                  }
            }
        }

        getAttendanceById();

        return (() =>{
            source.cancel();
        })
    },[]);

    return(
        <Formik 
        enableReinitialize
        initialValues={{men:  attendance.men || 0, women: attendance.women || 0, children: attendance.children || 0, marriages: attendance.marriages || 0, newComers: attendance.newComers || 0, newWorkers: attendance.newWorkers || 0, soulsBaptised: attendance.soulsBaptised || 0, soulsSaved: attendance.soulsSaved || 0, deaths: attendance.deaths || 0, birth: attendance.birth || 0 }}
        component={ () => <NewAttendanceForm editing={true} />}
        onSubmit = {(values) => (
            console.log(values)
        )}
        
        />       
    )
}


export default AttendanceEditForm;