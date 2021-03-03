import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom';
import R3Card from '../../../../components/Card';
import { AuthContext } from '../../../../context/AuthContext';
import requestAxios from '../../../../util/requestAxios';
import axios from 'axios';

const NewOutreachForm = () => {
    const history = useHistory();
    const {userInfo} = useContext(AuthContext);
    const alert = useAlert();
    const [parish, setParish] = useState({});

    
    useEffect(() => {
        const source = axios.CancelToken.source();
       
        const getParishDetail = async() => {
            try{
                const {data} = await requestAxios.get(`/parishes/${userInfo.id}`, {cancelToken:source.cancel()});
                setParish(data.body);
            }catch(err){               
                return;
            }
        }

        getParishDetail();
        return () => {
            source.cancel();
        }
    },[])

    console.log(parish);

    return(
        <Formik
        initialValues={{newParish:0, newNation:0, churchDedication:0, notes:'', images:null}}
        onSubmit={async(values, actions) =>{
            values.parish = userInfo.id;
            values.province = parish.country?.zone?.province?._id;
            values.zone = parish.country?.zone?._id;
            values.country = parish.country?._id;

            try{
                const formData = new FormData();
                formData.append('newParish', values.newParish);
                formData.append('newNation', values.newNation);
                formData.append('churchDedication', values.churchDedication);
                formData.append('notes', values.notes);
                formData.append('parish', values.parish);
                formData.append('province', values.province);
                formData.append('zone', values.zone);
                formData.append('country', values.country);

                 if(values.images)
                    for(var x = 0; x < values.images.length; x++) {
                        formData.append('images', values.images[x])
                    }
                
                const {data} = await requestAxios.post(`/outreaches`, formData);
                alert.success(data.message);
                actions.resetForm();
                actions.setSubmitting(false);
                history.push(`/parish/outreaches/lists`);
            }catch(err){
                console.log(err);
            }
        }}
        >
        {(props) => (
              <div className="row">
              <div className="col-md-8 offset-2"> 
              <R3Card>
                  <h2 className="NewMonetaryForm-title">New Outreach</h2>
                  <Form>
                      <div className="form-group">
                          <label htmlFor="newparish">New Parish</label>
                          <Field type="number" name="newParish" placeholder="New Parish" id="newparish" className="form-control form-control-lg"/>
                      </div>
  
                      <div className="form-group">
                          <label htmlFor="newnation">New Nation</label>
                          <Field type="number" name="newNation" placeholder="New Nation" id="newnation" className="form-control form-control-lg"/>
                      </div>
  
                      <div className="form-group" htmlFor="amountExpected">
                          <label htmlFor="churchDedication">Church Dedication</label>
                          <Field type="number" name="churchDedication" placeholder="Your testimony" id="churchDedication" className="form-control form-control-lg"/>
                      </div>
                      <div className="form-group" htmlFor="notes">
                          <label htmlFor="notes">Notes</label>
                          <Field  as="textarea" rows="6" name="notes" placeholder="Notes" id="notes" className="form-control form-control-lg"/>
                      </div>
                      <div className="form-group mt-5">
                        <label htmlFor="customFile">Upload Images</label>
                            <input id="customfile" type="file" name="images" className="form-control-file" multiple onChange={(event) => {
                                props.setFieldValue("images", event.currentTarget.files)
                             }} />
                             <ErrorMessage name="images">
                                 {(msg) => <div className="text-danger">{msg}</div>}
                            </ErrorMessage>
                        </div>                            
                    
                      <input type="submit" value="Submit" className="btn btn-primary btn-lg" />
                      <button type="button" className="btn btn-default btn-lg" onClick={() => history.goBack()}>Go Back</button>
                  </Form>
              </R3Card>
          </div>
          </div>
        )}
        </Formik>
    )
}

export default NewOutreachForm;