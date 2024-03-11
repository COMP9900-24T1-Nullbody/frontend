import React, { useState } from "react";

import NavBar from "../components/NavBar";
import { Box, createTheme, ThemeProvider } from "@mui/material";

import { Theme } from "../theme/main";

export default function UserHistory() {
  const [themeMode, setThemeMode] = useState("light");

  const toggleThemeMode = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider
      theme={
        themeMode === "light"
          ? createTheme(Theme("light"))
          : createTheme(Theme("dark"))
      }
    >
      <Box>
        <Box sx={{ m: 1 }}>
          <NavBar toggleThemeMode={toggleThemeMode} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
