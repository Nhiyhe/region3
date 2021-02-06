import React, {useContext} from 'react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import { SubmitButton, ResetButton } from "formik-antd";
import requestAxios from '../util/requestAxios';
import jwtDecode from 'jwt-decode';
import { AuthContext } from '../context/AuthContext';
import { Redirect } from "react-router-dom";
import * as yup from 'yup';
import { useAlert } from 'react-alert';

const validationSchema = yup.object().shape({
    password:yup.string().required("Password is required").min(5).label("Password"),
    email:yup.string().required("Email is required").email("Please provide a valid email").min(5).label("Username")
})

const ParishLogin = () => {
    const {setAuthState, isAuthenticated} = useContext(AuthContext);
    const alert = useAlert();

    if (isAuthenticated()) return <Redirect to="/dashboard" />
    return(
        <Formik 
            initialValues={{email:"", password:""}}
            validationSchema={validationSchema}
            onSubmit={ async (values, {resetForm,setSubmitting,setFieldError}) => {
                try{
                    const {data} = await requestAxios.post("/parishes/login", values);
                    const decodeUserInfo = jwtDecode(data.body.token);
                    const userData = {token:data.body.token,decodeUserInfo}
                    setAuthState(userData);
                    setSubmitting(false); 
                    resetForm();
                    window.location = '/dashboard';
                }catch(err){
                  if(err.response && err.response.data){
                     setFieldError("password","Invalid email or password");
                    alert.error(err.response.data.message);
                  }else{
                  alert.error("An unexpected error occured.");
                  }
                }
            }}
        >

            {() => (
                 <div className="Login">
                 <Form>
                 <div className="row">
                   <div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                     <h2 className="text-center mb-4 Login-heading">Parish Login.</h2>
                     <div className="form-group mb-4">
                       <Field name="email" placeholder="you@example.com" autoFocus className="form-control form-control-lg"/>
                       <ErrorMessage name="email">
                         {(msg) => <div className="text-danger">{msg}</div>}
                       </ErrorMessage>
                     </div>
           
                     <div className="form-group mb-4">
                       <Field
                         name="password"
                         type="password"
                         placeholder="Password"
                         className="form-control form-control-lg"
                       />
                       <ErrorMessage name="password">
                         {(msg) => <div className="text-danger">{msg}</div>}
                       </ErrorMessage>
                     </div>
           
                       <SubmitButton type="primary" disabled={false}>
                         Login
                       </SubmitButton>
                       <ResetButton>Reset</ResetButton>
                   </div>
                 </div>
               </Form>
              </div>
            )}
        </Formik>
    )
}

export default ParishLogin;