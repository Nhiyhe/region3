import { Formik } from 'formik';
import React, { useContext } from 'react';
import { ParishAuthContext } from '../../context/ParishAuthContext';
import requestAxios from '../../util/requestAxios';
import NewMonetaryForm from './NewMonetaryForm';

const NewMonetaryFormContainer = () => {
    const {parishId} = useContext(ParishAuthContext);
    return (
        <Formik         
        initialValues={{offering:0, tithe:0, thanksgiving:0, otherOfferings:0, income:0}}
        component={NewMonetaryForm}
        onSubmit ={async (values, {resetForm}) => {
            values.parish = parishId;
            try{
                await requestAxios.post(`/monetaryrecords`,{...values})
                window.location = '/dashboard';
                resetForm();
                
            }catch(err){
                console.error(err.message);
            }
        }}
        />
    )
}

export default NewMonetaryFormContainer;