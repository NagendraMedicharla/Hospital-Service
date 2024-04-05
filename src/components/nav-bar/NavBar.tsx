import { AppBar, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SideNav from "../side-nav/SideNav";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useState } from "react";
import { deleteUserDetails } from "../../store/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../apis/loginApi";
import Footer from "../footer/Footer";



export default function NavBar() {
  const userDetails = useSelector((state: RootState) => state.user.userDetails);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profile_name = userDetails?.first_name;
 
  const handleClick = (event:any) => {
    setAnchorEl(event.currentTarget);
  };
 
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleProfileTab = ()=>{
    handleClose();
  }
  const handleLogoutTab = ()=>{
    handleClose();
    try{
        const deleteData = logout(userDetails?.token);
        deleteData.then(res=>console.log(res))
    }catch(error){
        console.log(error)
    }   
    dispatch(deleteUserDetails());
    navigate("/")
  }
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: "#5ca9fa",
        }}
      >
        <Toolbar>
          <LocalHospitalIcon />
          <Typography>Hosiptal Management</Typography>
          <div onClick={handleClick} style={{ marginLeft: "auto", display:"flex", flexDirection:"row" }}>
          <AccountCircleIcon/>
          {userDetails?
          <Typography>{profile_name}</Typography> :
          <Typography><Link style={{marginLeft:"7px", textDecoration:'none', color:'white'}} to="">Login/Register</Link></Typography>
          }
          </div>
          {/* <AccountCircleIcon onClick={handleClick} sx={{ marginLeft: "auto" }} /> */}
          <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          sx={{marginTop:'45px'}}
        >
          <MenuItem onClick={handleProfileTab}><Link to='/profile' style={{textDecoration:'none',color:'black'}}>Profile</Link></MenuItem>
          <MenuItem onClick={handleLogoutTab}>Logout</MenuItem>
        </Menu>
        </Toolbar>
      </AppBar>
      <SideNav />
      <Footer/>
    </>
  );
}


// import React from 'react';
// import { AppBar, Toolbar, IconButton, Typography, MenuItem, Menu } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
 
// function NavBar() {
//   const [anchorEl, setAnchorEl] = React.useState(null);
 
//   const handleClick = (event:any) => {
//     setAnchorEl(event.currentTarget);
//   };
 
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
 
//   return (
//     <AppBar position="static">
//       <Toolbar>
//         <IconButton
//           size="large"
//           edge="start"
//           color="inherit"
//           aria-label="menu"
//           aria-controls="menu-appbar"
//           aria-haspopup="true"
//           onClick={handleClick}
//           sx={{ mr: 2 }}
//         >
//           <MenuIcon />
//         </IconButton>
//         <Menu
//           id="menu-appbar"
//           anchorEl={anchorEl}
//           anchorOrigin={{
//             vertical: 'top',
//             horizontal: 'right',
//           }}
//           keepMounted
//           transformOrigin={{
//             vertical: 'top',
//             horizontal: 'right',
//           }}
//           open={Boolean(anchorEl)}
//           onClose={handleClose}
//         >
//           <MenuItem onClick={handleClose}>Profile</MenuItem>
//           {/* Add more profile-related actions here */}
//           <MenuItem onClick={handleClose}>Logout</MenuItem>
//         </Menu>
//         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//           My App
//         </Typography>
//       </Toolbar>
//     </AppBar>
//   );
// }
 
// export default NavBar;