import { Formik } from 'formik';
import React, { useContext, useState, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';
import requestAxios from '../../../../util/requestAxios';
import NewMonetaryForm from './NewMonetaryForm';
import axios from 'axios';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
        offering:yup.number().required().positive("Please provide positive number"),
        tithe:yup.number().required().positive("Please provide positive number")
    }
);

const NewMonetaryFormContainer = () => {
    const [parishMonetaryRecords, setParishMonetaryRecords] = useState([]);
    const [parish, setParish] = useState({});

    const {userInfo} = useContext(AuthContext);
    const alert = useAlert();
    const history = useHistory();
    const [currentBal, setCurrentBal] = useState({});


    useEffect(() => {
        const source = axios.CancelToken.source();
       
        const getCurrentParishAct = async() => {
            try{
                const {data} = await requestAxios.get(`/remittances/parish/${userInfo.id}`, {cancelToken:source.cancel()});
                setCurrentBal(data.body);
            }catch(err){               
                return;
            }
        }

        const getParishDetail = async() => {
            try{
                const {data} = await requestAxios.get(`/parishes/${userInfo.id}`, {cancelToken:source.cancel()});
                setParish(data.body);
            }catch(err){               
                return;
            }
        }

        getCurrentParishAct()
        getParishDetail();
        return () => {
            source.cancel();
        }
    },[])


    useEffect(() => {
        const source = axios.CancelToken.source();
  
          const getParishMonetaryRecords  = async() => {          
              try{
                  const {data} = await requestAxios.get(`/parishes/${userInfo.id}/monetaryrecords`,{cancelToken:source.token});
                  setParishMonetaryRecords(data.body);
              }catch(err){
              }
          }
  
          getParishMonetaryRecords();
  
          return(()=>{
            source.cancel();
          })
      }, [userInfo.id])
    return (
        <Formik         
        initialValues={{offering:0, tithe:0, expectedRemittance:0}}
        component={ () => <NewMonetaryForm allPaymentMade={parishMonetaryRecords.every(p => p.paymentMade)} />}
        validationSchema = {validationSchema}
        onSubmit ={ async(values, {resetForm}) => {
            values.openingBalance = currentBal.currentClosingBalance || 0;
            values.expectedRemittance = (values.offering * .1) + (values.tithe *.25);
            values.parish = userInfo.id;
            values.countryName = parish.country.countryName;
            values.zoneName = parish.country?.zone?.name;
            values.provinceName = parish.country?.zone?.province?.name;
            values.parishName = parish.name;
            values.province =  parish?.country?.zone?.province?._id;
            values.country = parish?.country?._id;
            values.zone = parish?.country?.zone?._id;

            try{
                const {data} = await requestAxios.post(`/monetaries`,{...values})
                alert.success(data.message);
                history.push('/parish/monetaries/list');
                resetForm();
                
            }catch(err){
                if(err.response && err.response.data){
                    alert.error(err.response.data.message);
                  }else{
                  alert.error("An unexpected error occured.");
                  }
            }
        }}
        />
    )
}

export default NewMonetaryFormContainer;