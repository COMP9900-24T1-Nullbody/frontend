import React from "react";

import NavBar from "../components/NavBar";
import CollapseSiderMenu from "../components/CollapseSideMenu";
import { Box } from "@mui/material";

import ViewTable from "../components/ViewTable";
import ViewBarChart from "../components/ViewBarChart";
import ViewLineChart from "../components/ViewLineChart";
import ViewPieChart from "../components/ViewPieChart";

export default function Main() {
  return (
    <Box>
      <NavBar />
      <Box sx={{ display: "flex" }}>
        <Box>
          <CollapseSiderMenu />
        </Box>
        <Box flexGrow={1}>
          <ViewTable />
          <ViewBarChart />
          <ViewLineChart />
          <ViewPieChart />
        </Box>
      </Box>
    </Box>
  );
}
