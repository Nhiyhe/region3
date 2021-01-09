import { Formik } from "formik";
import React from "react";
import requestAxios from "../../../../util/requestAxios";
import PastorForm from "./PastorForm";
import {useAlert} from 'react-alert';

const PastorFormContainer = () => {
  const alert = useAlert();
  return (
    <Formik
      initialValues={{
        firstName: "",
        middleName: "",
        lastName: "",
        dateOfBirth: new Date().toISOString(),
        gender:"",
        email: "",
        password:"",
        phone: "",
        urn: "",
        position: "Parish Pastor",
        spouseFirstName: "",
        spouseMiddleName: "",
        spouseLastName:"",
        spouseDateOfBirth: new Date().toISOString(),
        memorableOccassion:"",
        dateOfMemorableOccassion: new Date().toISOString()
      }}
      component={PastorForm}
      onSubmit={async (values) => {
        try{
          const {data} = await requestAxios.post(`/pastors`,values);        
          alert.success(data.message);
          window.location ='/pastors/lists';
        }catch(err){
          console.log(err);
          alert.error(err.message);
        }
      }}
    />
  );
};

export default PastorFormContainer;
