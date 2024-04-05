import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers} from 'formik';
import * as Yup from 'yup';
import './styles/qualificationForm.css'
import { postTheQualification } from '../apis/adminAuthoritiesApi';
import { useSelector } from 'react-redux';
 
interface QualificationFormValues {
  degree: string;
  description: string;
}
 
const QualificationForm: React.FC = () => {

  const token = useSelector((state:any)=>state.user.userDetails.token)
    
  const initialValues: QualificationFormValues = {
    degree: '',
    description: '',
  };
 
  const validationSchema = Yup.object({
    degree: Yup.string().required('Degree is required'),
    description: Yup.string().required('Description is required'),
  });
 
  const handleSubmit = (values: QualificationFormValues, {resetForm}:FormikHelpers<QualificationFormValues>) => {
    postTheQualification(values,token)
    .then((res)=>{
      console.log("data posted successfully", res.data)
      alert(res.data.message)
      resetForm();
    }).catch((error)=>{
      console.log("Error in post the data", error.message);
      alert(error.message)
    })
    console.log(values);
    
  };
 
  return (
    <div className="qualification-form-container">
      <h2>Create Qualification</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({isValid, dirty}) =>(
          <Form> 
          <div>
            <label htmlFor="degree">Degree:</label>
            <Field type="text" id="degree" name="degree" />
            <ErrorMessage name="degree" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="description">Description:</label>
            <Field type="text" id="description" name="description" />
            <ErrorMessage name="description" component="div" className="error" />
          </div>

          <button type="submit" disabled={!isValid || !dirty}>
            Submit
          </button>
        </Form>
        )}
      </Formik>
    </div>
  );
};
 
export default QualificationForm;
