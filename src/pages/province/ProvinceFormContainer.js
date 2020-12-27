import { Formik } from "formik";
import React from "react";
import ProvinceForm from "./ProvinceForm";
import * as Yup from 'yup';
import Axios from 'axios';
import {useHistory} from 'react-router-dom';
import requestAxios from "../../util/requestAxios";

const validationSchema = Yup.object().shape({
  name:Yup.string().required("Parish Name is Required").min(5),
  locationAddress:Yup.string().required("Parish Location is Required"),
  pastor:Yup.string().required("Province pastor is Required")
})

const ProvinceFormContainer = () => {
  const history = useHistory();
  return (
    <Formik
      initialValues={{ name: "", locationAddress: "", pastor: "" }}
      component={ProvinceForm}
      validationSchema={validationSchema}
      onSubmit={async(values) => {        
      await requestAxios.post("/provinces", values);
        history.push('/dashboard');
      }}
    />
  );
};

export default ProvinceFormContainer;
