import React from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

export default function FrameworkOptions() {
  return (
    <FormControl>
      <RadioGroup defaultValue="esg" sx={{ pl: 4 }}>
        <FormControlLabel
          value="esg"
          control={<Radio />}
          label="ESG Global Standard"
        />
        <FormControlLabel
          value="dfp"
          control={<Radio />}
          label="Digital Future Pathways"
        />
      </RadioGroup>
    </FormControl>
  );
}
