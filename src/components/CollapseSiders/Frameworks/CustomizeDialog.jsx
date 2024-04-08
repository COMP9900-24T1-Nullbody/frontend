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

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import EnvironmentalIcon from "@mui/icons-material/Forest";
import SocialIcon from "@mui/icons-material/Group";
import GovernmentalIcon from "@mui/icons-material/AccountBalance";
import CreateIndicatorDialog from "./CreateIndicatorDialog";

export function SimpleDialog({ open, handleSave, handleClose }) {
  const [E_expand, setE_expand] = React.useState(false);
  const [S_expand, setS_expand] = React.useState(false);
  const [G_expand, setG_expand] = React.useState(false);

  const [openCreateDialog, setOpenCreateDialog] = React.useState(false);

  const handleEClick = () => {
    setE_expand(!E_expand);
  };
  const handleSClick = () => {
    setS_expand(!S_expand);
  };
  const handleGClick = () => {
    setG_expand(!G_expand);
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
          <DialogContentText id="alert-dialog-description">
            Here you can customize your framework.
            {/* Environmental Risks List */}
            <ListItemButton onClick={handleEClick}>
              <ListItemIcon>
                <EnvironmentalIcon />
              </ListItemIcon>
              <ListItemText primary="Environmental Risks" />
              {E_expand ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            {/* Environmental Risks Indicators Form */}
            <Collapse in={E_expand} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => {
                    setOpenCreateDialog(true);
                  }}
                >
                  <Button fullWidth variant="outlined">
                    + Create a Indicator
                  </Button>
                </ListItemButton>
              </List>
            </Collapse>
            {/* Social Risks List */}
            <ListItemButton onClick={handleSClick}>
              <ListItemIcon>
                <SocialIcon />
              </ListItemIcon>
              <ListItemText primary="Social Risks" />
              {S_expand ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            {/* Social Risks Indicators Form */}
            <Collapse in={S_expand} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => {
                    setOpenCreateDialog(true);
                  }}
                >
                  <Button fullWidth variant="outlined">
                    + Create a Indicator
                  </Button>
                </ListItemButton>
              </List>
            </Collapse>
            {/* Govermental Risks List */}
            <ListItemButton onClick={handleGClick}>
              <ListItemIcon>
                <GovernmentalIcon />
              </ListItemIcon>
              <ListItemText primary="Governmental Risks" />
              {G_expand ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            {/* Govermental Risks Indicators Form */}
            <Collapse in={G_expand} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => {
                    setOpenCreateDialog(true);
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
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleSave} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <CreateIndicatorDialog
        open={openCreateDialog}
        handleClose={() => setOpenCreateDialog(false)}
      />
    </>
  );
}

SimpleDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
};
