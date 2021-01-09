import { Formik } from "formik";
import React, { useContext } from "react";
import ZoneForm from "./ZoneForm";
import * as Yup from 'yup';
import requestAxios from "../../../../util/requestAxios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";
import {useAlert} from 'react-alert';

const validationSchema = Yup.object().shape({
  province:Yup.string().required("Please select a provice"),
  name:Yup.string().required("Zone name is required."),
  locationAddress:Yup.string().required("Location Address is required")
});

const ZoneFormContainer = () => {
  const alert = useAlert();
  const {userInfo} = useContext(AuthContext);
  const history = useHistory();
  return (
    <Formik
      initialValues={{ province: "", name: "", locationAddress:"", pastor: userInfo.id }}
      component={ZoneForm}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        try{
          const {data} = await requestAxios.post(`/zones`, values);
          alert.success(data.message);
          history.push('/zones/lists');
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

export default ZoneFormContainer;
