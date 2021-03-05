import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import requestAxios from '../../../../util/requestAxios';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import R3Card from '../../../../components/Card';
import { useAlert } from 'react-alert';
import { AuthContext } from '../../../../context/AuthContext';
import * as yup from 'yup';
import './PayMent.css';

const validationSchema = yup.object()
.shape({amountRemitted:yup.number().required().positive("Please provide a positive number"),proof:yup.mixed().required('Please provide evidence of payment')});

const PayMent = (props) => {
    const {id} = useParams();
    const [remmittance, setRemmittance] = useState({});
    const [currentBal, setCurrentBal] = useState({});
    const alert = useAlert();
    const {userInfo} = useContext(AuthContext);
    const history = useHistory();

    let totalExpectedRemittance = ((remmittance.expectedRemittance || 0) - (currentBal.currentClosingBalance ? currentBal.currentClosingBalance : 0));


    useEffect(() => {
        const source = axios.CancelToken.source();
        const getParishDetail = async() => {
            try{
                const {data} = await requestAxios.get(`/monetaries/${id}`, {cancelToken:source.cancel()});
                setRemmittance(data.body);
            }catch(err){
                if(err.response && err.response.data){
                    alert.error(err.response.data.message);
                  }else{
                  alert.error("An unexpected error occured.");
                  }
            }
        }
        getParishDetail();

        const getCurrentParishAct = async() => {
            try{
                const {data} = await requestAxios.get(`/remittances/parish/${userInfo.id}`, {cancelToken:source.cancel()});
                setCurrentBal(data.body);
            }catch(err){
                if(err.response && err.response.data){
                    alert.error(err.response.data.message);
                  }else{
                  alert.error("An unexpected error occured.");
                  }
            }
        }

        getCurrentParishAct()
        return () => {
            source.cancel();
        }
    },[])

    
    return(
        <Formik 
        enableReinitialize
        validationSchema = {validationSchema}
        initialValues={{amountRemitted: 0, 
            offering: remmittance.offering || 0, 
            tithe: remmittance.tithe || 0, 
            // expectedRemittance: ((remmittance.expectedRemittance || 0) - (currentBal.currentClosingBalance ? currentBal.currentClosingBalance : 0))
            expectedRemittance:remmittance.expectedRemittance || 0,
            proof:null
        }}
        onSubmit = {async(values) => {
            try{   
                
                let calculatedClosingBal = values.amountRemitted - totalExpectedRemittance;
                values.closingBalance =  calculatedClosingBal;
                values.paymentMade = true; 
                
                const formData = new FormData();
                formData.append('closingBalance', values.closingBalance);
                formData.append('paymentMade', values.paymentMade);
                formData.append('amountRemitted', values.amountRemitted);

                for(var x = 0; x < values.proof.length; x++) {
                    formData.append('proof', values.proof[x])
                }


                const {data} = await requestAxios.put(`/monetaries/${id}`, formData);  
                const {openingBalance} = data.body;
                await requestAxios.put(`/remittances/parish/${userInfo.id}`, {currentOpeningBalance:openingBalance, currentClosingBalance:calculatedClosingBal});  
                alert.success(data.message);
                history.push(`/parish/monetaries/lists`)
            }catch(err){
                if(err.response && err.response.data){
                    alert.error(err.response.data.message);
                  }else{
                  alert.error("An unexpected error occured.");
                  }
            }
        }}
       >
            {(props) => (
            <div className="row">
                <div className="col-md-8 offset-2"> 
                <R3Card>
                    <h2 className="NewMonetaryForm-title">Make Payment </h2>
                    <Form>
                        <div className="form-group">
                            <label htmlFor="offering">Offering</label>
                            <Field type="number" name="offering" disabled={true} placeholder="Offering" id="offering" className="form-control form-control-lg"/>
                        </div>
    
                        <div className="form-group">
                            <label htmlFor="tithe">Tithe</label>
                            <Field type="number" name="tithe" disabled={true} placeholder="Tithe" id="tithe" className="form-control form-control-lg"/>
                        </div>
    
                        <div className="form-group">
                            <label htmlFor="expectedRemittance">Amount Expected</label>
                            {/* <Field type="number" name="expectedRemittance" disabled={true} placeholder="Amount Expected" id="expectedRemittance" className="form-control form-control-lg"/> */}
                            <p>{totalExpectedRemittance.toFixed(2)}</p>
                        </div>
                           
                        <div className="form-group">
                            <label htmlFor="amountRemitted">How much did you pay into the account?</label>
                            <Field type="number" name="amountRemitted" placeholder="Amount Remmitted" id="amountRemitted" className="form-control form-control-lg"/>
                            <ErrorMessage name="amountRemitted">
                                 {(msg) => <div className="text-danger">{msg}</div>}
                            </ErrorMessage>
                        </div>

                        <div className="form-group mt-5">
                        <label htmlFor="customFile">Choose Proof of Payment</label>
                            <input id="customfile" type="file" name="proof" className="form-control-file" multiple onChange={(event) => {
                                props.setFieldValue("proof", event.currentTarget.files)
                             }} />
                             <ErrorMessage name="proof">
                                 {(msg) => <div className="text-danger">{msg}</div>}
                            </ErrorMessage>
                        </div>
    
                        <div className="mt-5">
                            <input type="submit" disabled={props.isSubmitting} value={props.isSubmitting ? "Please wait..." : "Make a Payment"} disabled={props.isSubmitting} className="btn btn-primary btn-lg" />
                            <button type="button" className="btn btn-default btn-lg" onClick={() => history.goBack()}>Go Back</button>
                        </div>
                    </Form>
                </R3Card>
            </div>
            </div>
            )}
        </Formik>
    )
}

export default PayMent;