import React, { useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel, Grid, IconButton, Tooltip } from "@mui/material";

import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

export default function NestedCheckbox() {
  // State to store data
  const [data, setData] = useState([
    {
      topIndicator: "TopIndicator_1",
      description: "This is TopIndicator_1",
      subIndicatorren: [
        {
          subIndicator: "SubIndicator_1",
          checked: false,
          description: "This is SubIndicator_1",
        },
        {
          subIndicator: "SubIndicator_2",
          checked: true,
          description: "This is SubIndicator_2",
        },
      ],
    },
    {
      topIndicator: "TopIndicator2",
      description: "This is TopIndicator_2",
      subIndicatorren: [
        {
          subIndicator: "SubIndicator_1",
          checked: true,
          description: "This is SubIndicator_1",
        },
        {
          subIndicator: "SubIndicator_2",
          checked: false,
          description: "This is SubIndicator_2",
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

    // Update state
    setData(updatedData);
  };

  return (
    <React.Fragment>
      {data.map((topIndicatorItem, index) => (
        <React.Fragment key={index}>
          <ListItemButton
            onClick={() =>
              handleTopIndicatorClick(topIndicatorItem.topIndicator)
            }
          >
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
              onChange={() =>
                handleTopIndicatorClick(topIndicatorItem.topIndicator)
              }
            />
            <ListItemText
              primary={
                <Grid container alignItems="center" spacing={2}>
                  <Grid item>{topIndicatorItem.topIndicator}</Grid>
                  <Grid item>
                    <Tooltip title={topIndicatorItem.description}>
                      <IconButton>
                        <ErrorOutlineOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </Grid>
              }
              secondary={topIndicatorItem.description}
            />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse
            in={openTopIndicators[topIndicatorItem.topIndicator]}
            timeout="auto"
            unmountOnExit
          >
            <Grid container sx={{ pl: 6 }}>
              {topIndicatorItem.subIndicatorren.map(
                (subIndicatorItem, subIndicatorIndex) => (
                  <Grid item xs={12} key={subIndicatorIndex}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={subIndicatorItem.checked}
                          onChange={() =>
                            handleSubIndicatorClick(
                              topIndicatorItem.topIndicator,
                              subIndicatorItem.subIndicator
                            )
                          }
                        />
                      }
                      label={
                        <Grid container alignItems="center" spacing={2}>
                          <Grid item>{subIndicatorItem.subIndicator}</Grid>
                          <Grid item>
                            <Tooltip title={subIndicatorItem.description}>
                              <IconButton>
                                <ErrorOutlineOutlinedIcon />
                              </IconButton>
                            </Tooltip>
                          </Grid>
                        </Grid>
                      }
                    />
                  </Grid>
                )
              )}
            </Grid>
          </Collapse>
        </React.Fragment>
      ))}
    </React.Fragment>
  );
}
