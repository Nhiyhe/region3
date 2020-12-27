import React from "react";
import { ErrorMessage } from "formik";
import { Input, SubmitButton, ResetButton, Form } from "formik-antd";
import './Login.css';

const Login = (props) => {
  return (
   <div className="Login">
      <Form>
      <div className="row">
        <div className="col-md-8 offset-md-2 col-lg-6 offset-md-3">
          <h2 className="text-center mb-4 Login-heading">Member Login.</h2>
          <div className="form-group mb-4">
            <Input name="email" placeholder="you@example.com" size="large" />
            <ErrorMessage name="email">
              {(msg) => <div className="text-danger">{msg}</div>}
            </ErrorMessage>
          </div>

          <div className="form-group mb-4">
            <Input
              name="password"
              type="password"
              placeholder="Password"
              size="large"
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
