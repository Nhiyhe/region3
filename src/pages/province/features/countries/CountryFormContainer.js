import { Formik, Form, ErrorMessage } from "formik";
import {ResetButton, Field, SubmitButton } from "formik-antd";
import PageContent from '../../../../components/PageContent';
import React, { useState, useContext, useEffect } from "react";
import * as Yup from "yup";
import requestAxios from "../../../../util/requestAxios";
import { useHistory } from "react-router-dom";
import {useAlert} from 'react-alert';
import { AuthContext } from "../../../../context/AuthContext";
import R3Card from '../../../../components/Card';
import axios from 'axios';
import Loading from "../../../../components/Loading";


const schema = Yup.object().shape({
  zone: Yup.string().required("Please select a Zone"),
  countryName: Yup.string().required("Please enter Country"),
  countryCapital: Yup.string().required("Please enter Country Capital"),
});

const CountryFormContainer = () => {
  const {userInfo, isAdmin} = useContext(AuthContext);
  const [provinces, setProvinces] = useState([]);
  const [zones, setZones] = useState([]);
  const [provinceId, setProvinceId] = useState("5fc5d6236c07300004aea00c");
  const alert = useAlert();
  const history = useHistory();

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getProvinces = async () => {
      try{
        const { data } = await requestAxios.get("/provinces",{cancelToken:source.token});
        setProvinces(data.body);
      }catch(err){
        console.log(err.message);
      }
    };
    getProvinces();
    
    return (()=> {
      source.cancel()
    })
  }, []);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const getZonesByProvinceId= async (provinceId) => {
      try{
        const { data } = await requestAxios.get(`/provinces/${provinceId}/zones`, {cancelToken:source.token});
        setZones(data.body);
      }catch(err){
        console.error(err.message)
      }
    };
    getZonesByProvinceId(provinceId);

    return (() => {
      source.cancel();
    })
  }, [provinceId]);

  if(!provinces.length && !zones.length) return <Loading />

  return (
    <Formik
      initialValues={{zone:"", countryName: "", countryCapital:"", pastor:userInfo.id }}
      validationSchema={schema}
      onSubmit={async (values, {setSubmitting}) => {
        try{
          values.province = provinceId;
          const {data} = await requestAxios.post(`/countries`, {...values});
          alert.success(data.message);
          setSubmitting(false);
          history.push('/countries/lists');
        }catch(err){
          if(err.response && err.response.data){
            alert.error(err.response.data.message);
          }else{
          alert.error("An unexpected error occured.");
          }
        }
      }}
    >
      { () => (
            <PageContent>
            <Form>
            <div className="CountryForm">
              <h2 className="CountryForm-heading">Create New Country</h2>
                 <div className="col-6 offset-3">
                    <R3Card>
                   
                    <div className="form-group">        
                      <label htmlFor="province" className="form-label">Province</label>
                      <Field as="select" className="form-control form-control-lg" name="province" id="province" 
                      onChange={e => {
                        const value = e.target.value;
                          if(value){
                            setProvinceId(value);
                          }
                          }}>
                        <option value="">Select Province</option>
      
                        { isAdmin() &&  provinces.map((province) => {
                           return <option key={province.id} value={province.id}>{province.name}</option>
                        })}
                        { !isAdmin() && provinces?.filter((prov => prov.pastor.id === userInfo.id)).map((province) => {
                          return <option key={province.id} value={province.id}>{province.name}</option>
                        })}
                      </Field>
                    </div>
      
                      <div className="form-group">
                        <label htmlFor="zone" className="form-label">Zone</label>
                        <Field as="select" name="zone" className="form-control form-control-lg" id="zone">
                          <option value="">Select Zone</option>
                          {zones.map((zone) => {
                            return (
                              <option key={zone.id} value={zone.id}>
                                {zone.name}
                              </option>
                            );
                          })}
                        </Field>
                      </div>
      
                      <div className="form-group">
                        <label htmlFor="country" className="form-label">Name</label>
                        <Field name="countryName" placeholder="Country Name" className="form-control form-control-lg" id="country" />
                        <ErrorMessage name="countryName">
                          {(msg) => <div className="text-danger">{msg}</div>}
                        </ErrorMessage>
                      </div>
      
                      <div className="form-group">
                        <label htmlFor="capital" className="form-label">Capital </label>
                        <Field name="countryCapital" placeholder="Capital Name" className="form-control form-control-lg" id="capital" />
                        <ErrorMessage name="countryCapital">
                          {(msg) => <div className="text-danger">{msg}</div>}
                        </ErrorMessage>
                      </div>
      
                      <div className="mt-5">
                              <SubmitButton type="primary" disabled={false}>Submit</SubmitButton>
                              <ResetButton>Reset</ResetButton>
                      </div>
                     
                    </R3Card>
                 </div>
            </div>
          </Form>
          </PageContent>
      ) }
    </Formik>
  )
};

export default CountryFormContainer;
