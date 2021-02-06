import { Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';
import requestAxios from '../../../../util/requestAxios';
import NewAttendanceForm from './NewAttendanceForm';
import axios from 'axios';


const NewAttendanceFormContainer = () => {
    const {userInfo} = useContext(AuthContext);
    const alert = useAlert();
    const history = useHistory();
    const [parish, setParish] = useState({});

    useEffect(() => {
        const source = axios.CancelToken.source();

        const getParishDetail = async() => {
            try{
                const {data} = await requestAxios.get(`/parishes/${userInfo.id}`, {cancelToken:source.cancel()});
                setParish(data.body);
            }catch(err){               
                return;
            }
        }

        getParishDetail();
        return () => {
            source.cancel();
        }
    },[])

    return (
        <Formik
         initialValues={{men: 0, women: 0, children:0, marriages:0, newComers:0, newWorkers:0, soulsBaptised:0, soulsSaved:0, deaths:0, birth:0 }}
         component = {NewAttendanceForm}
         onSubmit = {async(values, actions) => {
            values.parish = userInfo.id;
            values.countryName = parish.country.countryName;
            values.zoneName = parish.country.zone.name;
            values.provinceName = parish.country.zone.province.name;
            values.parishName = parish.name;
            try{
                const {data} = await requestAxios.post(`/attendances`,{...values})
                alert.success(data.message);
                actions.resetForm();
                actions.setSubmitting(false);
                history.push('/parish/attendances/lists');        

            }catch(err){
                if(err.response && err.response.data){
                    alert.error(err.response.data.message);
                  }else{
                  alert.error("An unexpected error occured.");
                  }
            }
         }}
        />
    )
}

export default NewAttendanceFormContainer;