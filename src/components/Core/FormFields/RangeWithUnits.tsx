import { InputAdornment, TextField } from "@mui/material";

const RangeWithUnits = ({ setting, value, handleChange }: any) => {
  return (
    <TextField
      className="settingsTextFeild rangeTextFeild"
      type={setting?.type}
      name={setting.name}
      value={value[setting.name]}
      onChange={handleChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="start">{setting.unit}</InputAdornment>
        ),
        inputProps: {
          min: setting.min, // Add min value
          max: setting.max, // Add max value
        },
      }}
    />
  );
};
export default RangeWithUnits;
