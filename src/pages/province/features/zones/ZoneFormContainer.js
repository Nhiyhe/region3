import { Formik } from "formik";
import React from "react";
import ZoneForm from "./ZoneForm";
import * as Yup from 'yup';
import requestAxios from "../../../../util/requestAxios";
import { useHistory } from "react-router-dom";

const validationSchema = Yup.object().shape({
  province:Yup.string().required("Please select a provice"),
  name:Yup.string().required("Zone name is required."),
  locationAddress:Yup.string().required("Location Address is required")
});

const ZoneFormContainer = () => {
  const history = useHistory();
  return (
    <Formik
      initialValues={{ province: "", name: "", locationAddress:"" }}
      component={ZoneForm}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        try{
          const {data} = await requestAxios.post(`/zones`, values);
          console.log(data.body);
        history.push('/dashboard');
        }catch(err){
          console.error(err);
        }
      }}
    />
  );
};

export default ZoneFormContainer;
