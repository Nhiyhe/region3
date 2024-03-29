import React, { useState, useEffect } from "react";
import Axios from '../../../../util/requestAxios';
import { Form } from "formik";
import { Field, ResetButton, SubmitButton } from "formik-antd";
import axios from 'axios';
import R3Card from '../../../../components/Card';
import './NewProvinceForm.css';
import Loading from '../../../../components/Loading';
import {ErrorMessage} from 'formik';

const NewProvinceForm = ({province, mode}) => {
  const [provinces, setProvinces] = useState([]);
  const [pastors, setPastors] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getProvinces = async () => {
      try{
        const { data } = await Axios.get("/provinces", {cancelToken:source.token});
        setProvinces(data.body);
      }catch(err){
        console.error(err)
      }
    };
    getProvinces();
    return (() => {
      source.cancel()
    })
  }, []);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getPastors = async () => {
      try{
        const { data } = await Axios.get("/pastors/dropdownlists", {cancelToken:source.token});
        setPastors(data.body);
      }catch(err){
        console.error(err);
      }
    };
    getPastors();
    return (() => {
      source.cancel()
    })
  },[])

  if(!province.name && mode === 'editing'){
    return <Loading />
  }

  if(mode !== 'editing' && !pastors.length) return <Loading />
  
  console.log(pastors);
  return (
     <div className="NewProvinceForm">
          <h2 className="ProvinceForm-heading">{province.name ? `Editing ${province.name}` : 'Create New Province'}</h2>
            <div className="col-8 offset-2">
            <R3Card>
                <Form>
                        <div className="form-group">
                          <label>Name</label>
                          <Field type="text" name="name" placeholder="Province Name" className="form-control form-control-lg" />
                            <ErrorMessage name="name">
                              {(msg) => <div className="text-danger">{msg}</div>}
                            </ErrorMessage>
                        </div>

                        <div className="form-group">
                          <label>Location</label>
                          <Field type="text" name="locationAddress" placeholder="Province Location" className="form-control form-control-lg"  />
                          <ErrorMessage name="locationAddress">
                            {(msg) => <div className="text-danger">{msg}</div>}
                          </ErrorMessage>
                        </div>

                        <div  className="form-group">
                          <label>Province Pastor</label>
                          <Field as="select" name="pastor" className="form-control form-control-lg" >
                            <option value="">Select Province Pastor</option>
                            {pastors.filter(p => p.position.toLowerCase() === 'province pastor' && !p.isAdmin).map((pastor) => {
                              return (
                                <option key={pastor._id} value={pastor._id}>
                                  {pastor.firstName} {pastor.lastName}
                                </option>
                              );
                            })}
                          </Field>
                            <ErrorMessage name="pastor">
                              {(msg) => <div className="text-danger">{msg}</div>}
                            </ErrorMessage>
                        </div>
                        <div className="mt-5">
                        <SubmitButton type="primary" disabled={false}>
                          {mode === 'editing' ?  'Update' : 'Create'}
                        </SubmitButton>
                        <ResetButton>Reset</ResetButton>
                        </div>
                    </Form>
          </R3Card>
            </div>
       <div>        
       </div>
       </div>
  );
};

export default NewProvinceForm;
