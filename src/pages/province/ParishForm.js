import React, { useState, useEffect, useContext } from "react";
import { Field, Form } from "formik";
import axios from 'axios';
import { DatePicker } from "antd";
import requestAxios from '../../util/requestAxios';
import R3Card from '../../components/Card';
import './ParishForm.css';
import { AuthContext } from "../../context/AuthContext";
import PageContent from '../../components/PageContent';

const ParishForm = () => {

    const {userInfo, isAdmin} = useContext(AuthContext);
    const [provinces, setProvinces] = useState([]);
    const [zones, setZones] = useState([]);
    const [countries, setCountries] = useState([]);
    const [pastors, setPastors] = useState([]);
    const [provinceId, setProvinceId] = useState("5fc5d6236c07300004aea00c");
    const [zoneId, setZoneId] = useState("5fc5d6236c07300004aea00c");

    const [disableZoneDropdownList, setDisableZoneDropdownList] = useState(true);
    const [disableCountryDropdownList, setDisableCountryDropdownList] = useState(true);

    useEffect(() => {
      const source = axios.CancelToken.source();
      const getProvinces = async () => {
        try{
          const { data } = await requestAxios.get("/provinces",{cancelToken:source.token});
          setProvinces(data.body);
        }catch(err){
          console.error(err.message)
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
          const { data } = await requestAxios.get("/pastors", {cancelToken:source.token});
          setPastors(data.body);
        }catch(err){
          console.error(err.message)
        }
      };
      getPastors();

      return (() => {
        source.cancel();
      })
 
  }, [])

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
    },[provinceId]);

    useEffect(() => {
      const source = axios.CancelToken.source();

      const getCountriesByZoneId = async (zoneId) => {
        try{
          const {data} = await requestAxios.get(`zones/${zoneId}/countries`, {cancelToken:source.token});
          setCountries(data.body);
        }catch(err){
          console.error(err.message)
        }
      }
      getCountriesByZoneId(zoneId);

      return (() => {
        source.cancel();
      })
    },[zoneId])


  return (
    <PageContent>
        <Form>
        <h2 className="ParishForm-heading">Create New Parish</h2>
        <R3Card>
          <div className="container">
                <div className="">
                <h3 className="ParishForm-subTitle">Parish Location Information.</h3>   
                <div className="form-group">
                    <label htmlFor="province" className="form-label">Province</label>
                    <Field as="select" name="province" className="form-control form-control-lg" id="province" onChange={(e) => {
                      if(e.target.value)
                        setProvinceId(e.target.value);
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
                      <Field name="parishName" placeholder="Parish Name" className="form-control form-control-lg"/>
                  </div>
                  <div className="form-group col">
                      <label>Parish Email</label>
                      <Field name="emailAddress" placeholder="Email" className="form-control form-control-lg" />
                  </div>
              </div>

              <div className="form-row">
                  <div className="form-group col-7">
                    <label>Pastor in Charge</label>
                    <Field as="select" name="parishPastor" className="form-control form-control-lg">
                      <option value="">Select Pastor</option>
                      {pastors.map((pastor) => {
                          return <option key={pastor.id} value={pastor.id}>{pastor.pastorName}</option>
                      })}
                    </Field>
                  </div>

                  <div className="form-group mb-5 col-5">
                      <label>Reference Number</label>
                      <Field name="referenceNo" placeholder="Reference Number" className="form-control form-control-lg" />
                  </div>
              </div>
              <div className="form-row">
              <div className="form-group col-4">
                  <label>Worship Center Address</label>
                  <Field as="textarea" className="form-control" name="worshipCenterAddress" rows="5"/>
              </div>
              <div className="form-group col-4">
                  <label>Postal Address</label>
                  <Field as="textarea" name="postalAddress" className="form-control" rows="5"/>
              </div>
              <div className="form-group col-4">
                  <label>City</label>
                  <Field name="city" placeholder="City" className="form-control form-control-lg" />
              </div>
              </div>
              <div className="form-row">
                  <div className="form-group col-5">
                      <label>Parish Tel. No</label>
                      <Field name="phoneNo" placeholder="Telephone Number" type="tel" className="form-control form-control-lg" />
                  </div>
                  <div className="form-group col-5">
                      <label>Church Start Date</label>
                      <DatePicker name="DateOfTheChurchStart" placeholder="Start Date" className="form-control form-control-lg" />
                  </div>
              </div>
             
               <div className="mt-5">
                <input type="submit" value="Create" />
               </div>
            </div>
          </div>
        </R3Card>
    </Form>
    </PageContent>
  );
};


export default ParishForm;