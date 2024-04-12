import * as React from "react";
import PropTypes from "prop-types";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Slider from "@mui/material/Slider"; // Added Slider import

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import EnvironmentalIcon from "@mui/icons-material/Forest";
import SocialIcon from "@mui/icons-material/Group";
import GovernmentalIcon from "@mui/icons-material/AccountBalance";
import CreateIndicatorDialog from "./CreateIndicatorDialog";
import { Grid, IconButton, TextField, Typography } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import config from "../../../config.json";

export function CustomizeDialog({ open, handleClose }) {
  const [framework_name, setFrameworkName] = React.useState("");
  const [framework_description, setFrameworkDescription] = React.useState("");

  const [framework_name_error, setFrameworkNameError] = React.useState(false);
  const [framework_name_helptext, setFrameworkNameHelperText] =
    React.useState("");
  const [framework_description_error, setFrameworkDescriptionError] =
    React.useState(false);
  const [framework_description_helptext, setFrameworkDescriptionHelperText] =
    React.useState("");

  React.useEffect(() => {
    if (framework_name === "") {
      setFrameworkNameError(true);
      setFrameworkNameHelperText("Please enter framework name");
    } else if (framework_name.length > 255) {
      setFrameworkNameError(true);
      setFrameworkNameHelperText("Framework name is too long");
    } else {
      setFrameworkNameError(false);
      setFrameworkNameHelperText("");
    }
  }, [framework_name]);

  React.useEffect(() => {
    if (framework_description === "") {
      setFrameworkDescriptionError(true);
      setFrameworkDescriptionHelperText("Please enter framework name");
    } else if (framework_description.length > 255) {
      setFrameworkDescriptionError(true);
      setFrameworkDescriptionHelperText("Framework name is too long");
    } else {
      setFrameworkDescriptionError(false);
      setFrameworkDescriptionHelperText("");
    }
  }, [framework_description]);

  // 控制下拉框的展开状态
  const [E_expand, setE_expand] = React.useState(false);
  const [S_expand, setS_expand] = React.useState(false);
  const [G_expand, setG_expand] = React.useState(false);

  const [E_indicators, setE_indicators] = React.useState([]);
  const [S_indicators, setS_indicators] = React.useState([]);
  const [G_indicators, setG_indicators] = React.useState([]);

  const AddEIndicator = (indicator) => {
    setE_indicators([...E_indicators, indicator]);
    console.log(E_indicators);
  };
  const AddSIndicator = (indicator) => {
    setS_indicators([...S_indicators, indicator]);
    console.log(S_indicators);
  };
  const AddGIndicator = (indicator) => {
    setG_indicators([...G_indicators, indicator]);
    console.log(G_indicators);
  };

  const upload = () => {
    const data = {
      name: framework_name,
      description: framework_description,
      E_indicators: E_indicators,
      S_indicators: S_indicators,
      G_indicators: G_indicators,
      E_weight: E_weight,
      S_weight: S_weight,
      G_weight: G_weight,
    };

    if (!framework_name_error && !framework_description_error) {
      fetch(`${config.BACKEND_URL}/create/framework`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: localStorage.getItem("token"),
          framework_info: data,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          alert(data.message);
        });
    }

    handleClose(data);
  };

  // 控制ESG对应Dialog的开关状态
  const [openEnvironmentalCreateDialog, setOpenEnvironmentalCreateDialog] =
    React.useState(false);
  const [openSocialCreateDialog, setOpenSocialCreateDialog] =
    React.useState(false);
  const [openGovernmentalCreateDialog, setOpenGovernmentalCreateDialog] =
    React.useState(false);

  // 控制ESG的权重
  const [E_weight, setE_weight] = React.useState(0.5); // Default value set to 0.5
  const [S_weight, setS_weight] = React.useState(0.5); // Default value set to 0.5
  const [G_weight, setG_weight] = React.useState(0.5); // Default value set to 0.5

  const handleEClick = () => {
    setE_expand(!E_expand);
  };
  const handleSClick = () => {
    setS_expand(!S_expand);
  };
  const handleGClick = () => {
    setG_expand(!G_expand);
  };

  const handleSliderChange = (value, setValue) => {
    setValue(value);
  };

  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Customize Framework"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" padding={2}>
            Here you can customize your framework. <br />
            {/* Framework Name */}
            <TextField
              fullWidth
              error={framework_name_error}
              helperText={framework_name_helptext}
              label="Framework Name"
              variant="outlined"
              value={framework_name}
              onChange={(e) => setFrameworkName(e.target.value)}
            />
            {/* Framework Description */}
            <TextField
              fullWidth
              error={framework_description_error}
              helperText={framework_description_helptext}
              label="Framework Description"
              variant="outlined"
              value={framework_description}
              onChange={(e) => setFrameworkDescription(e.target.value)}
              multiline
            />
            {/* Slider for Environmental weights */}
            <Typography variant="h6">
              Environmental Weight: {E_weight}
            </Typography>
            <Slider
              value={E_weight}
              min={0}
              max={1}
              step={0.1} // Optional: Define the step size for finer adjustments
              onChange={(e, value) => handleSliderChange(value, setE_weight)}
            />
            {/* Slider for Social weights */}
            <Typography variant="h6">Social Weight: {S_weight}</Typography>
            <Slider
              value={S_weight}
              min={0}
              max={1}
              step={0.1} // Optional: Define the step size for finer adjustments
              onChange={(e, value) => handleSliderChange(value, setS_weight)}
            />
            {/* Slider for Governmental weights */}
            <Typography variant="h6">
              Governmental Weight: {G_weight}
            </Typography>
            <Slider
              value={G_weight}
              min={0}
              max={1}
              step={0.1} // Optional: Define the step size for finer adjustments
              onChange={(e, value) => handleSliderChange(value, setG_weight)}
            />
            {/* Environmental Metrics */}
            <ListItemButton onClick={handleEClick}>
              <ListItemIcon>
                <EnvironmentalIcon />
              </ListItemIcon>
              <ListItemText primary="Environmental Indicators" />
              {E_expand ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={E_expand}>
              {E_indicators.map((indicator) => (
                <Grid
                  container
                  key={indicator.indicator_name}
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item xs>
                    {/* 第一个按钮自适应长度 */}
                    <Button fullWidth variant="contained">
                      {indicator.name}
                      {"-----"}
                      {indicator.weight}
                      {"-----"}
                      {indicator.metrics.length}
                    </Button>
                  </Grid>
                  <Grid item>
                    <IconButton
                      onClick={() => {
                        // 删除指标
                        setE_indicators(
                          E_indicators.filter((i) => i !== indicator)
                        );
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
              <List component="div" disablePadding>
                <ListItemButton
                  onClick={() => {
                    setOpenEnvironmentalCreateDialog(true);
                  }}
                >
                  <Button fullWidth variant="outlined">
                    + Create a Indicator
                  </Button>
                </ListItemButton>
              </List>
            </Collapse>
            {/* Social Metrics */}
            <ListItemButton onClick={handleSClick}>
              <ListItemIcon>
                <SocialIcon />
              </ListItemIcon>
              <ListItemText primary="Social Indicators" />
              {S_expand ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={S_expand}>
              {S_indicators.map((indicator) => (
                <Grid
                  container
                  key={indicator.indicator_name}
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item xs>
                    {/* 第一个按钮自适应长度 */}
                    <Button fullWidth variant="contained">
                      {indicator.name}
                      {"-----"}
                      {indicator.weight}
                      {"-----"}
                      {indicator.metrics.length}
                    </Button>
                  </Grid>
                  <Grid item>
                    <IconButton
                      onClick={() => {
                        // 删除指标
                        setS_indicators(
                          S_indicators.filter((i) => i !== indicator)
                        );
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
              <List component="div" disablePadding>
                <ListItemButton
                  onClick={() => {
                    setOpenSocialCreateDialog(true);
                  }}
                >
                  <Button fullWidth variant="outlined">
                    + Create a Indicator
                  </Button>
                </ListItemButton>
              </List>
            </Collapse>
            {/* Governmental Metrics */}
            <ListItemButton onClick={handleGClick}>
              <ListItemIcon>
                <GovernmentalIcon />
              </ListItemIcon>
              <ListItemText primary="Governmental Indicators" />
              {G_expand ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={G_expand}>
              {G_indicators.map((indicator) => (
                <Grid
                  container
                  key={indicator.indicator_name}
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item xs>
                    {/* 第一个按钮自适应长度 */}
                    <Button fullWidth variant="contained">
                      {indicator.name}
                      {"-----"}
                      {indicator.weight}
                      {"-----"}
                      {indicator.metrics.length}
                    </Button>
                  </Grid>
                  <Grid item>
                    <IconButton
                      onClick={() => {
                        // 删除指标
                        setG_indicators(
                          G_indicators.filter((i) => i !== indicator)
                        );
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
              <List component="div" disablePadding>
                <ListItemButton
                  onClick={() => {
                    setOpenGovernmentalCreateDialog(true);
                  }}
                >
                  <Button fullWidth variant="outlined">
                    + Create a Indicator
                  </Button>
                </ListItemButton>
              </List>
            </Collapse>
          </DialogContentText>
        </DialogContent>

        {/* Save and Close Actions */}
        <DialogActions>
          <Button
            onClick={() => {
              // 重置framework表单
              setFrameworkName("");
              setFrameworkDescription("");
              setE_weight(0.5);
              setS_weight(0.5);
              setG_weight(0.5);
              setE_indicators([]);
              setS_indicators([]);
              setG_indicators([]);

              handleClose();
            }}
          >
            Close
          </Button>
          <Button
            onClick={() => {
              // 上传framework
              upload();

              // 重置framework表单
              setFrameworkName("");
              setFrameworkDescription("");
              setE_weight(0.5);
              setS_weight(0.5);
              setG_weight(0.5);
              setE_indicators([]);
              setS_indicators([]);
              setG_indicators([]);

              handleClose();
            }}
            autoFocus
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <CreateIndicatorDialog
        upload={AddEIndicator}
        pillar="E"
        open={openEnvironmentalCreateDialog}
        handleClose={() => setOpenEnvironmentalCreateDialog(false)}
      />
      <CreateIndicatorDialog
        upload={AddSIndicator}
        pillar="S"
        open={openSocialCreateDialog}
        handleClose={() => setOpenSocialCreateDialog(false)}
      />
      <CreateIndicatorDialog
        upload={AddGIndicator}
        pillar="G"
        open={openGovernmentalCreateDialog}
        handleClose={() => setOpenGovernmentalCreateDialog(false)}
      />
    </>
  );
}

CustomizeDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
