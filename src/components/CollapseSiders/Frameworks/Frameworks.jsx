import React from "react";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import FrameworkOptions from "./FrameworksOptions";
import { Box, Button } from "@mui/material";

export default function CollapseFrameworks() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box>
      <Box>
        <ListItemButton onClick={handleClick}>
          <ListItemText primary="FRAMEWORKS" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </Box>

      <Box>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <FrameworkOptions />
          <Box sx={{ pl: 4 }}>
            <Button variant="outlined">+ Customize A Framework</Button>
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
}
