/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import NavBar from "../components/NavBar";
import CollapseSiderMenu from "../components/CollapseSideMenu";
import { Box, createTheme, ThemeProvider } from "@mui/material";

import ViewTable from "../components/Views/ViewTable";
import ViewBarChart from "../components/Views/ViewBarChart";
import ViewLineChart from "../components/Views/ViewLineChart";
import ViewPieChart from "../components/Views/ViewPieChart";

import { Theme } from "../theme/main";

export default function Main() {
  const [themeMode, setThemeMode] = useState("light");

  const toggleThemeMode = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={themeMode === "light" ? createTheme(Theme('light')) : createTheme(Theme('dark'))}>
      <Box>
        <Box sx={{ m: 1 }}>
          <NavBar toggleThemeMode={toggleThemeMode} />
        </Box>

        <Box sx={{ display: "flex" }}>
          <Box>
            <CollapseSiderMenu />
          </Box>
          <Box flexGrow={1} sx={{ borderRadius: 2, boxShadow: 3, m: 1, p: 1 }}>
            <ViewTable />
            <ViewBarChart />
            <ViewLineChart />
            <ViewPieChart />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
