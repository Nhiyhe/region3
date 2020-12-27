import { Field } from 'formik';
import { Form } from 'formik-antd';
import React from 'react';
import Card from '../../components/Card';
import './NewAttendanceForm.css';

const NewAttendanceForm = () => {
    return (
        <div className="NewAttendanceForm">
            <div className="col-8 offset-2">
            <Card>    
                <h2 className="NewAttendanceForm-title">New Attendance</h2>
                <Form>
                <div className="form-group">
                    <label htmlFor="men">Men</label>
                    <Field type="number" name="men" placeholder="Men" className="form-control" id="men" />
                </div>

                <div className="form-group">
                    <label htmlFor="women">Women</label>
                    <Field type="number" name="women" placeholder="Women" className="form-control" id="women" />
                </div>

                <div className="form-group">
                    <label htmlFor="children">Children</label>
                    <Field type="number" name="children" placeholder="Children" className="form-control" id="children" />
                </div>

                            
                <div className="form-group">
                    <label htmlFor="marriage">Marriage</label>
                    <Field type="number" name="marriages" placeholder="Marriages" className="form-control" id="marriage" />
                </div>

                <div className="form-group">
                    <label htmlFor="newcomer">New Comer</label>
                    <Field type="number" name="newComers" placeholder="New Comer" className="form-control" id="newcomer" />
                </div>

                <div className="form-group">
                    <label htmlFor="birth">Birth</label>
                    <Field type="number" name="birth" placeholder="Birth" className="form-control" id="birth" />
                </div>

                <div className="form-group">
                    <label htmlFor="soulsaved">Soul Saved</label>
                    <Field type="number" name="soulsSaved" placeholder="Soul Saved" className="form-control" id="soulsaved" />
                </div>
                <div className="form-group">
                    <label htmlFor="soulbaptised">Soul Baptised</label>
                    <Field type="number" name="soulsBaptised" placeholder="Soul Baptised" className="form-control" id="soulbaptised" />
                </div>

                <div className="form-group">
                    <label htmlFor="death">Death</label>
                    <Field type="number" name="deaths" placeholder="Death" className="form-control" id="death" />
                </div>
                <input type="submit" value="Submit" />
                
                </Form>
                
                </Card>
            </div>
        </div>
    )
}

export default NewAttendanceForm;