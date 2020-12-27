import { Form, Field } from 'formik-antd';
import React from 'react';
import R3Card from '../../components/Card';
import './NewMonetaryForm.css';

const NewMonetaryForm = () => {
    return(
        <div className="NewMonetaryForm">
            <div className="row">
            <div className="col-md-8 offset-2">            

            <R3Card>
                <h2 className="NewMonetaryForm-title">New Monetary Record</h2>
                <Form>
                    <div className="form-group">
                        <label htmlFor="offering">Offering</label>
                        <Field type="number" name="offering" placeholder="Offering" id="offering" className="form-control form-control-lg"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="tithe">Tithe</label>
                        <Field type="number" name="tithe" placeholder="Tithe" id="tithe" className="form-control form-control-lg"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="thanksgiving">ThanksGiving</label>
                        <Field type="number" name="thanksgiving" placeholder="Thanks Giving" id="thanksgiving" className="form-control form-control-lg"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="otherofferings">Other Offerings</label>
                        <Field type="number" name="otherOfferings" placeholder="Other Offerings" id="otherofferings" className="form-control form-control-lg"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="income">Income</label>
                        <Field type="number" name="income" placeholder="Income" id="income" className="form-control form-control-lg"/>
                    </div>

                    <input type="submit" value="Submit" />
                </Form>
            </R3Card>
        </div>
        </div>
        </div>
    )
}

export default NewMonetaryForm;