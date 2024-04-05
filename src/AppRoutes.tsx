import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import NavBar from "./components/nav-bar/NavBar";
import DoctorScheduleList from "./doctorPages/DoctorSheduleList";
import DisplayQualifications from "./pages/DisplayQualifications";
import DoctorCreationForm from "./pages/DoctorCreationForm";
import DoctorsList from "./pages/DoctorsList";
import Error from "./pages/Error";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import QualificationForm from "./pages/QualificationForm";
import SheduleCreationForm from "./pages/SheduleCreationForm";
const AppRoutes = () => {
  const userDetails = useSelector((state:any)=>state.user.userDetails)
  
  return (
    <BrowserRouter>
      {userDetails ? AuthenticatedApp() : UnAuthenticatedApp()}
    </BrowserRouter>
  );

  function AuthenticatedApp() {
  return (
    <>
      <NavBar />
      <div style={{ marginLeft: "200px", marginTop: "70px" }}>
        <Routes>
          <Route path="/createQualification" element={<QualificationForm />} />
          <Route path="/createDoctor" element={<DoctorCreationForm />} />
          <Route path="/createSchedule" element={<SheduleCreationForm />} />
          <Route path="/profile" element={<ProfilePage/>}/>
          <Route path="/qualificatonList" element={<DisplayQualifications/>}/>
          <Route path="/createDoctor" element={<DoctorCreationForm/>} />
          <Route path="/doctors" element={<DoctorsList/>}/>
          <Route path="/doctorScheduleList" element={<DoctorScheduleList/>}/>
          <Route path="*" element={<Error/>} />
        </Routes>
      </div>
    </>
  );
}


function UnAuthenticatedApp() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={userDetails? <AuthenticatedApp /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}
};

export default AppRoutes;

