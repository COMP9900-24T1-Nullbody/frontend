import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { IconButton, Tooltip } from "@mui/material";

import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

export default function FrameworkOptions() {
  return (
    <FormControl>
      <RadioGroup defaultValue="IFRS" sx={{ pl: 4 }}>
        <FormControlLabel
          value="IFRS"
          control={<Radio />}
          label={
            <Tooltip title="International Financial Reporting Standards">
              IFRS
              <IconButton>
                <ErrorOutlineOutlinedIcon />
              </IconButton>
            </Tooltip>
          }
        />
        <FormControlLabel
          value="TCFD"
          control={<Radio />}
          label={
            <Tooltip title="Task Force on Climate-related Financial Disclosures">
              TCFD
              <IconButton>
                <ErrorOutlineOutlinedIcon />
              </IconButton>
            </Tooltip>
          }
        />
        <FormControlLabel
          value="TNFD"
          control={<Radio />}
          label={
            <Tooltip title="Task Force on Nature-related Financial Disclosures">
              TNFD
              <IconButton>
                <ErrorOutlineOutlinedIcon />
              </IconButton>
            </Tooltip>
          }
        />
        <FormControlLabel
          value="APRA-CPG"
          control={<Radio />}
          label={
            <Tooltip title="Australian Prudential Regulation Authority - Corporate Governance Practice Guide">
              APRA-CPG
              <IconButton>
                <ErrorOutlineOutlinedIcon />
              </IconButton>
            </Tooltip>
          }
        />
      </RadioGroup>
    </FormControl>
  );
}
