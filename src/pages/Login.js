import React from "react";
import { ErrorMessage, Field } from "formik";
import { SubmitButton, ResetButton, Form } from "formik-antd";
import './Login.css';

const Login = (props) => {
  return (
   <div className="Login">
      <Form>
      <div className="row">
        <div className="col-md-6 offset-md-3 col-lg-6 offset-md-3">
          <h2 className="text-center mb-4 Login-heading">Pastors Login.</h2>
          <div className="form-group mb-4">
            <Field name="email" placeholder="you@example.com" className="form-control form-control-lg"/>
            <ErrorMessage name="email">
              {(msg) => <div className="text-danger">{msg}</div>}
            </ErrorMessage>
          </div>

          <div className="form-group mb-4">
            <Field
              name="password"
              type="password"
              placeholder="Password"
              className="form-control form-control-lg"
            />
            <ErrorMessage name="password">
              {(msg) => <div className="text-danger">{msg}</div>}
            </ErrorMessage>
          </div>

            <SubmitButton type="primary" disabled={false}>
              Login
            </SubmitButton>
            <ResetButton>Reset</ResetButton>
        </div>
      </div>
    </Form>
   </div>
  );
};

export default Login;
