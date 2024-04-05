import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../apis/loginApi";
import './styles/login.css';
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";

export default function LoginPage(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: "",
        role:""
      });
      
      const handleChange = (e:any) => {
        setLoginDetails((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      };
    
      const handleLogin = async (event:any) => {
        event?.preventDefault();
        console.log(loginDetails);
        try{
            const userData = await login(loginDetails.email, loginDetails.password, loginDetails.role)
            console.log(userData);
            navigate("/profile");
            const userDetails = {
                email:userData.user.email,
                first_name:userData.user.first_name,
                last_name:userData.user.last_name,
                id:userData.user.id,
                role:userData.user.role,
                token:userData.user.authentication.token
            }

            dispatch(setUserDetails(userDetails));
        }catch(error){
            console.log(error);
        }
      };
      return (
        <div className="login-page">
          <form onSubmit={handleLogin} className="login-container">
            <h1>Login</h1>
            <div className="login-fields">
              <TextField
                id="email"
                type="email"
                name="email"
                label="Email"
                variant="outlined"
                value={loginDetails.email}
                onChange={handleChange}
              />
              <TextField
                id="password"
                type="password"
                label="Password"
                variant="outlined"
                name="password"
                value={loginDetails.password}
                onChange={handleChange}
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="role"
                  label="role"
                  name="role"
                  value={loginDetails.role}
                  onChange={handleChange}
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="patient">Patient</MenuItem>
                  <MenuItem value="doctor">Doctor</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="login-btn-container">
              <Button type="submit" variant="contained">
                Login
              </Button>
            </div>
            {/* <div>
              <p>
                Don't have an account? <Link to="/register">here</Link>
              </p>
            </div> */}
          </form>
        </div>
      );
}