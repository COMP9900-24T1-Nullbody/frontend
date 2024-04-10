import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import LightbulbCircleIcon from "@mui/icons-material/LightbulbCircle";
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
import AvatarMenu from "./AvatarMenu"; // 请根据您的项目结构调整路径
import { ColorPalette } from "./ColorPalette"; // 请根据您的项目结构调整路径
import { Link } from "react-router-dom";
import CountrySelect from "./NavBar/CountrySelect"; // 请根据您的项目结构调整路径
import CompanySelect from "./NavBar/CompanySelect"; // 请根据您的项目结构调整路径

export default function NavBar({ setThemeColor, avatarImage, setSelectedCompany }) {
  const [countryCode, setCountryCode] = useState("");
  const [selectedThemeColor, setSelectedThemeColor] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  
  const initialView = location.pathname === "/main/single" ? "single-company-view" : "comparison-view";
  const [view, setView] = useState(initialView);

  const handleViewChange = (_, newValue) => {
    setView(newValue);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveThemeColor = () => {
    setThemeColor(selectedThemeColor);
    setOpenDialog(false);
  };

  return (
    <AppBar position="stic" sx={{ borderRadius: 2 }}>
      <Toolbar>
        <Grid container padding={2}>
          <Grid
            item
            container
            xs={1}
            justifyContent="center"
            alignItems="center"
          >
            <Link to="/main/single">
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
              xs={3}
              justifyContent="center"
              alignContent="center"
            >
              <CountrySelect onCountryChange={setCountryCode} />
            </Grid>
            <Grid
              item
              container
              xs={3}
              justifyContent="center"
              alignContent="center"
            >
              <CompanySelect
                country_code={countryCode}
                setSelectedCompany={setSelectedCompany}
              />
            </Grid>
            <Grid
              item
              container
              xs={2}
              justifyContent="center"
              alignContent="center"
            >
              <Button onClick={handleSaveThemeColor} variant="contained">
                Save
              </Button>
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
                <ToggleButton
                  component={Link}
                  to="/main/single"
                  value="single-company-view"
                >
                  Single Company View
                </ToggleButton>
                <ToggleButton
                  component={Link}
                  to="/main/multi"
                  value="comparison-view"
                >
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
            />
            <AvatarMenu avatarImage={avatarImage} />
          </Grid>
        </Grid>
      </Toolbar>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Select Theme Color</DialogTitle>
        <DialogContent>
          <ColorPalette setThemeColor={setSelectedThemeColor} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveThemeColor}>Save</Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
}

NavBar.propTypes = {
  setThemeColor: PropTypes.func.isRequired,
  avatarImage: PropTypes.string.isRequired,
  setSelectedCompany: PropTypes.func.isRequired
};
