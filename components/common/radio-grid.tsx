import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

import React from "react";

type Props = {
  onChange: (value: string) => void;
  values: { label: string; value: string | number | boolean }[];
  label: string;
  value: string | number | boolean;
};

const RadioGrid: React.FC<Props> = ({ onChange, values, label, value }) => {
  return (
    <FormControl fullWidth>
      <FormLabel id={`${label}-label`}>{label}</FormLabel>
      <RadioGroup
        aria-labelledby={`${label}-label`}
        name={label}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      >
        {values.map(({ label, value }, i) => (
          <FormControlLabel
            key={String(value) + i}
            value={value}
            control={<Radio />}
            label={label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioGrid;
