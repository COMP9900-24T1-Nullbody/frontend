import React from "react";

import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import Grid from "@mui/material/Grid";

import CollapseFrameworks from "./CollapseSiders/Framworks";
import CollapseMetrics from "./CollapseSiders/Metrics";
import CollapseYears from "./CollapseSiders/Years";
import CollapseAdditions from "./CollapseSiders/Additions";

export default function CollapseSiderMenu() {
  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Nested List Items
        </ListSubheader>
      }
    >
      <Grid container>
        {/* Frameworks */}
        <Grid item xs={12}>
          <CollapseFrameworks />
        </Grid>
        {/* Metrics & Indicators */}
        <Grid item xs={12}>
          <CollapseMetrics />
        </Grid>
        {/* Years */}
        <Grid item xs={12}>
          <CollapseYears />
        </Grid>
        {/* Additional Indicators */}
        <Grid item xs={12}>
          <CollapseAdditions />
        </Grid>

        <Grid item xs={6} />
        <Grid
          item
          xs={6}
          display="flex"
          justifyContent="right
        "
        >
          <Button variant="contained">Save</Button>
        </Grid>
      </Grid>
    </List>
  );
}
