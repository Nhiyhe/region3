import React, {useContext} from 'react';
import {Formik} from 'formik';
import Login from './Login';
import * as yup from 'yup';
import { Redirect } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import requestAxios from '../util/requestAxios';
import { AuthContext } from '../context/AuthContext';

const validationSchema = yup.object().shape({
    password:yup.string().required("Password is required").min(5).label("Password"),
    email:yup.string().required("Email is required").email("Please provide a valid email").min(5).label("Username")
})

const LoginContainer = () => {
    const {setAuthState, isAuthenticated} = useContext(AuthContext);

    if (isAuthenticated()) return <Redirect to="/dashboard" />
    return(
        <Formik
           initialValues ={{email:"", password:"" }} 
           validationSchema={validationSchema}
           onSubmit={async (values,{setSubmitting,resetForm, setFieldError}) =>{
              try{
                const {data} = await requestAxios.post("/pastors/login", values);
                const decodeUserInfo = jwtDecode(data.body.token);
                const userData = {token:data.body.token,decodeUserInfo}
                setAuthState(userData);
                setSubmitting(false); 
                resetForm();
                window.location = '/dashboard';
            }catch(err){
                setFieldError("password","Invalid email or password");
            }
           }
        }
           component ={Login}
         />
    )
}

export default LoginContainer;