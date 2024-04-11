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
import CreateIndicatorAutoComplete from "./CreateIndicatorAutocomplete";
import { Grid, IconButton } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

export default function CreateIndicatorDialog({
  upload,
  pillar,
  open,
  handleClose,
}) {
  const [indicatorName, setIndicatorName] = React.useState("");
  const [indicatorWeight, setIndicatorWeight] = React.useState(0);
  const [indicatorDescription, setIndicatorDescription] = React.useState("");
  const [indicatorMetrics, setIndicatorMetrics] = React.useState([]);

  const handleSaveIndicator = () => {
    // 上传
    upload({
      name: indicatorName,
      weight: indicatorWeight,
      description: indicatorDescription,
      metrics: indicatorMetrics,
    });

    // 重置表单
    setIndicatorName("");
    setIndicatorWeight(0);
    setIndicatorDescription("");
    setIndicatorMetrics([]);
    handleClose();
  };

  // 在CreateIndicatorDialog组件中添加一个函数，用于更新指标的name
  const handleUpdateMetricName = (metricId, newName) => {
    const updatedMetrics = indicatorMetrics.map((m) => {
      if (m.id === metricId) {
        return { ...m, name: newName }; // 更新指标的name
      }
      return m;
    });
    setIndicatorMetrics(updatedMetrics);
  };

  const handleUpdateMetricWeight = (metricId, newValue) => {
    const updatedMetrics = indicatorMetrics.map((m) => {
      if (m.id === metricId) {
        return { ...m, weight: newValue }; // 更新指标的weight
      }
      return m;
    });
    setIndicatorMetrics(updatedMetrics);
  };

  const handleAddMetric = () => {
    const newMetric = { id: indicatorMetrics.length + 1, name: "", weight: 0 }; // 创建一个新的 metric 对象
    setIndicatorMetrics([...indicatorMetrics, newMetric]); // 将新的 metric 添加到 metrics 数组中
  };

  return (
    <Dialog open={open}>
      <DialogTitle>
        {pillar == "E"
          ? "Create Environmental Indicator"
          : pillar == "S"
            ? "Create Social Indicator"
            : "Create Governmental Indicator"}
      </DialogTitle>
      <DialogContent
        sx={{
          width: 500,
        }}
      >
        <Typography id="input-slider">Name:</Typography>
        <TextField
          value={indicatorName}
          onChange={(e) => setIndicatorName(e.target.value)}
          fullWidth
          focused
          margin="normal"
        />

        <Typography id="input-slider">Weight:</Typography>
        <Slider
          value={indicatorWeight}
          onChange={(e, value) => setIndicatorWeight(value)}
          valueLabelDisplay="auto"
          step={0.1}
          min={0}
          max={1}
        />

        <Typography id="input-slider">Description:</Typography>
        <TextField
          value={indicatorDescription}
          onChange={(e) => setIndicatorDescription(e.target.value)}
          fullWidth
          multiline
          focused
          margin="normal"
        />

        <Typography id="input-slider">Metrics:</Typography>
        {indicatorMetrics.map((metric) => (
          <Grid
            container
            spacing={2}
            id={`input-metric-${metric.id}`}
            alignItems="center"
            justifyContent="center"
            key={metric.id}
          >
            <Grid item xs={8}>
              <CreateIndicatorAutoComplete
                pillar={pillar}
                onSelect={(newName) =>
                  handleUpdateMetricName(metric.id, newName)
                }
              />
            </Grid>
            <Grid item xs={3}>
              <Slider
                value={metric.weight}
                onChange={(e, value) =>
                  handleUpdateMetricWeight(metric.id, value)
                }
                min={0}
                max={1} // Adjusted min and max values
                step={0.1}
                valueLabelFormat={(value) => `Metric Weight: ${value}`}
                valueLabelDisplay="auto"
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton
                aria-label="delete"
                onClick={() => {
                  // 删除对应 metric
                  const updatedMetrics = indicatorMetrics.filter(
                    (m) => m.id !== metric.id
                  );
                  setIndicatorMetrics(updatedMetrics);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}

        <Button fullWidth variant="outlined" onClick={handleAddMetric}>
          + Add Metric
        </Button>
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
  upload: PropTypes.func.isRequired,
  pillar: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
