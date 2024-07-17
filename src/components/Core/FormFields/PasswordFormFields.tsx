import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const PasswordFormFields = ({ name, handleChange, value }: any) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <TextField
      className="settingsTextFeild"
      autoComplete="new-password"
      variant="outlined"
      name={name}
      type={showPassword ? "text" : "password"}
      onChange={handleChange}
      value={value?.[name] || ""}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={togglePasswordVisibility} edge="end">
              {showPassword ? (
                <Visibility sx={{ fontSize: "1.2rem" }} />
              ) : (
                <VisibilityOff sx={{ fontSize: "1.2rem" }} />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
export default PasswordFormFields;
