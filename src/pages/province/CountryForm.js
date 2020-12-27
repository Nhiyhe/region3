import { Field, Form, ResetButton, SubmitButton } from "formik-antd";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import requestAxios from '../../util/requestAxios';
import R3Card from '../../components/Card';
import './CountryForm.css';
import { AuthContext } from "../../context/AuthContext";
import CountryList from "./CountryList";
import PageContent from '../../components/PageContent';

const CountryForm = () => {
  const {userInfo, isAdmin} = useContext(AuthContext);

  const [provinces, setProvinces] = useState([]);
  const [zones, setZones] = useState([]);
  const [provinceId, setProvinceId] = useState("5fc5d6236c07300004aea00c");

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

  return (
    <PageContent>
      <Form>
      <div className="CountryForm">
        <h2 className="CountryForm-heading">Create New Country</h2>
           <div className="col-6 offset-3">
              <R3Card>
             
              <div className="form-group">        
                <label htmlFor="province" className="form-label">Province</label>
                <Field as="select" className="form-control form-control-lg" id="province" 
                onChange={e => {
                    if(e.target.value){
                      setProvinceId(e.target.value);
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
                </div>

                <div className="form-group">
                  <label htmlFor="capital" className="form-label">Capital </label>
                  <Field name="countryCapital" placeholder="Capital Name" className="form-control form-control-lg" id="capital" />
                </div>

                <div className="mt-5">
                        <SubmitButton type="primary" disabled={false}>Submit</SubmitButton>
                        <ResetButton>Reset</ResetButton>
                </div>
               
              </R3Card>
           </div>

        <div>
           <R3Card>
             <CountryList />
           </R3Card>
        </div>
      </div>
    </Form>
    </PageContent>
  );
};

export default CountryForm;
