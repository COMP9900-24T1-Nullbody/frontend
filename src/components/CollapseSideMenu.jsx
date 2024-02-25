import React from "react";

import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";

import CollapseFrameworks from "./CollapseSiders/Frameworks/Frameworks";
import CollapseMetrics from "./CollapseSiders/Metrics/Metrics";
import CollapseYears from "./CollapseSiders/Years/Years";
import CollapseAdditions from "./CollapseSiders/Additions/Additions";
import { Box } from "@mui/material";

export default function CollapseSiderMenu() {
  return (
    <Box sx={{ borderRadius: 2, boxShadow: 3, m: 1, p: 1 }}>
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
    </Box>
  );
}
