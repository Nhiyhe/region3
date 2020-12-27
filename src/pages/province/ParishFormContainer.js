import { Formik } from 'formik';
import React from 'react';
import ParishForm from './ParishForm';
import Axios from 'axios';

const ParishFormContainer = () => {
    return (
        <Formik 
        initialValues={{parishName:"", emailAddress:"", parishPastor:"",referenceNo:"",worshipCenterAddress:"",postalAddress:"",phoneNo:"", DateOfTheChurchStart:"", city:""}}
        component={ParishForm}
        onSubmit={async (values) => {
            console.log(values);
            const {data} = await Axios.post( "https://church-project.herokuapp.com/api/v1/parishes", values);
            console.log(data);
        }}
        />
    )
}

export default ParishFormContainer;