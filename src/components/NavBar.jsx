import React from "react";
import PropTypes from "prop-types";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import LightbulbCircleIcon from "@mui/icons-material/LightbulbCircle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { Grid, FormControlLabel, useTheme } from "@mui/material"; // Import useTheme hook
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import AvatarMenu from "./AvatarMenu";
import ModeSwitch from "./ModeSwitch"; // Import ModeSwitch component

export default function NavBar({ toggleThemeMode, avatarImage }) {
  // Receive toggleThemeMode as a prop
  const [industry, setIndustry] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [view, setView] = React.useState("single-company-view");
  
  const theme = useTheme(); // Access the current theme

  const IndustryChange = (event) => {
    setIndustry(event.target.value);
  };
  const CompanyChange = (event) => {
    setCompany(event.target.value);
  };
  const ViewChange = (event) => {
    setView(event.target.value);
  };

  return (
    <AppBar position="static" sx={{ borderRadius: 2 }}>
      <Toolbar>
        <Grid container padding={2}>
          <Grid
            item
            container
            xs={1}
            justifyContent="center"
            alignItems="center"
          >
            <LightbulbCircleIcon fontSize="large" />
          </Grid>

          <Grid
            item
            container
            xs={10}
            spacing={2}
            alignContent="center"
            justifyContent="center"
          >
            <Grid
              item
              container
              xs={4}
              justifyContent="center"
              alignContent="center"
            >
              <FormControl fullWidth>
                <InputLabel>Industry</InputLabel>
                <Select
                  value={industry}
                  label="Industry"
                  onChange={IndustryChange}
                  sx={{ color: theme.palette.mode === 'dark' ? 'white' : 'black' }} // Conditional styling based on theme mode
                >
                  <MenuItem value="Technology">Technology</MenuItem>
                  <MenuItem value="Healthcare">Healthcare</MenuItem>
                  <MenuItem value="Finance">Finance</MenuItem>
                  <MenuItem value="Manufacturing">Manufacturing</MenuItem>
                  <MenuItem value="Energy">Energy</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              container
              xs={4}
              justifyContent="center"
              alignContent="center"
            >
              <FormControl fullWidth>
                <InputLabel>Company</InputLabel>
                <Select
                  value={company}
                  label="Company"
                  onChange={CompanyChange}
                  sx={{ color: theme.palette.mode === 'dark' ? 'white' : 'black' }} // Conditional styling based on theme mode
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              container
              xs={4}
              justifyContent="center"
              alignContent="center"
            >
              <ToggleButtonGroup
                color={theme.palette.mode === 'dark' ? 'secondary' : 'primary'} // Adjust color based on theme mode
                sx={{ bgcolor: theme.palette.mode === 'dark' ? 'black' : 'white' }} // Adjust background color based on theme mode
                value={view}
                exclusive
                onChange={ViewChange}
                aria-label="View Selection"
              >
                <ToggleButton value="single-company-view">
                  Single Company View
                </ToggleButton>
                <ToggleButton value="comparison-view">
                  Comparison View
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          </Grid>

          <Grid
            item
            container
            xs={1}
            justifyContent="center"
            alignItems="center"
          >
            <FormControlLabel
              control={<ModeSwitch onChange={toggleThemeMode} />} // Pass toggleThemeMode to ModeSwitch
            />
            <AvatarMenu avatarImage={avatarImage} />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

NavBar.propTypes = {
  toggleThemeMode: PropTypes.func.isRequired,
  avatarImage: PropTypes.string.isRequired
};
