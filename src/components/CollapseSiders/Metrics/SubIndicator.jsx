import React from "react";
import PropTypes from "prop-types";
import { Box, Checkbox, IconButton, Tooltip, Typography } from "@mui/material";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import WeightButton from "./WeightButton";

const SubIndicator = ({
  subIndicatorItem,
  onSubIndicatorClick,
  onWeightSave
}) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", maxWidth: "100%", pl: 2 }}>
      <Box>
        <Checkbox
          checked={subIndicatorItem.checked}
          onChange={() => onSubIndicatorClick(subIndicatorItem.subIndicator)}
        />
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <Typography>{subIndicatorItem.subIndicator}</Typography>
      </Box>

      <Box>
        <Tooltip title={subIndicatorItem.description}>
          <IconButton>
            <ErrorOutlineOutlinedIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Box>
        <WeightButton
          initial_weight={subIndicatorItem.weight}
          onSave={onWeightSave}
        />
      </Box>
    </Box>
  );
};

SubIndicator.propTypes = {
  subIndicatorItem: PropTypes.shape({
    checked: PropTypes.bool.isRequired,
    subIndicator: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    weight: PropTypes.number.isRequired
  }).isRequired,
  onSubIndicatorClick: PropTypes.func.isRequired,
  onWeightSave: PropTypes.func.isRequired
};

export default SubIndicator;
