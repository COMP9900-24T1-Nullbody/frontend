import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { IconButton, Tooltip } from "@mui/material";

import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

import config from "../../../config.json";

export default function FrameworkOptions({ setSelectedFramework }) {
  const [frameworks, setFrameworks] = useState([]);
  useEffect(() => {
    // 获取 local storage 中的 token
    const token = localStorage.getItem("token");

    // 发送请求获取框架数据
    fetch(`${config.BACKEND_URL}/list/frameworks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })
      .then((response) => response.json())
      .then((data) => {
        setFrameworks(data.frameworks);
      })
      .catch((error) => {
        console.error("Error fetching frameworks:", error);
      });
  }, []);

  return (
    <FormControl>
      <RadioGroup
        onChange={(event) => {
          setSelectedFramework(event.target.value);
        }}
        sx={{ pl: 4 }}
      >
        {frameworks.map((item) => (
          <FormControlLabel
            key={item.name}
            value={item.name}
            control={<Radio />}
            label={
              <Tooltip title={<span>{item.description}</span>}>
                <div>
                  {item.name}
                  <IconButton>
                    <ErrorOutlineOutlinedIcon />
                  </IconButton>
                </div>
              </Tooltip>
            }
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

FrameworkOptions.propTypes = {
  setSelectedFramework: PropTypes.func.isRequired,
};
