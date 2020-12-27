import React, { useState, useEffect } from "react";
import Axios from '../../util/requestAxios';
import { Form } from "formik";
import { Field, ResetButton, SubmitButton } from "formik-antd";
import axios from 'axios';
import R3Card from '../../components/Card';
import './ProvinceForm.css';
import ProvinceList from "./ProvinceList";
import ProvinceEditFormContainer from "./ProvinceEditFormContainer";
import SubNavBar from "../../components/SubNavBar";

const ProvinceForm = () => {
  const [provinces, setProvinces] = useState([]);
  const [pastors, setPastors] = useState([]);
  const [isEditing, setIsEditing] =useState(false);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getProvinces = async () => {
      try{
        const { data } = await Axios.get("/provinces", {cancelToken:source.token});
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

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getPastors = async () => {
      const { data } = await Axios.get("/pastors", {cancelToken:source.token});
      setPastors(data.body);
    };
    getPastors();
    return (() => {
      source.cancel()
    })
  },[])
  return (
     <div className="ProvinceForm">
       <SubNavBar />
       <div className="container">         
          <h2 className="ProvinceForm-heading">Create New Province</h2>
            <div className="col-8 offset-2">

            <R3Card>
                <Form>
                        <div className="form-group">
                          <label>Name</label>
                          <Field type="text" name="name" placeholder="Province Name" className="form-control form-control-lg" />
                        </div>

                        <div className="form-group">
                          <label>Location</label>
                          <Field type="text" name="locationAddress" placeholder="Province Location" className="form-control form-control-lg"  />
                        </div>

                        <div  className="form-group">
                          <label>Province Pastor</label>
                          <Field as="select" name="pastor" className="form-control form-control-lg" >
                            <option value="">Select Province Pastor</option>
                            {pastors.filter(p => p.position.toLowerCase() === 'province pastor').map((pastor) => {
                              return (
                                <option key={pastor.id} value={pastor.id}>
                                  {pastor.pastorName}
                                </option>
                              );
                            })}
                          </Field>
                        </div>
                        <div className="mt-5">
                        <SubmitButton type="primary" disabled={false}>
                          Create
                        </SubmitButton>
                        <ResetButton>Reset</ResetButton>
                        </div>
                    </Form>
          </R3Card>
            </div>
       <div>
         <R3Card>
           {!isEditing && <ProvinceList setIsEditing={setIsEditing} />}
           {isEditing && <ProvinceEditFormContainer/>}
         </R3Card>
       </div>
       </div>
     </div>
  );
};

export default ProvinceForm;
