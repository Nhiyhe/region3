import { Tag } from 'antd';
import { ErrorMessage } from 'formik';
import { Form, Field } from 'formik-antd';
import React from 'react';
import R3Card from '../../../../components/Card';
import './NewMonetaryForm.css';



const NewMonetaryForm = (props) => {

    const handleOfferingOnblur = () => {
        const value = parseFloat(props.values.offering);

        if(isNaN(value)){
            return;
        }
        props.setFieldValue("offering", value.toFixed(2));
    };

    const handleTitheOnblur = () => {
        const value = parseFloat(props.values.tithe);

        if(isNaN(value)){
            return;
        }
        props.setFieldValue("tithe", value.toFixed(2));
    };
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
                        <ErrorMessage name="offering">
                             {(msg) => <div className="text-danger">{msg}</div>}                            
                        </ErrorMessage>
                    </div>

                    <div className="form-group">
                        <label htmlFor="tithe">Tithe</label>
                        <Field type="number" name="tithe" placeholder="Tithe" id="tithe" className="form-control form-control-lg"/>
                        <ErrorMessage name="tithe">
                                 {(msg) => <div className="text-danger">{msg}</div>}
                        </ErrorMessage>
                    </div>

                    {props.allPaymentMade && <input type="submit" value={props.isSubmitting ? "Please wait..." : "Submit"} disabled={props.isSubmitting} className="btn btn-primary btn-lg" />}
                    {!props.allPaymentMade && <Tag color="error"> <h5>Sorry, you have a pending transaction. You cannot create another record,
                        Make a payment first.</h5></Tag>}
                </Form>
            </R3Card>
        </div>
        </div>
        </div>
    )
}

export default NewMonetaryForm;