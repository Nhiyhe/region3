import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import {Form, Field} from 'formik';
import R3Card from '../../../../components/Card';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import requestAxios from '../../../../util/requestAxios';
import {useAlert} from 'react-alert';

const CountryEditForm = () => {

    const [country, setCountry] = useState({});
    const {id} = useParams();
    const alert = useAlert();
    const history = useHistory();

    useEffect(() => {
        const source = axios.CancelToken.source();

        const getCountryById = async() => {
            try{
            const {data} = await requestAxios.get(`/countries/${id}`, {cancelToken:source.token});
            setCountry(data.body);

            }catch(err){
                console.error(err);
                if(err.response && err.response.data){
                    alert.error(err.response.data.message);
                  }else{
                  alert.error("An unexpected error occured.");
                  }
            }
        }
        getCountryById();
        
   return (() => {
    source.cancel()
  })

    }, [])

    return <Formik
            enableReinitialize
            initialValues={{countryName:country.countryName || "", countryCapital:country.countryCapital || ""}}
            onSubmit={async(updatedValues, actions) => {
                try{
                    const {data} = await requestAxios.put(`/countries/${id}`,{...updatedValues});
                    console.log(data.body);
                    alert.success(data.message);
                    actions.setSubmitting(false);
                    history.push('/countries/lists');
                }catch(err){
                    console.error(err);
                    if(err.response && err.response.data){
                        alert.error(err.response.data.message);
                      }else{
                      alert.error("An unexpected error occured.");
                      }
                }
            }}
             >
            {() => (
              <div className="col-6 offset-3">
              <h2>Editing {country?.countryName}</h2>
              <R3Card>
             <Form>
                 <div className="form-group">
                     <label className="form-label" htmlFor="zoneName">Name</label>
                     <Field name="countryName" className="form-control form-control-lg" id="countryName"/>
                 </div>

                 <div className="form-group">
                     <label className="form-label" htmlFor="zoneLocation">Location</label>
                     <Field name="countryCapital" className="form-control form-control-lg" id="countryCapital"/>
                 </div>

                 <div className="mt-4">
                     <input type="submit" value="Update" className="btn btn-info btn-lg mr-2"/>
                     <button type="reset" className="btn btn-danger btn-lg">Reset</button>
                 </div>
                 
                     
             </Form>

          </R3Card>
          </div>
        )}
    </Formik>
}

export default CountryEditForm;