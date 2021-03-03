import { Formik } from 'formik';
import { Form, Field } from 'formik';
import React, { useEffect, useState } from 'react';
import R3Card from '../../../../components/Card';
import { DatePicker } from "formik-antd";
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import requestAxios from '../../../../util/requestAxios';
import Loading from '../../../../components/Loading';
import { dateFormatList } from '../../../../helpers/dateHelper';
import moment from 'moment';
import { useAlert } from 'react-alert';


const ParishEditForm = () => {  
    const [parish, setParish] = useState({});
    const [pastors, setPastors] = useState([]);
    const {id} = useParams();
    const history = useHistory();
    const alert = useAlert();

    useEffect(()=> {
        const source = axios.CancelToken.source();

        const getParishById = async() => {
            try{
            const {data} = await requestAxios.get(`/parishes/${id}`, {cancelToken:source.token});
            setParish(data.body);
            }catch(err){
                console.error(err);
                if(err.response && err.response.data){
                    alert.error(err.response.data.message);
                  }else{
                  alert.error("An unexpected error occured.");
                  }
            }
        }

        getParishById();

        const getPastors = async() => {
            try{
            const {data} = await requestAxios.get(`/pastors`, {cancelToken:source.token});
            setPastors(data.body);
            }catch(err){
                console.error(err);
                if(err.response && err.response.data){
                    alert.error(err.response.data.message);
                  }else{
                  alert.error("An unexpected error occured.");
                  }
            }
        }
        getPastors();

                
   return (() => {
    source.cancel()
  })
    }, []);
    if(!parish.name) return <Loading />
    return (
        <Formik
        enableReinitialize
        initialValues={{name:parish.name || "", parishEmailAddress: parish.parishEmailAddress || "",phoneNo: parish.phoneNo || "",referenceNo: parish.referenceNo || "",parishPastor: parish.parishPastor.id || "", provincePastor:parish.provincePastor || "", worshipCenterAddress: parish.worshipCenterAddress || "",postalAddress: parish.postalAddress || "", city: parish.city || "",churchStartDate:parish.churchStartDate || new Date().toISOString() }}
        onSubmit={async (values) => {
            try{
                const {data} = await requestAxios.put(`/parishes/${parish.id}`, values);        
                alert.success(data.message);
                history.push('/parishes/lists');
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
                 <h2>Editing {parish.name}</h2>
                 <div className="col-md-8 offset-2">
                    <R3Card>
                        <Form>
                            <div className="form-group">
                                <label className="form-label" htmlFor="parishName">Name</label>
                                <Field name="name" className="form-control form-control-lg" id="parishName" />
                            </div>

                            {/* <div className="form-group">
                                <label className="form-label" htmlFor="parishEmail">Email</label>
                                <Field name="parishEmailAddress" className="form-control form-control-lg" id="parishEmail" />
                            </div> */}

                            <div className="form-group">
                                <label className="form-label" htmlFor="parishEmail">Parish Pastor</label>
                                <Field as="select" name="parishPastor" className="form-control form-control-lg">
                                  {pastors.filter(p => p.position.toLowerCase() === 'parish pastor').map(pastor => {
                                      return <option key={pastor.id} value={pastor.id}>{pastor.firstName} {pastor.lastName}</option>
                                  })}
                                </Field>
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="parishEmail">Province Pastor</label>
                                <Field as="select" name="provincePastor" className="form-control form-control-lg">
                                  {pastors.filter(p => p.position.toLowerCase() === 'province pastor').map(pastor => {
                                      return <option key={pastor.id} value={pastor.id}>{pastor.firstName} {pastor.lastName}</option>
                                  })}
                                </Field>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Worship Center Address</label>
                                <Field as="textarea" name="worshipCenterAddress" className="form-control" name="worshipCenterAddress" rows="5"/>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Postal Address</label>
                                <Field name="postalAddress" as="textarea" name="postalAddress" className="form-control" rows="5"/>
                            </div>
                            <div className="form-group">
                                <label className="form-label">City</label>
                                <Field name="city" placeholder="City" className="form-control form-control-lg" />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Parish Tel. No</label>
                                <Field name="phoneNo" placeholder="Telephone Number" type="tel" className="form-control form-control-lg" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Church Start Date</label>
                                <DatePicker name="churchStartDate" placeholder="Start Date" className="form-control form-control-lg" defaultValue={moment(parish.churchStartDate)} format={dateFormatList[0]} />
                            </div>

                            <div className="mt-5">
                                <input type="submit" value="UPDATE PARISH" className="btn btn-primary mr-2 btn-lg" />
                                <button className="btn btn-info btn-lg">RESET</button>
                            </div>
                        </Form>
                     </R3Card>
                 </div>
             </div>
         )}
        </Formik>
    )
}

export default ParishEditForm;