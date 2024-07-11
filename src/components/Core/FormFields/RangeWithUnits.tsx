import { InputAdornment, TextField } from "@mui/material";

const RangeWithUnits = ({ setting, value, handleChange }: any) => {
  return (
    <div>
      <TextField
        type={setting?.type}
        name={setting.name}
        value={value[setting.name]}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">{setting.unit}</InputAdornment>
          ),
        }}
      />
    </div>
  );
};
export default RangeWithUnits;
