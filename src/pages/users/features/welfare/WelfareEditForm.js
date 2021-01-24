import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useHistory, useParams } from 'react-router-dom';
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

const WelfareEditForm = () =>{
    const {userInfo} = useContext(AuthContext);
    const [welfare, setWelfare] = useState({});
    const alert = useAlert();
    const history = useHistory();
    const {id} = useParams();

    useEffect(() => {
        const source = axios.CancelToken.source();

        const getWelfares = async () => {
            try{
                const {data} = await requestAxios.get(`/welfares/${id}`, {cancelToken:source.token});
                setWelfare(data.body);

            }catch(err){
                if(err.response && err.response.data){
                    alert.error(err.response.data.message);
                  }else{
                  alert.error("An unexpected error occured.");
                  }
            }
        }

        getWelfares();

        return (() =>{
            source.cancel();
        })
    },[]);

    return(
        <Formik
        enableReinitialize
        initialValues={{subject: welfare.subject || "", message: welfare.message || "", status: welfare.status || "" }}
        validationSchema={validationSchema}
        onSubmit={async(values, actions) =>{
            values.parish = userInfo.id;
            try{
                const {data} = await requestAxios.put(`/welfares/${id}`, values);
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
                  <h2 className="NewMonetaryForm-title">Editing Welfare Check</h2>
                  <Form>
                      <div className="form-group">
                          <label htmlFor="subject">Subject</label>
                          <Field name="subject" placeholder="Subject" id="subject" className="form-control form-control-lg"/>
                          <ErrorMessage name="subject">
                                        {(msg) => <div className="text-danger">{msg}</div>}
                            </ErrorMessage>
                      </div>
                    
                      <div>
                          <label className="form-label" htmlFor="status">Status</label>
                          <Field name="status" as="select" className="form-control form-control-lg" id="status">
                              <option value="">Okay</option>
                              <option value="yellow">Medium</option>
                              <option value="red">High</option>
                          </Field>
                      </div>
                      
                      <div className="form-group" htmlFor="message">
                          <label htmlFor="message">Your Message</label>
                          <Field  as="textarea" rows="6" name="message" placeholder="Your Message" id="message" className="form-control form-control-lg"/>
                          <ErrorMessage name="message">
                                        {(msg) => <div className="text-danger">{msg}</div>}
                            </ErrorMessage>
                      </div>                         
                    
                      <input type="submit" value="Update" className="btn btn-primary btn-lg" />
                      <button type="button" className="btn btn-default btn-lg" onClick={() => history.goBack()}>Go Back</button>
                  </Form>
              </R3Card>
          </div>
          </div>
        )}
        </Formik>
    )
}

export default WelfareEditForm;