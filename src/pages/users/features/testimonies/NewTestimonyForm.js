import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom';
import R3Card from '../../../../components/Card';
import { AuthContext } from '../../../../context/AuthContext';
import requestAxios from '../../../../util/requestAxios';
import * as yup from 'yup';
import axios from 'axios';

const validationSchema = yup.object().shape({
    title:yup.string().required("Title is required"),
    testifier:yup.string().required("Testifier is required"),
    body:yup.string().required("What's your testimony please?")
});

const NewTestimonyForm = () =>{
    const {userInfo} = useContext(AuthContext);
    const alert = useAlert();
    const history = useHistory();
    const [parish, setParish] = useState({});

    useEffect(() => {
        const source = axios.CancelToken.source();
        const getParishDetail = async() => {
            try{
                const {data} = await requestAxios.get(`/parishes/${userInfo.id}`, {cancelToken:source.token});
                setParish(data.body);
            }catch(ex){
                console.error(ex.message);
            }
        }
        getParishDetail();
        return () => {
            source.cancel();
        }
    },[userInfo.id])
    console.log(parish);
    return(
        <Formik
        initialValues={{title:"", testifier:"", body:""}}
        validationSchema={validationSchema}
        onSubmit={async(values, actions) =>{
            values.parish = userInfo.id;
            values.parishName = parish?.name;
            values.provinceName = parish?.country?.zone?.province?.name;
            values.zoneName = parish?.country?.zone?.name;
            values.countryName = parish?.country?.countryName;
            values.province =  parish?.country?.zone?.province?._id;
            values.country = parish?.country?._id;
            values.zone = parish?.country?.zone?._id;
             try{
                const {data} = await requestAxios.post(`/testimonies`, values);
                alert.success(data.message);
                actions.resetForm();
                actions.setSubmitting(false);
                history.push(`/parish/testimonies/lists`);

            }catch(err){
                if(err.response && err.response.data){
                    alert.error(err.response.data.message);
                  }else{
                  console.error("There was a problem");
                  }
            }
        }}
        >
        {({isSubmitting}) => (
              <div className="row">
              <div className="col-md-8 offset-2"> 
              <R3Card>
                  <h2 className="NewMonetaryForm-title">New Testimony</h2>
                  <Form>
                      <div className="form-group">
                          <label htmlFor="title">Title</label>
                          <Field name="title" placeholder="Title" id="title" className="form-control form-control-lg"/>
                          <ErrorMessage name="title">
                                        {(msg) => <div className="text-danger">{msg}</div>}
                            </ErrorMessage>
                      </div>
  
                      <div className="form-group">
                          <label htmlFor="testifier">Testifier</label>
                          <Field name="testifier" placeholder="Testifier" id="testifier" className="form-control form-control-lg"/>
                          <ErrorMessage name="testifier">
                                        {(msg) => <div className="text-danger">{msg}</div>}
                            </ErrorMessage>
                      </div>
  
                      <div className="form-group" htmlFor="testimony">
                          <label htmlFor="testimony">Your Testimony</label>
                          <Field  as="textarea" rows="6" name="body" placeholder="Your testimony" id="testimony" className="form-control form-control-lg"/>
                          <ErrorMessage name="body">
                                        {(msg) => <div className="text-danger">{msg}</div>}
                            </ErrorMessage>
                      </div>                         
                    
                      <input type="submit" value={isSubmitting ? "Please wait..." : "Submit"} className="btn btn-primary btn-lg" disabled={isSubmitting} />
                  </Form>
              </R3Card>
          </div>
          </div>
        )}
        </Formik>
    )
}

export default NewTestimonyForm;