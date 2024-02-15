/* eslint-disable no-unused-vars */
import React from "react";

import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { CheckBox } from "@mui/icons-material";
import { Grid } from "@mui/material";

export default function IndeterminateCheckbox() {
  const [checked, setChecked] = React.useState([true, false]);
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleChange1 = (event) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event) => {
    setChecked([checked[0], event.target.checked]);
  };

  const children = (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 3, pl: 4 }}>
      <FormControlLabel
        label="Child 1"
        control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
      />
      <FormControlLabel
        label="Child 2"
        control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
      />
    </Box>
  );

  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={2} container justifyContent="flex-end">
          <Checkbox
            checked={checked[0] && checked[1]}
            indeterminate={checked[0] !== checked[1]}
            onChange={handleChange1}
          />
        </Grid>
        <Grid item xs={8} container justifyContent="flex-start">
          <ListItemButton onClick={handleClick}>
            <ListItemText primary="Parent" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </Grid>
      </Grid>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </React.Fragment>
  );
}
