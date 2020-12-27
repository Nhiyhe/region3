import { Formik } from "formik";
import React from "react";
import PastorForm from "./PastorForm";

const PastorFormContainer = () => {
  return (
    <Formik
      initialValues={{
        firstname: "",
        middlename: "",
        lastname: "",
        dob: "",
        email: "",
        telephone: "",
        urn: "",
        position: "",
        spouseName: "",
      }}
      component={PastorForm}
      onSubmit={(values) => {
        console.log(values);
      }}
    />
  );
};

export default PastorFormContainer;
