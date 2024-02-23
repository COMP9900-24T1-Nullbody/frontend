import React from "react";

import NavBar from "../components/NavBar";
import CollapseSiderMenu from "../components/CollapseSideMenu";
import { Box } from "@mui/material";

export default function Main() {
  return (
    <Box>
      <NavBar />
      <CollapseSiderMenu />
    </Box>
  );
}
