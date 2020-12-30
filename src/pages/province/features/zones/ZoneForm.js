import React, { useState, useEffect, useContext } from "react";
import { Form, Field } from "formik";
import axios from "axios";
import { ResetButton, SubmitButton } from "formik-antd";
import { AuthContext } from "../../../../context/AuthContext";
import requestAxios from '../../../../util/requestAxios';
import R3Card from "../../../../components/Card";
import './ZoneForm.css';
import PageContent from '../../../../components/PageContent';
import Loading from "../../../../components/Loading";


const ZoneForm = () => {
  const {userInfo, isAdmin} = useContext(AuthContext);
  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getProvinces = async () => {
      try{
        const { data } = await requestAxios.get('/provinces',{cancelToken:source.token});
        setProvinces(data.body);
      }catch(err){
        console.error(err.message)
      }
    };
    getProvinces();

    return (() => {
      source.cancel()
    })
  }, []);

  if(!provinces.length) return <Loading />
  return (
   <PageContent>
     <div className="ZoneForm">
       <h2 className="ZoneForm-heading">Create New Zone</h2>    
      <div className="col-6 offset-3">
      <R3Card>
      <Form>
    <div className="form-group">
      <label>Provinces</label>
      <Field as="select" name="province" className="form-control form-control-lg">
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
        <Field name="name" placeholder="Zone Name" className="form-control form-control-lg" />
      </div>

      <div className="form-group">
        <label htmlFor="location" className="form-label">Location</label>
        <Field name="locationAddress" placeholder="Location Address" className="form-control form-control-lg" id="location" />
      </div>

      <div className="mt-5">
        <SubmitButton type="primary" disabled={false}>Create</SubmitButton>
      <ResetButton>Reset</ResetButton>
      </div>
  </Form>
    </R3Card>
      </div>
   </div>
   </PageContent>
  );
};

export default ZoneForm;
