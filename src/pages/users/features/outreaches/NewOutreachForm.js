import { Formik, Form, Field } from 'formik';
import React, { useContext } from 'react';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom';
import R3Card from '../../../../components/Card';
import { AuthContext } from '../../../../context/AuthContext';
import requestAxios from '../../../../util/requestAxios';

const NewOutreachForm = () => {
    const history = useHistory();
    const {userInfo} = useContext(AuthContext);
    const alert = useAlert();
    return(
        <Formik
        initialValues={{newParish:0, newNation:0, churchDedication:0, notes:''}}
        onSubmit={async(values, actions) =>{
            values.parish = userInfo.id;
            try{
                const {data} = await requestAxios.post(`/outreaches`, values);
                alert.success(data.message);
                actions.resetForm();
                actions.setSubmitting(false);
                history.push(`/parish/outreaches/lists`);
            }catch(err){
                if(err.response && err.response.data){
                    alert.error(err.response.data.message);
                  }else{
                  alert.error("An unexpected error occured.");
                  }
            }
        }}
        >
        {() => (
              <div className="row">
              <div className="col-md-8 offset-2"> 
              <R3Card>
                  <h2 className="NewMonetaryForm-title">New Outreach</h2>
                  <Form>
                      <div className="form-group">
                          <label htmlFor="newparish">New Parish</label>
                          <Field type="number" name="newParish" placeholder="New Parish" id="newparish" className="form-control form-control-lg"/>
                      </div>
  
                      <div className="form-group">
                          <label htmlFor="newnation">New Nation</label>
                          <Field type="number" name="newNation" placeholder="New Nation" id="newnation" className="form-control form-control-lg"/>
                      </div>
  
                      <div className="form-group" htmlFor="amountExpected">
                          <label htmlFor="churchDedication">Church Dedication</label>
                          <Field type="number" name="churchDedication" placeholder="Your testimony" id="churchDedication" className="form-control form-control-lg"/>
                      </div>
                      <div className="form-group" htmlFor="notes">
                          <label htmlFor="notes">Notes</label>
                          <Field  as="textarea" rows="6" name="notes" placeholder="Notes" id="notes" className="form-control form-control-lg"/>
                      </div>                            
                    
                      <input type="submit" value="Submit" className="btn btn-primary btn-lg" />
                      <button type="button" className="btn btn-default btn-lg" onClick={() => history.goBack()}>Go Back</button>
                  </Form>
              </R3Card>
          </div>
          </div>
        )}
        </Formik>
    )
}

export default NewOutreachForm;