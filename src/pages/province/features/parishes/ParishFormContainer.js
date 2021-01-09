import { Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import ParishForm from './ParishForm';
import {useAlert} from 'react-alert';
import requestAxios from '../../../../util/requestAxios';
import { ProvinceContext } from '../../../../context/ProvinceContext';
// import { AuthContext } from '../../../../context/AuthContext';


const ParishFormContainer = () => {
  // const {userInfo, isAdmin} = useContext(AuthContext);
  const {provId} = useContext(ProvinceContext);
  const alert = useAlert();
  const [province, setProvince] = useState({});

      const getProvincePastor = async (id) => {
        console.log('method called', id)
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
        initialValues={{email:"", password:"", name:"", parishEmailAddress:"", parishPastor:"", referenceNo:"",
        worshipCenterAddress:"",postalAddress:"",phoneNo:"", churchStartDate:new Date().toISOString(), city:""}}
        component={ ParishForm }
        onSubmit={async (values, actions) => {
          console.log(values);
          return;
          // values.provincePastor = province.pastor.id;
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