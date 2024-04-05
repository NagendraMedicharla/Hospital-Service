import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";

const Footer = () => {
  const [value, setValue] = useState(0);
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 180, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        {/* <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <div>
            <Typography variant="body2" color="text.primary" gutterBottom>
              Health Mangement.com
            </Typography>
          </div>
          <div>
            <Typography variant="body2" color="text.secondary">
              About
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Contact Us
            </Typography>
          </div>

          <div>
            <Typography variant="body2" color="text.secondary">
              Email: info@example.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: +1 234 567 8901
            </Typography>
          </div>
        </div> */}
        <BottomNavigationAction label="Company"/>
        <BottomNavigationAction label="About"/>
        <BottomNavigationAction label="Contact"/>
        <BottomNavigationAction label="@Copy Right-2023"/>
      </BottomNavigation>
    </Paper>
  );
};
export default Footer;
