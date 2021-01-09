import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import requestAxios from '../../util/requestAxios';
import {AuthContext} from '../../context/AuthContext';
import { useAlert } from 'react-alert';
import Loading from '../../components/Loading';
import R3Card from '../../components/Card';
import { Form, Formik, Field } from 'formik';
import moment from 'moment';
import {DatePicker} from 'formik-antd';
import { dateFormatList } from '../../helpers/dateHelper';
import { useHistory } from 'react-router-dom';
import PageContent from '../../components/PageContent';

const PastorEditForm = () => {

    const {userInfo} = useContext(AuthContext);
    const [pastor, setPastor] = useState({});
    const history = useHistory();

    const alert = useAlert();

    useEffect(() => {
        const source = axios.CancelToken.source();

        const getPastor = async() => {
            try{
            const {data} = await requestAxios.get(`/pastors/${userInfo.id}`, {cancelToken:source.token});
            setPastor(data.body);
            }catch(err){
                console.error(err);
                if(err.response && err.response.data){
                    alert.error(err.response.data.message);
                  }else{
                  alert.error("An unexpected error occured.");
                  }
            }
        }
        getPastor();

                
   return (() => {
    source.cancel()
  })
    },[]);

    if(!pastor.firstName) return <Loading />

    return(
        <Formik
        enableReinitialize 
        initialValues={{
            firstName: pastor.firstName || "",
            middleName: pastor.middleName || "",
            lastName: pastor.lastName || "",
            dateOfBirth: pastor.dateOfBirth || new Date().toISOString(),
            gender: pastor.gender || "",
            phone: pastor.phone || "",
            urn: pastor.urn || "",
            // position: pastor.position || "",
            spouseFirstName: pastor.spouseFirstName || "",
            spouseMiddleName: pastor.spouseMiddleName || "",
            spouseLastName: pastor.spouseLastName || "",
            spouseDateOfBirth: pastor.spouseDateOfBirth || new Date().toISOString(),
            memorableOccassion: pastor.memorableOccassion || "",
            dateOfMemorableOccassion: pastor.dateOfMemorableOccassion || new Date().toISOString()
          }}
          onSubmit={async (values) => {
            try{
              const {data} = await requestAxios.put(`/pastors/${pastor.id}`,values); 
              alert.success(data.message);
              history.push('/pastor/details');
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
<div className="PastorForm">
<h2 className="PastorForm-heading">Editing {pastor.firstName} {pastor.lastName}</h2>
<div>
<R3Card>
<Form>
    <h3 className="PastorForm-subTitle">Pastor's Information.</h3>            
 <div className="form-row">
     <div className="form-group col-4">
         <label>FirstName</label>
         <Field name="firstName" placeholder="FirstName" className="form-control form-control-lg"  />
     </div>

     <div className="form-group col-4">
         <label>MiddleName</label>
         <Field name="middleName" placeholder="MiddleName" className="form-control form-control-lg" />
     </div>

     <div className="form-group col-4"> 
         <label>LastName</label>
         <Field name="lastName" placeholder="LastName" className="form-control form-control-lg" />
     </div>
 </div>

<div className="form-row">
     <div className="form-group col-4">
             <label>Date of Birth</label>
             <DatePicker name="dateOfBirth"  className="form-control form-control-lg" defaultValue={moment(pastor.dateOfBirth)} format={dateFormatList[0]}/>
         </div>
         <div className="form-group col-4">
             <label>Phone</label>
             <Field name="phone" placeholder="Phone Number" className="form-control form-control-lg" />
         </div>
</div>

<div className="form-row">                
<div className="form-group col-6">
     <label htmlFor="gender" className="form-label">Gender</label>
     <Field as="select" name="gender" className="form-control form-control-lg" id="gender">
         <option value="">Select Gender</option>
         <option value="Male">Male</option>
         <option value="Female">Female</option>
     </Field>
 </div>

     <div className="form-group col-4">
         <label>URN</label>
         <Field name="urn" placeholder="URN" className="form-control form-control-lg" />
     </div>
</div>

 <h3 className="PastorForm-subTitle mt-5">Pastor's Spouse Information.</h3>  
 <div className="form-row">
     <div className="form-group col-4">
         <label>FirstName</label>
         <Field name="spouseFirstName" placeholder="FirstName" className="form-control form-control-lg" />
     </div>

     <div className="form-group col-4">
         <label>MiddleName</label>
         <Field name="spouseMiddleName" placeholder="MiddleName" className="form-control form-control-lg" />
     </div>

     <div className="form-group col-4">
         <label>MiddleName</label>
         <Field name="spouseLastName" placeholder="LastName" className="form-control form-control-lg" />
     </div>
 </div>

<div className="form-row">
     <div className="form-group col-4">
         <label>Date of Birth</label>
         <DatePicker name="spouseDateOfBirth" className="form-control form-control-lg" defaultValue={moment(pastor.spouseDateOfBirth)} format={dateFormatList[0]} />
     </div>
</div>

<h3 className="PastorForm-subTitle mt-5">Other Information.</h3>  
<div className="form-row">
     <div className="form-group col-4">
         <label>Memorable Occasion</label>
         <Field name="memorableOccassion" placeholder="Memorable Occasion" className="form-control form-control-lg" />
     </div>

     <div className="form-group col-4">
         <label>Memorable Occasion Date</label>
         <DatePicker name="dateOfMemorableOccassion" className="form-control form-control-lg" defaultValue={moment(pastor.dateOfMemorableOccassion)} format={dateFormatList[0]} />
     </div>
</div>
<div className="form-group mt-5">
     <input type="submit" value="UPDATE" className="btn btn-primary btn-lg mr-3" />
     <button type="reset" className="btn btn-warning btn-lg">DISCARD CHANGES</button>
</div>
</Form>
</R3Card>
</div>
</div>
</PageContent>

        )}
        </Formik>
    )
}

export default PastorEditForm;