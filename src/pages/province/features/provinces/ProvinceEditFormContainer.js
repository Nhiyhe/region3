import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import requestAxios from '../../../../util/requestAxios';
import NewProvinceForm from './NewProvinceForm';

const ProvinceEditFormContainer = ()  => {
    let {id} = useParams();
    let history = useHistory();

    const [province, setProvince]= useState({});

    useEffect(() => {   
        const getProvinces = async () => {
            try{
                const {data} = await requestAxios.get(`/provinces/${id}`);
                 setProvince(data.body);
                 console.log(data.body)
            }catch(err){
                console.error(err);
            }
        }

        getProvinces();
    }, []);

    return (
        <Formik
        enableReinitialize={true}
        initialValues={{name: province.name || "", locationAddress: province.locationAddress || "", pastor: province.pastor?.id || "" }}
        component={() => <NewProvinceForm province={province} mode="editing" />}
        onSubmit= {async (updatedValues) => {
            try{
                const {data} = await requestAxios.put(`/provinces/${province.id}`,updatedValues);
                console.log(data.body);
                history.push("/provinces/lists");
            }catch(err){
                console.error(err);
            }
        }}
        />
    )
}

export default ProvinceEditFormContainer;