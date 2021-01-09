import { DatePicker } from 'formik-antd';
import { Form } from 'formik';
import { Field } from 'formik-antd';
import React from 'react';
import R3Card from '../../../../components/Card';
import './PastorForm.css';
import PageContent from '../../../../components/PageContent';
import { dateFormatList } from '../../../../helpers/dateHelper';

const PastorForm = () => {
    return (
       <PageContent>
           <div className="PastorForm">
           <h2 className="PastorForm-heading">Create New Pastor</h2>
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
                        <DatePicker name="dateOfBirth"  className="form-control form-control-lg" format={dateFormatList[0]}/>
                    </div>
                    <div className="form-group col-4">
                        <label>Phone</label>
                        <Field name="phone" placeholder="Phone Number" className="form-control form-control-lg" />
                    </div>
           </div>

          <div className="form-row">                
            <div className="form-group col-6">
                <label className="form-label" htmlFor="position">Position</label>
                <Field as="select" name="position" className="form-control form-control-lg" id="position">
                    <option value="Parish Pastor">Parish Pastor</option>
                    <option value="Province Pastor">Province Pastor</option>
                </Field>
            </div>

                <div className="form-group col-4">
                    <label>URN</label>
                    <Field name="urn" placeholder="URN" className="form-control form-control-lg" />
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
                    <DatePicker name="spouseDateOfBirth" className="form-control form-control-lg"  format={dateFormatList[0]} />
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
                    <DatePicker name="dateOfMemorableOccassion" className="form-control form-control-lg"  format={dateFormatList[0]} />
                </div>
           </div>
           <h3 className="PastorForm-subTitle mt-5">Login Information.</h3>  
                <div className="form-group">
                        <label className="form-label" htmlFor="email">Email</label>
                        <Field name="email" className="form-control form-control-lg" id="email" placeholder="Email" />
                </div>
                <div className="form-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        <Field name="password" type="password" className="form-control form-control-lg" placeholder="Password" id="password" />
                </div>

           <div className="form-group mt-5">
                <input type="submit" value="CREATE PASTOR" className="btn btn-primary btn-lg mr-3" />
                <button type="reset" className="btn btn-info btn-lg">RESET</button>
           </div>
        </Form>
           </R3Card>
          </div>
       </div>
       </PageContent>
    )
}

export default PastorForm;