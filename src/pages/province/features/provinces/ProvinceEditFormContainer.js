import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import requestAxios from '../../../../util/requestAxios';
import {useAlert} from 'react-alert';
import { Form } from "formik";
import { Field, ResetButton, SubmitButton } from "formik-antd";
import axios from 'axios';
import R3Card from '../../../../components/Card';
import Loading from '../../../../components/Loading';

const ProvinceEditFormContainer = ()  => {
    let alert = useAlert();
    let {id} = useParams();
    let history = useHistory();

    const [province, setProvince]= useState({});
    const [pastors, setPastors] = useState([]);

    useEffect(() => {
        const source = axios.CancelToken.source();
        const getPastors = async () => {
          try{
            const { data } = await requestAxios.get("/pastors", {cancelToken:source.token});
            setPastors(data.body);
          }catch(err){
            if(err.response && err.response.data){
              alert.error(err.response.data.message);
            }else{
            alert.error("An unexpected error occured.");
            }
          }
        };
        getPastors();
        return (() => {
          source.cancel()
        })
      },[])

    useEffect(() => {   
        const getProvinces = async () => {
            try{
                const {data} = await requestAxios.get(`/provinces/${id}`);
                 setProvince(data.body);
            }catch(err){
              if(err.response && err.response.data){
                alert.error(err.response.data.message);
              }else{
              alert.error("An unexpected error occured.");
              }
            }
        }
        getProvinces();
    }, []);

    if(!province.name) return <Loading />
    
    return (
        <Formik
        enableReinitialize={true}
        initialValues={{name: province.name || "", locationAddress: province.locationAddress || "", pastor: province.pastor?.id || "" }}
        onSubmit= {async (updatedValues) => {            
            try{
                console.log(province, updatedValues);
                const {data} = await requestAxios.put(`/provinces/${id}`,updatedValues);
                alert.success(data.message);
                history.push("/provinces/lists");
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
                <div>
                    <h2 className="ProvinceForm-heading">{`Editing ${province.name}`}</h2>
            <div className="col-8 offset-2">
            <R3Card>
                <Form>
                        <div className="form-group">
                          <label className="form-label" htmlFor="name">Name</label>
                          <Field type="text" name="name" placeholder="Province Name" className="form-control form-control-lg" id="name" />
                        </div>

                        <div className="form-group">
                          <label className="form-label" htmlFor="locationAddress">Location</label>
                          <Field type="text" name="locationAddress" placeholder="Province Location" id="locationAdress" className="form-control form-control-lg"  />
                        </div>

                        <div className="form-group">
                          <label className="form-label" htmlFor="pastor">Province Pastor</label>
                          <Field as="select" name="pastor" className="form-control form-control-lg" id="pastor" >
                            <option value="">Select Province Pastor</option>
                            {pastors.filter(p => p.position.toLowerCase() === 'province pastor').map((pastor) => {
                              return (
                                <option key={pastor.id} value={pastor.id}>
                                  {pastor.firstName} {pastor.lastName}
                                </option>
                              );
                            })}
                          </Field>
                        </div>
                        <div className="mt-5">
                        <SubmitButton type="primary" disabled={false}>
                          Update
                        </SubmitButton>
                        <ResetButton>Reset</ResetButton>
                        </div>
                    </Form>
          </R3Card>
            </div>
       <div>        
       </div>
                </div>
            )}
        </Formik>
    )
}

export default ProvinceEditFormContainer;