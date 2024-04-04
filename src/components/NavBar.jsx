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

import AvatarMenu from "./AvatarMenu";
import { ColorPalette } from "./ColorPalette";
import { Link } from "react-router-dom";
import CountrySelect from "./NavBar/CountrySelect";
import CompanySelect from "./NavBar/CompanySelect";

export default function NavBar({ setThemeColor, avatarImage }) {
  const [countryCode, setCountryCode] = useState("");

  const [view, setView] = useState("single-company-view");
  const [openDialog, setOpenDialog] = useState(false);

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
              xs={4}
              justifyContent="center"
              alignContent="center"
            >
              <CountrySelect onCountryChange={setCountryCode} />
            </Grid>
            <Grid
              item
              container
              xs={4}
              justifyContent="center"
              alignContent="center"
            >
              <CompanySelect
                country_code={countryCode}
              />
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
