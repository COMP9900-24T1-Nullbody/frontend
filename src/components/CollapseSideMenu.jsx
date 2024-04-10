import { React, useState } from "react";
import PropTypes from "prop-types";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";

import CollapseFrameworks from "./CollapseSiders/Frameworks/Frameworks";
import CollapseMetrics from "./CollapseSiders/Metrics/Metrics";
import CollapseCountries from "./CollapseSiders/Country/Countries";
import CollapseCompanies from "./CollapseSiders/Company/Companies";

export default function CollapseSiderMenu({
  selectedCompany,
  selectedFramework,
  setSelectedCompany,
  setSelectedFramework,
}) {
  const [country_code, setCountryCode] = useState("");

  return (
    <Box sx={{ borderRadius: 2, boxShadow: 3, m: 1, p: 1 }}>
      <List sx={{ width: "100%", maxWidth: 500 }}>
        <Grid container>
          {/* Countries */}
          <Grid item xs={12}>
            <CollapseCountries setCountryCode={setCountryCode} />
          </Grid>

          {/* Company */}
          <Grid item xs={12}>
            <CollapseCompanies
              country_code={country_code}
              setSelectedCompany={setSelectedCompany}
            />
          </Grid>

          {/* Frameworks */}
          <Grid item xs={12}>
            <CollapseFrameworks setSelectedFramework={setSelectedFramework} />
          </Grid>

          {/* Metrics & Indicators */}
          <Grid item xs={12}>
            <CollapseMetrics
              selectedCompany={selectedCompany}
              selectedFramework={selectedFramework}
            />
          </Grid>

          {/* Years */}
          {/* <Grid item xs={12}>
            <CollapseYears />
          </Grid> */}

          {/* Additional Indicators */}
          {/* <Grid item xs={12}>
            <CollapseAdditions />
          </Grid> */}

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

CollapseSiderMenu.propTypes = {
  selectedCompany: PropTypes.string.isRequired,
  selectedFramework: PropTypes.string.isRequired,
  setSelectedCompany: PropTypes.func.isRequired,
  setSelectedFramework: PropTypes.func.isRequired,
};
