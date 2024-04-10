import React from "react";
import PropTypes from "prop-types";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { IconButton, Tooltip } from "@mui/material";

import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

export default function FrameworkOptions({ setSelectedFramework }) {
  return (
    <FormControl>
      <RadioGroup
        onChange={(event) => {
          setSelectedFramework(event.target.value);
        }}
        sx={{ pl: 4 }}
      >
        <FormControlLabel
          value="IFRS"
          control={<Radio />}
          label={
            <Tooltip title="International Financial Reporting Standards">
              <div>
                IFRS
                <IconButton>
                  <ErrorOutlineOutlinedIcon />
                </IconButton>
              </div>
            </Tooltip>
          }
        />
        <FormControlLabel
          value="TCFD"
          control={<Radio />}
          label={
            <Tooltip title="Task Force on Climate-related Financial Disclosures">
              <div>
                TCFD
                <IconButton>
                  <ErrorOutlineOutlinedIcon />
                </IconButton>
              </div>
            </Tooltip>
          }
        />
        <FormControlLabel
          value="TNFD"
          control={<Radio />}
          label={
            <Tooltip title="Task Force on Nature-related Financial Disclosures">
              <div>
                TNFD
                <IconButton>
                  <ErrorOutlineOutlinedIcon />
                </IconButton>
              </div>
            </Tooltip>
          }
        />
        <FormControlLabel
          value="APRA-CPG"
          control={<Radio />}
          label={
            <Tooltip title="Australian Prudential Regulation Authority - Corporate Governance Practice Guide">
              <div>
                APRA-CPG
                <IconButton>
                  <ErrorOutlineOutlinedIcon />
                </IconButton>
              </div>
            </Tooltip>
          }
        />
      </RadioGroup>
    </FormControl>
  );
}

FrameworkOptions.propTypes = {
  setSelectedFramework: PropTypes.func.isRequired,
};
