import { Form, Formik, Field } from 'formik';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import R3Card from '../../../../components/Card';
import Loading from '../../../../components/Loading';
import requestAxios from '../../../../util/requestAxios';
import { ResetButton, SubmitButton } from "formik-antd";
import axios from 'axios';

const ZoneEditForm = () => {
    let {id} = useParams();
    const [zone, setZone] = useState({});
    const history = useHistory();

    useEffect(() => {
    const source = axios.CancelToken.source();

        const getZoneById = async() => {
            try{
            const {data} = await requestAxios.get(`/zones/${id}`, {cancelToken:source.token});
            setZone(data.body);

            }catch(err){
                console.error(err);
            }
        }
        getZoneById();
        
   return (() => {
    source.cancel()
  })

    }, [id]);
    
    if(!zone.name) return  <Loading />
    return (
        <Formik
        enableReinitialize={true}
        initialValues={{name: zone.name || "", locationAddress: zone.locationAddress || ""}}
        onSubmit={async (updatedValues) => {
            await requestAxios.put(`/zones/${id}`,{...updatedValues});
            history.push('/zones/lists');
        }}
        >
         {() => (
             <div className="col-6 offset-3">
                 <h2>Editing {zone?.name}</h2>
                 <R3Card>
                <Form>
                    <div className="form-group">
                        <label className="form-label" htmlFor="zoneName">Name</label>
                        <Field name="name" className="form-control form-control-lg" id="zoneName"/>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="zoneLocation">Location</label>
                        <Field name="locationAddress" className="form-control form-control-lg" id="zoneLocation"/>
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
        )
}

export default ZoneEditForm;