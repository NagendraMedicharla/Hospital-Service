import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  DoctorListPng,
  ProfilePng,
  QualificationPng,
  SchedulePng,
  SlotsPng,
} from "../../index";


export default function SideNav() {
  const role = useSelector((state:any)=>state.user.userDetails.role)
  const drawerWidth = 180;
  let sideBarList:any[]=[];
  const adminList = [
    {
      displayText: "Create Qualifications",
      displayIcon: QualificationPng,
      routeText: "/createQualification",
    },
    {
      displayText: "Doctors List",
      displayIcon: DoctorListPng,
      routeText: "/doctors",
    },
    {
      displayText: "Qualificaions list",
      displayIcon: QualificationPng,
      routeText: "/qualificatonList",
    },
    {
      displayText: "Create schedule",
      displayIcon: SchedulePng,
      routeText: "/createSchedule",
    },
    // {
    //   displayText: "Create Slots",
    //   displayIcon: SlotsPng,
    //   routeText: "/qualification",
    // },
    {
      displayText: "Profile Details",
      displayIcon: ProfilePng,
      routeText: "/profile",
    },
  ];

  const doctorNavigationList = [
    {
      displayText: "Schedules",
      displayIcon: SchedulePng,
      routeText: "/doctorScheduleList",
    },
    {
      displayText: "Profile Details",
      displayIcon: ProfilePng,
      routeText: "/profile",
    },
  ]

  if(role == "admin"){
    sideBarList = adminList;
  }else if(role=="doctor"){
    sideBarList=doctorNavigationList
  }

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
          [`.image`]: {
            width: "28px",
            height: "28px",
          },
        }}
      >
        <Toolbar />
        <Box
          sx={{
            overflow: "auto",
          }}
        >
          <List>
            {sideBarList.map((item, index) => (
              <ListItem key={item.displayText} disablePadding>
                <ListItemButton sx={{marginBottom:'12px'}}>
                  <div>
                    <Link to={item.routeText} style={{textDecoration:'none',color:'black'}}>
                      <div>
                      <img
                        className="image"
                        src={item.displayIcon}
                        alt={item.displayText}
                      />
                      </div>
                      <div>
                      <Typography sx={{fontSize:'14px'}}>{item.displayText}</Typography>
                      </div>
                    </Link>
                  </div>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
