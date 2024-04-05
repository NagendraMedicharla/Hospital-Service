import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import QualificationPng  from './assets/qualification.png';
import DoctorPng  from './assets/doctor.png';
import DoctorListPng  from './assets/doctorList.png';
import ProfilePng  from './assets/profile.png';
import SchedulePng  from './assets/schedule.png';
import SlotsPng  from './assets/slots.png';
import { Provider } from 'react-redux';
import { store } from './store/store';
import 'bootstrap/dist/css/bootstrap.css';

export {
  QualificationPng,
  DoctorPng,
  DoctorListPng,
  ProfilePng,
  SchedulePng,
  SlotsPng
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}><App /></Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
