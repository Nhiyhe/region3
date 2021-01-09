import { Formik } from 'formik';
import React, { useContext } from 'react';
import { ParishAuthContext } from '../../context/ParishAuthContext';
import requestAxios from '../../util/requestAxios';
import NewAttendanceForm from './NewAttendanceForm';

const NewAttendanceFormContainer = () => {
    const {parishId} = useContext(ParishAuthContext);
    return (
        <Formik
         initialValues={{men: 0, women: 0, children:0, marriages:0, newComers:0, newWorkers:0, soulsBaptised:0, soulsSaved:0, deaths:0, birth:0 }}
         component = {NewAttendanceForm}
         onSubmit = {async(values, {resetForm}) => {
            values.parish = parishId;
            try{
                const {data} = await requestAxios.post(`/attendances`,{...values})
                console.log(data)
            }catch(err){
                console.error(err.message);
            }
         }}
        />
    )
}

export default NewAttendanceFormContainer;