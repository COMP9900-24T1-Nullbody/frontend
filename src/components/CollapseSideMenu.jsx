import React from "react";

import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";

import CollapseFrameworks from "./CollapseSiders/Framworks";
import CollapseMetrics from "./CollapseSiders/Metrics";
import CollapseYears from "./CollapseSiders/Years";
import CollapseAdditions from "./CollapseSiders/Additions";

export default function CollapseSiderMenu() {
  return (
    <List sx={{ width: "100%", maxWidth: 350 }}>
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
