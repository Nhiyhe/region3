import React, {useEffect, useState} from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import requestAxios from '../../../../util/requestAxios';
import R3Card from '../../../../components/Card';
import { useHistory, useParams } from 'react-router-dom';
import Loading from '../../../../components/Loading';
import { useAlert } from 'react-alert';


const TestimonyEditForm = () => {
    const {id} = useParams();
    const [testimony, setTestimony] = useState({});
    const history = useHistory();
    const alert = useAlert();

    useEffect(() => {
        const source = axios.CancelToken.source();

        const getTestimonies = async () => {
            try{
                const {data} = await requestAxios.get(`/testimonies/${id}`, {cancelToken:source.token});
                setTestimony(data.body);

            }catch(err){
                if(err.response && err.response.data){
                    alert.error(err.response.data.message);
                  }else{
                  alert.error("An unexpected error occured.");
                  }
            }
        }

        getTestimonies();

        return (() =>{
            source.cancel();
        })
    },[]);

       if(!testimony) return <Loading />
        return(
            <Formik
            enableReinitialize
            initialValues={{title: testimony.title || "", testifier: testimony.testifier || "", body: testimony.body || ""}}
            onSubmit={async(values, actions) => {
                try{
                    const {data} = await requestAxios.put(`/testimonies/${testimony.id}`, values);
                    alert.success(data.message);
                    actions.resetForm();
                    actions.setSubmitting(false);
                    history.push(`/parish/testimonies/list`);
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
                      <h2 className="NewMonetaryForm-title">Edit Testimony</h2>
                      <Form>
                          <div className="form-group">
                              <label htmlFor="title">Title</label>
                              <Field name="title" placeholder="Title" id="title" className="form-control form-control-lg"/>
                          </div>
      
                          <div className="form-group">
                              <label htmlFor="testifier">Testifier</label>
                              <Field name="testifier" placeholder="Testifier" id="testifier" className="form-control form-control-lg"/>
                          </div>
      
                          <div className="form-group" htmlFor="amountExpected">
                              <label htmlFor="testimony">Your Testimony</label>
                              <Field  as="textarea" rows="6" name="body" placeholder="Your testimony" id="testimony" className="form-control form-control-lg"/>
                          </div>                         
                        
                          <input type="submit" value="Update" className="btn btn-primary btn-lg" />
                          <button type="button" className="btn btn-default btn-lg" onClick={() => history.goBack()} >Cancel</button>
                      </Form>
                  </R3Card>
              </div>
              </div>
            )}
            </Formik>
        )
}

export default TestimonyEditForm;