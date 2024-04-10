import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import MetricsOptions from "./MetricsOptions";
import { Box } from "@mui/material";

import config from "../../../config.json";

export default function CollapseMetrics({
  selectedCompany,
  selectedFramework,
}) {
  const [open, setOpen] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("selectedCompany:", selectedCompany);
    console.log("selectedFramework:", selectedFramework);

    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        company_name: selectedCompany,
        framework: selectedFramework,
      }),
    };
    fetch(`${config.BACKEND_URL}/company_info/v3`, request)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error(data.error);
        } else {
          setData(data.Risks);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [selectedCompany, selectedFramework]);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary="METRICS & INDICATORS" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <MetricsOptions data={data} setData={setData} />
      </Collapse>
    </Box>
  );
}

CollapseMetrics.propTypes = {
  selectedCompany: PropTypes.string.isRequired,
  selectedFramework: PropTypes.string.isRequired,
};
