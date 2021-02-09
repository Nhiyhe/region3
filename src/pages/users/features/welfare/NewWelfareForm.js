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
    subject:yup.string().required("Subject is Required"),
    message:yup.string().required("Message is Required"),
    status:yup.string().required("Status is required"),
});

const NewWelfareForm = () =>{
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

 
    return(
        <Formik
        initialValues={{subject:"", message:"", status:"" }}
        validationSchema={validationSchema}
        onSubmit={async(values, actions) =>{
            values.parish = userInfo.id;
            values.parishName = parish?.name;
            values.province = parish?.country?.zone?.province?.name
            values.zone = parish?.country?.zone?.name
            values.pastorName = `${parish?.parishPastor?.firstName} ${parish?.parishPastor?.lastName}`
            values.country = parish?.country?.countryName
            try{
                const {data} = await requestAxios.post(`/welfares`, values);
                alert.success(data.message);
                actions.resetForm();
                actions.setSubmitting(false);
                history.push(`/parish/welfares/lists`);

            }catch(err){
                if(err.response && err.response.data){
                    alert.error(err.response.data.message);
                  }else{
                  alert.error("An unexpected error occured.");
                  }
            }
        }}
        >
        {() => (
              <div className="row">
              <div className="col-md-8 offset-2"> 
              <R3Card>
                  <h2 className="NewMonetaryForm-title">Welfare Check</h2>
                  <Form>
                      <div className="form-group">
                          <label htmlFor="subject">Subject</label>
                          <Field name="subject" placeholder="Subject" id="subject" className="form-control form-control-lg"/>
                          <ErrorMessage name="subject">
                                        {(msg) => <div className="text-danger">{msg}</div>}
                            </ErrorMessage>
                      </div>
                    
                      <div className="form-group">
                          <label className="form-label" htmlFor="status">Status</label>
                          <Field name="status" as="select" className="form-control form-control-lg" id="status">
                              <option value="">Select Status</option>
                              <option value="okay">Okay</option>
                              <option value="yellow">Medium</option>
                              <option value="red">High</option>
                          </Field>
                          <ErrorMessage name="status">
                                        {(msg) => <div className="text-danger">{msg}</div>}
                            </ErrorMessage>
                      </div>
                      
                      <div className="form-group" htmlFor="message">
                          <label htmlFor="message">Your Message</label>
                          <Field  as="textarea" rows="6" name="message" placeholder="Your Message" id="message" className="form-control form-control-lg"/>
                          <ErrorMessage name="message">
                                        {(msg) => <div className="text-danger">{msg}</div>}
                            </ErrorMessage>
                      </div>                         
                    
                      <input type="submit" value="Send Message" className="btn btn-primary btn-lg" />
                  </Form>
              </R3Card>
          </div>
          </div>
        )}
        </Formik>
    )
}

export default NewWelfareForm;