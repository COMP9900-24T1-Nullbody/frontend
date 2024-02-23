/* eslint-disable react/prop-types */
import React, { useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";
import Checkbox from "@mui/material/Checkbox";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";

import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

import WeightButton from "./WeightButton";

// TopIndicator component
const TopIndicator = ({ open, topIndicatorItem, onTopIndicatorClick }) => {
  return (
    <ListItemButton
      onClick={() => onTopIndicatorClick(topIndicatorItem.topIndicator)}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Box>
          <Checkbox
            checked={topIndicatorItem.subIndicatorren.every(
              (subIndicator) => subIndicator.checked
            )}
            indeterminate={
              topIndicatorItem.subIndicatorren.some(
                (subIndicator) => subIndicator.checked
              ) &&
              !topIndicatorItem.subIndicatorren.every(
                (subIndicator) => subIndicator.checked
              )
            }
            onChange={() => onTopIndicatorClick(topIndicatorItem.topIndicator)}
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
          <WeightButton />
        </Box>

        <Box>{open ? <ExpandLess /> : <ExpandMore />}</Box>
      </Box>
    </ListItemButton>
  );
};

// SubIndicator component
const SubIndicator = ({ subIndicatorItem, onSubIndicatorClick }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
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
        <WeightButton />
      </Box>
    </Box>
  );
};

// NestedCheckbox component
export default function NestedCheckbox() {
  const [data, setData] = useState([
    {
      topIndicator: "TopIndicator_1",
      description: "This is TopIndicator_1",
      weight: 0.5,
      subIndicatorren: [
        {
          subIndicator: "SubIndicator_1 SubIndicator_1 SubIndicator_1",
          checked: false,
          description: "This is SubIndicator_1",
          weight: 0.5,
        },
        {
          subIndicator: "SubIndicator_2",
          checked: true,
          description: "This is SubIndicator_2",
          weight: 0.5,
        },
      ],
    },
    {
      topIndicator: "TopIndicator2",
      description: "This is TopIndicator_2",
      weight: 0.5,
      subIndicatorren: [
        {
          subIndicator: "SubIndicator_1",
          checked: true,
          description: "This is SubIndicator_1",
          weight: 0.5,
        },
        {
          subIndicator: "SubIndicator_2",
          checked: false,
          description: "This is SubIndicator_2",
          weight: 0.5,
        },
      ],
    },
  ]);

  const [openTopIndicators, setOpenTopIndicators] = useState({});

  const handleTopIndicatorClick = (topIndicator) => {
    setOpenTopIndicators({
      ...openTopIndicators,
      [topIndicator]: !openTopIndicators[topIndicator],
    });
  };

  const handleSubIndicatorClick = (topIndicator, subIndicator) => {
    const updatedData = data.map((topIndicatorItem) => {
      if (topIndicatorItem.topIndicator === topIndicator) {
        const updatedSubIndicatorren = topIndicatorItem.subIndicatorren.map(
          (subIndicatorItem) => {
            if (subIndicatorItem.subIndicator === subIndicator) {
              return {
                ...subIndicatorItem,
                checked: !subIndicatorItem.checked, // Toggle the checked state
              };
            }
            return subIndicatorItem;
          }
        );
        return {
          ...topIndicatorItem,
          subIndicatorren: updatedSubIndicatorren,
        };
      }
      return topIndicatorItem;
    });
    setData(updatedData);
  };

  return (
    <Box>
      {data.map((topIndicatorItem, index) => (
        <Box key={index}>
          <TopIndicator
            topIndicatorItem={topIndicatorItem}
            open={openTopIndicators[topIndicatorItem.topIndicator]}
            onTopIndicatorClick={handleTopIndicatorClick}
            onSubIndicatorClick={handleSubIndicatorClick}
          />
          <Collapse
            in={openTopIndicators[topIndicatorItem.topIndicator]}
            timeout="auto"
            unmountOnExit
          >
            <Box sx={{ pl: 6 }}>
              {topIndicatorItem.subIndicatorren.map(
                (subIndicatorItem, subIndicatorIndex) => (
                  <SubIndicator
                    key={subIndicatorIndex}
                    subIndicatorItem={subIndicatorItem}
                    onSubIndicatorClick={(subIndicator) =>
                      handleSubIndicatorClick(
                        topIndicatorItem.topIndicator,
                        subIndicator
                      )
                    }
                  />
                )
              )}
            </Box>
          </Collapse>
        </Box>
      ))}
    </Box>
  );
}
