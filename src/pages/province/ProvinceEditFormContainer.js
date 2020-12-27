import { Formik } from 'formik';
import React from 'react';
import ProvinceForm from './ProvinceForm';

const ProvinceEditFormContainer = ()  => {
    return (
        <Formik
        initialValues={{}}
        component={ProvinceForm}
        />
    )
}

export default ProvinceEditFormContainer;