import { Formik } from "formik";
import React from "react";
import NewProvinceForm from "./NewProvinceForm";
import * as Yup from 'yup';
import {useHistory} from 'react-router-dom';
import requestAxios from "../../../../util/requestAxios";
import {useAlert} from 'react-alert';

const validationSchema = Yup.object().shape({
  name:Yup.string().required("Parish Name is Required").min(5),
  locationAddress:Yup.string().required("Parish Location is Required"),
  pastor:Yup.string().required("Province pastor is Required")
})

const ProvinceFormContainer = () => {
  const history = useHistory();
  const alert = useAlert();
  return (
    <Formik
      initialValues={{ name: "", locationAddress: "", pastor: "" }}
      component={() => <NewProvinceForm province={{}} />}
      validationSchema={validationSchema}
      onSubmit={async(values) => {        
       try{
        const {data} = await requestAxios.post("/provinces", values);
        alert.success(data.message);
        history.push('/provinces/lists');
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

export default ProvinceFormContainer;
