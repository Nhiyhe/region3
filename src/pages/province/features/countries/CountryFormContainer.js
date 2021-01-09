import { Formik } from "formik";
import React, { useContext } from "react";
import CountryForm from "./CountryForm";
import * as Yup from "yup";
import requestAxios from "../../../../util/requestAxios";
import { useHistory } from "react-router-dom";
import {useAlert} from 'react-alert';
import { AuthContext } from "../../../../context/AuthContext";

const schema = Yup.object().shape({
  zone: Yup.string().required("Please select a Zone"),
  countryName: Yup.string().required("Please enter Country"),
  countryCapital: Yup.string().required("Please enter Country Capital"),
});

const CountryFormContainer = () => {
  const {userInfo} = useContext(AuthContext);
  const alert = useAlert();
  const history = useHistory();
  return (
    <Formik
      initialValues={{zone:"", countryName: "", countryCapital:"", pastor:userInfo.id }}
      component={CountryForm}
      validationSchema={schema}
      onSubmit={async (values, {setSubmitting}) => {
        try{
          const {data} = await requestAxios.post(`/countries`, {...values});
          alert.success(data.message);
          setSubmitting(false);
          history.push('/countries/lists');
        }catch(err){
          if(err.response && err.response.data){
            alert.error(err.response.data.message);
          }else{
          alert.error("An unexpected error occured.");
          }
        }
      }}
    />
  );
};

export default CountryFormContainer;
