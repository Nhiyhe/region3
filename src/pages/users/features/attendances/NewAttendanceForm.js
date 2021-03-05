import { Field, Form } from 'formik';
import React from 'react';
import Card from '../../../../components/Card';
import './NewAttendanceForm.css';
import {ErrorMessage} from 'formik';
import { useHistory } from 'react-router-dom';


const NewAttendanceForm = ({editing, isSubmitting}) => {
    const history = useHistory();
    return (
        <div className="NewAttendanceForm">
            <div className="col-8 offset-2">
            <Card>    
                <h2 className="NewAttendanceForm-title">{ editing ? 'Editing Data Record' : 'New Data Record'}</h2>
                <Form>
                <div className="form-group">
                    <label htmlFor="men">Men</label>
                    <Field type="number" name="men" placeholder="Men" className="form-control" id="men" />
                    <ErrorMessage name="men">
                                {(msg) => <div className="text-danger">{msg}</div>}
                    </ErrorMessage>
                </div>

                <div className="form-group">
                    <label htmlFor="women">Women</label>
                    <Field type="number" name="women" placeholder="Women" className="form-control" id="women" />
                    <ErrorMessage name="women">
                                {(msg) => <div className="text-danger">{msg}</div>}
                    </ErrorMessage>
                </div>

                <div className="form-group">
                    <label htmlFor="children">Children</label>
                    <Field type="number" name="children" placeholder="Children" className="form-control" id="children" />
                    <ErrorMessage name="children">
                                {(msg) => <div className="text-danger">{msg}</div>}
                    </ErrorMessage>
                </div>

                            
                <div className="form-group">
                    <label htmlFor="marriage">Marriage</label>
                    <Field type="number" name="marriages" placeholder="Marriages" className="form-control" id="marriage" />
                    <ErrorMessage name="marriages">
                                {(msg) => <div className="text-danger">{msg}</div>}
                    </ErrorMessage>
                </div>

                <div className="form-group">
                    <label htmlFor="newcomer">New Comer</label>
                    <Field type="number" name="newComers" placeholder="New Comer" className="form-control" id="newcomer" />
                    <ErrorMessage name="newComers">
                                {(msg) => <div className="text-danger">{msg}</div>}
                    </ErrorMessage>
                </div>

                <div className="form-group">
                    <label htmlFor="birth">Birth</label>
                    <Field type="number" name="birth" placeholder="Birth" className="form-control" id="birth" />
                    <ErrorMessage name="birth">
                                {(msg) => <div className="text-danger">{msg}</div>}
                    </ErrorMessage>
                </div>

                <div className="form-group">
                    <label htmlFor="soulsaved">Soul Saved</label>
                    <Field type="number" name="soulsSaved" placeholder="Soul Saved" className="form-control" id="soulsaved" />
                    <ErrorMessage name="soulsSaved">
                                {(msg) => <div className="text-danger">{msg}</div>}
                    </ErrorMessage>
                </div>
                <div className="form-group">
                    <label htmlFor="soulbaptised">Soul Baptised</label>
                    <Field type="number" name="soulsBaptised" placeholder="Soul Baptised" className="form-control" id="soulbaptised" />
                    <ErrorMessage name="soulsBaptised">
                                {(msg) => <div className="text-danger">{msg}</div>}
                    </ErrorMessage>
                </div>

                <div className="form-group">
                    <label htmlFor="death">Death</label>
                    <Field type="number" name="deaths" placeholder="Death" className="form-control" id="death" />
                    <ErrorMessage name="deaths">
                                {(msg) => <div className="text-danger">{msg}</div>}
                    </ErrorMessage>
                </div>
                <input type="submit" value={editing ? 'Update' : 'Submit'} className="btn btn-primary btn-lg mr-2" disabled={isSubmitting}/>
                {editing && <button type="button" className="btn btn-info btn-lg" onClick={ () => history.goBack()}>Go Back</button>}
                </Form>
                
                </Card>
            </div>
        </div>
    )
}

export default NewAttendanceForm;