import { Formik, Form, Field } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useHistory, useParams } from 'react-router-dom';
import R3Card from '../../../../components/Card';
import { AuthContext } from '../../../../context/AuthContext';
import requestAxios from '../../../../util/requestAxios';
import axios from 'axios';

const OutreachEditForm = () => {
    const history = useHistory();
    const [outreach, setOutreach] = useState({});
    const {userInfo} = useContext(AuthContext);
    const alert = useAlert();
    const {id} = useParams();

    useEffect(() => {
        const source = axios.CancelToken.source();

        const getTestimonies = async () => {
            try{
                const {data} = await requestAxios.get(`/outreaches/${id}`, {cancelToken:source.token});
                setOutreach(data.body);
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
    return(
        <Formik
        enableReinitialize
        initialValues={{newParish: outreach.newParish || 0, newNation: outreach.newNation || 0, churchDedication: outreach.churchDedication || 0}}
        onSubmit={async(values, actions) =>{
            try{
                const {data} = await requestAxios.put(`/outreaches/${id}`, values);
                alert.success(data.message);
                actions.resetForm();
                actions.setSubmitting(false);
                history.push(`/parish/outreaches/lists`);
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
                  <h2 className="NewMonetaryForm-title">Update Outreach</h2>
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

export default OutreachEditForm;