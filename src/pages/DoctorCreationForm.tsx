import React from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import "./styles/doctorCreationForm.css";
import { useLocation } from "react-router-dom";
import { postTheDoctor } from "../apis/adminAuthoritiesApi";
import { useSelector } from "react-redux";

interface CreateDoctorFormValues {
  first_name: string;
  last_name: string;
  password: string;
  password_confirmation: string;
  email: string;
  contact_number: string;
  qualifications: string;
}

const DoctorCreationForm: React.FC = () => {
  const token = useSelector((state:any)=>state.user.userDetails.token)
  const location = useLocation();
  const qualificationId = location.state?.qualificationId

  const initialValues: CreateDoctorFormValues = {
    first_name: "",
    last_name: "",
    password: "",
    password_confirmation: "",
    email: "",
    contact_number: "",
    qualifications: qualificationId,
  };

  const validationSchema = Yup.object({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    password: Yup.string().required("Password is required"),
    password_confirmation: Yup.string().required(
      "Confirmation password is required"
    ),
    email: Yup.string().required("Email is required"),
    contact_number: Yup.string().required("Cotact number is required"),
    qualifications: Yup.string().required("Qualification is required"),
  });

  const handleSubmit = (
    values: CreateDoctorFormValues,
    {resetForm}:FormikHelpers<CreateDoctorFormValues>
  ) => {
    postTheDoctor(values,token)
    .then((res)=>{
      console.log("data posted successfully", res.data)
      alert(res.data.message)
      resetForm();
    }).catch((error)=>{
      console.log("Error in post the data", error.message);
      alert(error.message)
    })
    console.log(values);
    // resetForm();
    // console.log(values);
    // resetForm();
    // Submit logic here, like making API requests
    // console.log("this is the qualification id",qualificationId)
  };

  return (
    <div className="doctor-form-container">
      <h2>Create Doctor</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({isValid, dirty}) =>(
          <Form>
            <div className="doctor-creation-container">
              <div className="doctor-creation-left">
                <div>
                  <label htmlFor="first_name">first_name:</label>
                  <Field type="text" id="first_name" name="first_name" />
                  <ErrorMessage
                    name="first_name"
                    component="div"
                    className="error"
                  />
                </div>

                <div>
                  <label htmlFor="last_name">last_name:</label>
                  <Field type="text" id="last_name" name="last_name" />
                  <ErrorMessage
                    name="last_name"
                    component="div"
                    className="error"
                  />
                </div>

                <div>
                  <label htmlFor="email">Email:</label>
                  <Field type="email" id="email" name="email" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                </div>
                <div>
                  <label htmlFor="password">password:</label>
                  <Field type="password" id="password" name="password" />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />
                </div>
              </div>
              <div className="doctor-creation-right">
                <div>
                  <label htmlFor="password_confirmation">Conform Password:</label>
                  <Field
                    type="password"
                    id="password_confirmation"
                    name="password_confirmation"
                  />
                  <ErrorMessage
                    name="password_confirmation"
                    component="div"
                    className="error"
                  />
                </div>
                <div>
                  <label htmlFor="contact_number">Contact No:</label>
                  <Field type="text" id="contact_number" name="contact_number" />
                  <ErrorMessage
                    name="contact_number"
                    component="div"
                    className="error"
                  />
                </div>
                <div>
                  <label htmlFor="qualifications">Qualification Id:</label>
                  <Field type="text" id="qualifications" name="qualifications" />
                  <ErrorMessage
                    name="qualifications"
                    component="div"
                    className="error"
                  />
                </div>
              </div>
            </div>
            <div className="button-container">
              <button type="submit" disabled={!isValid || !dirty}>
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DoctorCreationForm;
