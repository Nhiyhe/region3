import { Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import ParishForm from './ParishForm';
import {useAlert} from 'react-alert';
import requestAxios from '../../../../util/requestAxios';
import { ProvinceContext } from '../../../../context/ProvinceContext';
import * as yup from 'yup';
// import { AuthContext } from '../../../../context/AuthContext';

const validationSchema = yup.object().shape({
  email:yup.string().required().email(),
  password:yup.string().required(),
  name:yup.string().required().required(),
  parishPastor:yup.string().required()
});

const ParishFormContainer = () => {
  // const {userInfo, isAdmin} = useContext(AuthContext);
  const {provId} = useContext(ProvinceContext);
  const alert = useAlert();
  const [province, setProvince] = useState({});

      const getProvincePastor = async (id) => {
        try{
          const {data} = await requestAxios.get(`/provinces/${id}`);
          setProvince(data.body);
        }catch(err){
          if(err.response && err.response.data){
            alert.error(err.response.data.message);
          }else{
          alert.error("An unexpected error occured.");
          }
        }
      }

    return (
        <Formik 
        initialValues={{email:"", password:"", name:"", parishPastor:"",worshipCenterAddress:"",postalAddress:"",phoneNo:"", churchStartDate:new Date().toISOString(), city:""}}
        component={ ParishForm }
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
        //  values.provincePastor = province.pastor.id;

        console.log(values);
        return;
          try{
            const {data} = await requestAxios.post( "/parishes/signup", values);
            actions.setSubmitting(false);
            actions.resetForm()
            alert.success(data.message);
            window.location = '/parishes/lists';
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

export default ParishFormContainer;