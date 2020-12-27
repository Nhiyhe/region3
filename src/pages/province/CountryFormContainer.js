import { Formik } from "formik";
import React from "react";
import CountryForm from "./CountryForm";
import * as Yup from "yup";
import requestAxios from "../../util/requestAxios";
import { useHistory } from "react-router-dom";

const schema = Yup.object().shape({
  zone: Yup.string().required("Please select a Zone"),
  countryName: Yup.string().required("Please enter Country"),
  countryCapital: Yup.string().required("Please enter Country Capital"),
});

const CountryFormContainer = () => {
  const history = useHistory();
  return (
    <Formik
      initialValues={{zone:"", countryName: "", countryCapital:"" }}
      component={CountryForm}
      validationSchema={schema}
      onSubmit={async (values, {setSubmitting}) => {
        try{
          await requestAxios.post(`/countries`, values);
          setSubmitting(false);
          history.push('/dashboard');

        }catch(err){
          console.error(err.message);
        }
      }}
    />
  );
};

export default CountryFormContainer;
