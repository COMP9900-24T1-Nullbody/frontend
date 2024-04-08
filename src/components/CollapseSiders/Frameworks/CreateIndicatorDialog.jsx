import * as React from "react";
import PropTypes from "prop-types";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

import CreateIndicatorTransferList from "./CreateIndicatorTranferList"; // Assuming TransferList is a component you've defined

export default function CreateIndicatorDialog({ open, handleClose }) {
  const [indicatorName, setIndicatorName] = React.useState("");
  const [indicatorWeight, setIndicatorWeight] = React.useState(0);
  const [indicatorDescription, setIndicatorDescription] = React.useState("");
  const [selectedMetrics, setSelectedMetrics] = React.useState([]);

  const handleSaveIndicator = () => {
    // Perform save logic here
    handleClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Create Indicator</DialogTitle>
      <DialogContent>
        <Typography id="input-slider">
          Name:
        </Typography>
        <TextField
          value={indicatorName}
          onChange={(e) => setIndicatorName(e.target.value)}
          fullWidth
          focused
          margin="normal"
        />

        <Typography id="input-slider">
          Weight:
        </Typography>
        <Slider
          value={indicatorWeight}
          onChange={(e, value) => setIndicatorWeight(value)}
          valueLabelDisplay="auto"
          step={0.1}
          min={0}
          max={1}
        />

        <Typography id="input-slider">
          Description:
        </Typography>
        <TextField
          value={indicatorDescription}
          onChange={(e) => setIndicatorDescription(e.target.value)}
          fullWidth
          multiline
          focused
          margin="normal"
        />

        <Typography id="input-slider">
          Metrics:
        </Typography>
        <CreateIndicatorTransferList
          selectedMetrics={selectedMetrics}
          setSelectedMetrics={setSelectedMetrics}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSaveIndicator} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

CreateIndicatorDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};
