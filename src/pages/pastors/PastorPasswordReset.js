import React, {useState, useContext, useEffect} from 'react';
import axios from 'axios';
import requestAxios from '../../util/requestAxios';
import {AuthContext} from '../../context/AuthContext';
import { useAlert } from 'react-alert';
import Loading from '../../components/Loading';
import R3Card from '../../components/Card';
import { Field, Formik } from 'formik';
import './PastorPasswordReset.css';

const PastorPasswordReset = () => {
    const {userInfo} = useContext(AuthContext);
    const [pastor, setPastor] = useState({});

    const alert = useAlert();

    useEffect(() => {
        const source = axios.CancelToken.source();

        const getPastor = async() => {
            try{
            const {data} = await requestAxios.get(`/pastors/${userInfo.id}`, {cancelToken:source.token});
            setPastor(data.body);
            }catch(err){
                console.error(err);
                if(err.response && err.response.data){
                    alert.error(err.response.data.message);
                  }else{
                  alert.error("An unexpected error occured.");
                  }
            }
        }
        getPastor();

                
   return (() => {
    source.cancel()
  })
    },[]);

    if(!pastor.firstName) return <Loading />

    return null;

    // return(
    //    <Formik
    //    initialValues={{}}
    //    >
    //    {() => (
    //         <div className="PastorPasswordReset">
    //             <h2 className="PastorPasswordReset-name">Change Password for {pastor.firstName} {pastor.lastName}</h2>
    //             <div className="col-8 offset-2">
    //                 <R3Card>
    //                     <div className="form-group">
    //                         <label className="form-label">Password</label>
    //                         <Field name="password" placeholder="Enter Password" className="form-control form-control-lg" />
    //                     </div>
    //                     <div className="form-group">
    //                         <label className="form-label">Confirm Password</label>
    //                         <Field name="confirmpassword" placeholder="Enter Password" className="form-control form-control-lg" />
    //                     </div>
    //                     <button type="submit" className="btn btn-danger btn-lg">CHANGE PASSWORD</button>
    //                     <button type="reset" className="btn btn-default btn-lg">CANCEL</button>
    //                 </R3Card>
    //             </div>
    //         </div>
    //    )}
    //    </Formik>
    // )
}

export default PastorPasswordReset;