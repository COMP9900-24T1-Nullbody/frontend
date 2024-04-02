import React, { useState } from "react";
import PropTypes from "prop-types";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import LightbulbCircleIcon from "@mui/icons-material/LightbulbCircle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import {
  Grid,
  FormControlLabel,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton
} from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import PaletteIcon from "@mui/icons-material/Palette";

import AvatarMenu from "./AvatarMenu";
import { ColorPalette } from "./ColorPalette";
import { Link } from "react-router-dom";

export default function NavBar({ setThemeColor, avatarImage }) {
  const [industry, setIndustry] = useState("");
  const [company, setCompany] = useState("");
  const [view, setView] = useState("single-company-view");
  const [openDialog, setOpenDialog] = useState(false);

  const handleIndustryChange = (event) => {
    setIndustry(event.target.value);
  };
  const handleCompanyChange = (event) => {
    setCompany(event.target.value);
  };
  const handleViewChange = (event) => {
    setView(event.target.value);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
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
            <Link to="/main">
              <IconButton>
                <LightbulbCircleIcon fontSize="large" />
              </IconButton>
            </Link>
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
                  onChange={handleIndustryChange}
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
                  onChange={handleCompanyChange}
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
                color="primary"
                sx={{ bgcolor: "white" }}
                value={view}
                exclusive
                onChange={handleViewChange}
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
              control={
                <IconButton
                  onClick={handleOpenDialog}
                  sx={{
                    background: "none",
                    borderColor: "black",
                    padding: "0"
                  }}
                >
                  <PaletteIcon />
                </IconButton>
              }
            ></FormControlLabel>
            <AvatarMenu avatarImage={avatarImage} />
          </Grid>
        </Grid>
      </Toolbar>

      {/* Dialog for theme selection */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Select Theme Color</DialogTitle>
        <DialogContent>
          <ColorPalette setThemeColor={setThemeColor} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
}

NavBar.propTypes = {
  setThemeColor: PropTypes.func.isRequired,
  avatarImage: PropTypes.string.isRequired
};
