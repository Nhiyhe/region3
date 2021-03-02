import React, { useState, useEffect, useContext } from "react";
import { Field, Form, Formik } from "formik";
import axios from 'axios';
import { DatePicker } from "formik-antd";
import requestAxios from '../../../../util/requestAxios';
import R3Card from '../../../../components/Card';
import './ParishForm.css';
import { AuthContext } from "../../../../context/AuthContext";
import PageContent from '../../../../components/PageContent';
import {useAlert} from 'react-alert';
import Loading from "../../../../components/Loading";
import { dateFormatList } from "../../../../helpers/dateHelper";
import {ErrorMessage} from 'formik';

import * as yup from 'yup';

const validationSchema = yup.object().shape({
  email:yup.string().required().email().label("Email"),
  password:yup.string().required().label("Password"),
  name:yup.string().required().required().label("Parish Name"),
  parishEmailAddress:yup.string().required().label("Parish Email Address"),
  parishPastor:yup.string().required().label("Parish Pastor")
});


const ParishForm = () => {

    const {userInfo, isAdmin} = useContext(AuthContext);
    const [provinces, setProvinces] = useState([]);
    const [zones, setZones] = useState([]);
    const [countries, setCountries] = useState([]);
    const [pastors, setPastors] = useState([]);
    const [provinceId, setProvinceId] = useState("5fc5d6236c07300004aea00c");
    const [zoneId, setZoneId] = useState("5fc5d6236c07300004aea00c");
    const alert = useAlert();

    const [disableZoneDropdownList, setDisableZoneDropdownList] = useState(true);
    const [disableCountryDropdownList, setDisableCountryDropdownList] = useState(true);
    const [province, setProvince] = useState({});

    const getProvincePastor = async (id) => {
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

    useEffect(() => {
      const source = axios.CancelToken.source();
      const getProvinces = async () => {
        try{
          const { data } = await requestAxios.get("/provinces",{cancelToken:source.token});
          setProvinces(data.body);
        }catch(err){
          if(err.response && err.response.data){
            alert.error(err.response.data.message);
          }else{
          alert.error("An unexpected error occured.");
          }
        }
      };
        getProvinces();

        return (() => {
          source.cancel();
        })
   
    }, [])

    useEffect(() => {
      const source = axios.CancelToken.source();

      const getPastors = async () => {
        try{
          const { data } = await requestAxios.get("/pastors/dropdownlists", {cancelToken:source.token});
          console.log(data.body);
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
        source.cancel();
      })
 
  }, [])

    useEffect(() => {

      const source = axios.CancelToken.source();
      const getZonesByProvinceId = async () => {
        try{
          const { data } = await requestAxios.get(`/provinces/${provinceId}/zones`, {cancelToken:source.token});
          setZones(data.body);
        }
        catch(err){
          if(err.response && err.response.data){
            alert.error(err.response.data.message);
          }else{
          alert.error("An unexpected error occured.");
          }
      };
    }
      getZonesByProvinceId();

      return (() => {
        source.cancel();
      })
      
    },[provinceId])

    useEffect(() => {
      const source = axios.CancelToken.source();

      const getCountriesByZoneId = async (zoneId) => {
        try{
          const {data} = await requestAxios.get(`zones/${zoneId}/countries`, {cancelToken:source.token});
          setCountries(data.body);
        }catch(err){
          if(err.response && err.response.data){
            alert.error(err.response.data.message);
          }else{
          alert.error("An unexpected error occured.");
          }
        }
      }
      getCountriesByZoneId(zoneId);

      return (() => {
        source.cancel();
      })
    },[zoneId])

 if(!provinces.length) return <Loading />

 return (
    <Formik 
    initialValues={{email:"", password:"", name:"", parishEmailAddress:"", parishPastor:"", referenceNo:"",worshipCenterAddress:"",postalAddress:"",phoneNo:"", churchStartDate: new Date().toISOString(), city:""}}
    validationSchema={validationSchema}
    onSubmit={async (values, actions) => {
      values.provincePastor = province.pastor.id;
      values.province = provinceId;
      values.zone = zoneId;
      try{
        const {data} = await requestAxios.post( "/parishes/signup", values);
        actions.setSubmitting(false);
        actions.resetForm()
        alert.success(data.message);
        window.location = '/parishes/lists';
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
            <PageContent>
            <h2 className="ParishForm-heading">Create New Parish</h2>
            <R3Card>
              <Form>
              <div className="container">
                    <div className="">
                    <h3 className="ParishForm-subTitle">Parish Location Information.</h3>   
                    <div className="form-group">
                        <label className="form-label" htmlFor="province">Province</label>
                        <Field as="select" name="province" className="form-control form-control-lg" id="province" onChange={(e) => {
                          if(e.target.value)
                            setProvinceId(e.target.value);
                            getProvincePastor(e.target.value);
                            setZones([]);
                            setDisableZoneDropdownList(false);
                            setCountries([]);
                            setDisableCountryDropdownList(true);
                        }}>
                          <option value="">Select Province</option>
                          {isAdmin() && provinces.map((province) => {
                          return <option key={province.id} value={province.id}>{province.name}</option>;
                          })}
                          { !isAdmin() && provinces.filter((prov => prov.pastor.id === userInfo.id)).map((province) => {
                          return <option key={province.id} value={province.id}>{province.name}</option>;
                          })}
                        </Field>
                    </div>
    
                    <div className="form-group">
                      <label>Zone</label>
                      <Field as="select" name="zone" className="form-control form-control-lg" onChange={(e) => {
                        if (e.target.value)
                          setZoneId(e.target.value);
                          setDisableCountryDropdownList(false);
                      }} disabled={disableZoneDropdownList}>
                        <option value="">Select Zone</option>
                        {zones.map((zone) => {
                            return <option key={zone.id} value={zone.id}>{zone.name}</option>
                        })}
                      </Field>
                    </div>
    
                  <div className="form-group mb-5">
                    <label>Country</label>
                    <Field as="select" name="country" className="form-control form-control-lg" disabled = {disableCountryDropdownList}>
                      <option value="">Select Country</option>
                      {countries.map((country) => {
                          return <option key={country.id} value={country.id}>{country.countryName}</option>
                      })}
                    </Field>
                  </div>             
    
                  <h3 className="ParishForm-subTitle">Parish Details</h3>   
                 
                  <div className="form-row">
                      <div className="form-group col">
                          <label>Parish Name</label>
                          <Field name="name" placeholder="Parish Name" className="form-control form-control-lg"/>
                          <ErrorMessage name="name">
                            {(msg) => <div className="text-danger">{msg}</div>}
                          </ErrorMessage>
                      </div>
                      <div className="form-group col">
                          <label>Parish Email</label>
                          <Field name="parishEmailAddress" placeholder="Email" className="form-control form-control-lg" />
                          <ErrorMessage name="parishEmailAddress">
                            {(msg) => <div className="text-danger">{msg}</div>}
                          </ErrorMessage>
                      </div>
                  </div>
    
                  <div className="form-row">
                      <div className="form-group col-7">
                        <label className="form-label">Pastor in Charge</label>
                        <Field as="select" name="parishPastor" className="form-control form-control-lg">
                          <option value="">Select Pastor</option>
                          {pastors.filter(parishPastor => parishPastor.position.toLowerCase() === "parish pastor").map((pastor) => {
                              return <option key={pastor.id} value={pastor.id}>{pastor.firstName} {pastor.lastName}</option>
                          })}
                        </Field>
                        <ErrorMessage name="parishPastor">
                            {(msg) => <div className="text-danger">{msg}</div>}
                          </ErrorMessage>
                      </div>
    
                      <div className="form-group mb-5 col-5">
                          <label>Reference Number</label>
                          <Field name="referenceNo" placeholder="Reference Number" className="form-control form-control-lg" />
                      </div>
                  </div>
                  <div className="form-row">
                      <div className="form-group col-4">
                          <label className="form-label">Worship Center Address</label>
                          <Field as="textarea" name="worshipCenterAddress" className="form-control" name="worshipCenterAddress" rows="5"/>
                          <ErrorMessage name="worshipCenterAddress">
                          {(msg) => <div className="text-danger">{msg}</div>}
                        </ErrorMessage>
                      </div>
                      <div className="form-group col-4">
                          <label className="form-label">Postal Address</label>
                          <Field name="postalAddress" as="textarea" name="postalAddress" className="form-control" rows="5"/>
                          <ErrorMessage name="postalAddress">
                            {(msg) => <div className="text-danger">{msg}</div>}
                          </ErrorMessage>
                      </div>
                      <div className="form-group col-4">
                          <label className="form-label">City</label>
                          <Field name="city" placeholder="City" className="form-control form-control-lg" />
                          <ErrorMessage name="city">
                            {(msg) => <div className="text-danger">{msg}</div>}
                          </ErrorMessage>
                      </div>
                  </div>
                  <div className="form-row">
                      <div className="form-group col-5">
                          <label className="form-label">Parish Tel. No</label>
                          <Field name="phoneNo" placeholder="Telephone Number" type="tel" className="form-control form-control-lg" />
                      </div>
                      <div className="form-group col-5">
                          <label className="form-label">Church Start Date</label>
                          <DatePicker name="churchStartDate" placeholder="Church Start Date" className="form-control form-control-lg" format={dateFormatList[0]} />
                          <ErrorMessage name="churchStartDate">
                         {(msg) => <div className="text-danger">{msg}</div>}
                       </ErrorMessage>
                      </div>
                  </div>
                  <h3 className="ParishForm-subTitle mt-3">Login Details</h3>   
                  <div className="form-group">
                      <label className="form-label" htmlFor="email">Email</label>
                      <Field name="email" placeholder="Email" className="form-control form-control-lg" id="email" />
                      <ErrorMessage name="email">
                         {(msg) => <div className="text-danger">{msg}</div>}
                       </ErrorMessage>
                  </div>
                  <div className="form-group">
                      <label className="form-label" htmlFor="email">Password</label>
                      <Field type="password" name="password" placeholder="Password" className="form-control form-control-lg" id="password" />
                      <ErrorMessage name="password">
                         {(msg) => <div className="text-danger">{msg}</div>}
                       </ErrorMessage>
                  </div>
                 
                   <div className="mt-5">
                    <input type="submit" value="CREATE PARISH" className="btn btn-primary mr-2 btn-lg" />
                    <button className="btn btn-info btn-lg" type="reset">RESET</button>
                   </div>
                </div>
              </div>
              </Form>
            </R3Card>
        </PageContent>
        )}
    </Formik>
  );
};


export default ParishForm;