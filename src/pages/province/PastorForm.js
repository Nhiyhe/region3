import { DatePicker } from 'antd';
import { Form } from 'formik';
import { Field } from 'formik-antd';
import React from 'react';
import R3Card from '../../components/Card';
import R3Button from '../../components/R3Button';
import './PastorForm.css';
import PageContent from '../../components/PageContent';

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
                    <Field name="firstname" placeholder="FirstName" className="form-control form-control-lg"  />
                </div>

                <div className="form-group col-4">
                    <label>MiddleName</label>
                    <Field name="middlename" placeholder="MiddleName" className="form-control form-control-lg" />
                </div>

                <div className="form-group col-4"> 
                    <label>LastName</label>
                    <Field name="lastname" placeholder="LastName" className="form-control form-control-lg" />
                </div>
            </div>

           <div className="form-row">
                <div className="form-group col-4">
                        <label>Date of Birth</label>
                        <DatePicker name="dob"  className="form-control form-control-lg"/>
                    </div>
                    <div className="form-group col-4">
                        <label>Email</label>
                        <Field name="email" placeholder="Email" className="form-control form-control-lg" />
                    </div>

                    <div className="form-group col-4">
                        <label>Phone</label>
                        <Field name="telephone" placeholder="Phone Number" className="form-control form-control-lg" />
                    </div>
           </div>

          <div className="form-row">                
            <div className="form-group col-6">
                <label>Position</label>
                <Field as="select" name="position" className="form-control form-control-lg">
                    <option value="parish pastor">Parish Pastor</option>
                    <option value="zonal pastor">Zonal Pastor</option>
                    <option value="province pastor">Province Pastor</option>
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
                <div className="form-group col-6">
                    <label>FirstName</label>
                    <Field name="spouseName" placeholder="FirstName" className="form-control form-control-lg" />
                </div>

                <div className="form-group col-6">
                    <label>MiddleName</label>
                    <Field name="spouseName" placeholder="MiddleName" className="form-control form-control-lg" />
                </div>
            </div>

           <div className="form-row">
                <div className="form-group col-4">
                    <label>Date of Birth</label>
                    <DatePicker name="spouseDob" className="form-control form-control-lg"  />
                </div>
           </div>

           <h3 className="PastorForm-subTitle mt-5">Other Information.</h3>  
           <div className="form-row">
                <div className="form-group col-4">
                    <label>Memorable Occasion</label>
                    <Field name="occassion" placeholder="Memorable Occasion" className="form-control form-control-lg" />
                </div>

                <div className="form-group col-4">
                    <label>Memorable Occasion Date</label>
                    <DatePicker name="occassionDate" className="form-control form-control-lg"  />
                </div>
           </div>

           <div className="form-group mt-5">
           <hr/>
                <R3Button rounded color="orange">Submit</R3Button>
                <R3Button>Reset</R3Button>
           </div>
        </Form>
           </R3Card>
          </div>
       </div>
       </PageContent>
    )
}

export default PastorForm;