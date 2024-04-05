import React from "react";
import PropTypes from "prop-types";

import { Box, Checkbox, IconButton, Tooltip, Typography } from "@mui/material";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import WeightButton from "./WeightButton";

const TopIndicator = ({
  open,
  topIndicatorItem,
  onTopIndicatorClick,
  onTopCheckBoxClick,
  onWeightSave
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        maxWidth: "100%",
        pl: 2,
        pr: 2
      }}
    >
      <Box>
        <Checkbox
          checked={topIndicatorItem.subIndicators.every(
            (subIndicator) => subIndicator.checked
          )}
          indeterminate={
            topIndicatorItem.subIndicators.some(
              (subIndicator) => subIndicator.checked
            ) &&
            !topIndicatorItem.subIndicators.every(
              (subIndicator) => subIndicator.checked
            )
          }
          onChange={() => onTopCheckBoxClick(topIndicatorItem.topIndicator)}
        />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography wrap="wrap">{topIndicatorItem.topIndicator}</Typography>
      </Box>

      <Box>
        <Tooltip title={topIndicatorItem.description}>
          <IconButton>
            <ErrorOutlineOutlinedIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Box>
        <WeightButton
          initial_weight={topIndicatorItem.weight}
          onWeightSave={onWeightSave}
        />
      </Box>

      <Box>
        {open ? (
          <ExpandLess
            onClick={() => onTopIndicatorClick(topIndicatorItem.topIndicator)}
          />
        ) : (
          <ExpandMore
            onClick={() => onTopIndicatorClick(topIndicatorItem.topIndicator)}
          />
        )}
      </Box>
    </Box>
  );
};

TopIndicator.propTypes = {
  open: PropTypes.bool.isRequired,
  topIndicatorItem: PropTypes.shape({
    topIndicator: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    weight: PropTypes.number.isRequired,
    subIndicators: PropTypes.arrayOf(
      PropTypes.shape({
        subIndicator: PropTypes.string.isRequired,
        checked: PropTypes.bool.isRequired,
        description: PropTypes.string.isRequired,
        weight: PropTypes.number.isRequired
      })
    ).isRequired
  }).isRequired,
  onTopIndicatorClick: PropTypes.func.isRequired,
  onTopCheckBoxClick: PropTypes.func.isRequired,
  onWeightSave: PropTypes.func.isRequired
};

export default TopIndicator;
