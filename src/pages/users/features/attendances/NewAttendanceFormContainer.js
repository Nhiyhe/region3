import { Formik } from 'formik';
import React, { useContext } from 'react';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';
import requestAxios from '../../../../util/requestAxios';
import NewAttendanceForm from './NewAttendanceForm';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
    men:yup.number().required().positive("Please provide a positive number"),
    women:yup.number().required().positive("Please provide a positive number"),
    children:yup.number().required().positive("Please provide a positive number"),
    marriages:yup.number().required().positive("Please provide a positive number"),
    newComers:yup.number().required().positive("Please provide a positive number"),
    newWorkers:yup.number().required().positive("Please provide a positive number"),
    soulsBaptised:yup.number().required().positive("Please provide a positive number"),
    soulsSaved:yup.number().required().positive("Please provide a positive number"),
    deaths:yup.number().required().positive("Please provide a positive number"),
    birth:yup.number().required().positive("Please provide a positive number")
});

const NewAttendanceFormContainer = () => {
    const {userInfo} = useContext(AuthContext);
    const alert = useAlert();
    const history = useHistory();
    return (
        <Formik
         initialValues={{men: 0, women: 0, children:0, marriages:0, newComers:0, newWorkers:0, soulsBaptised:0, soulsSaved:0, deaths:0, birth:0 }}
         component = {NewAttendanceForm}
         onSubmit = {async(values, actions) => {
            values.parish = userInfo.id;
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