import { Visibility, VisibilityOff } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useState } from "react";

const ResetPasswordDialog = ({ updateDevicePassword, open, closeDialog, password, setPassword }: any) => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <Dialog open={open} onClose={closeDialog} maxWidth="xs" fullWidth className="deleteDialog">
            <DialogTitle className="dialogHeader">
              
                <span className="dialogHeading">
                    Reset Password
                </span>  
                <IconButton
                    className="closeBtn"
                    aria-label="close"
                    onClick={() => {
                        closeDialog();
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent className="dialogContent">
                <label>New Password</label>
                <TextField
                    className="defaultTextFeild"
                    autoComplete="new-password"
                    variant="outlined"
                    placeholder="Reset Password"
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                    value={password}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={togglePasswordVisibility} edge="end">
                                    {showPassword ? (
                                        <VisibilityOff sx={{ fontSize: "1.2rem" }} />
                                    ) : (
                                        <Visibility sx={{ fontSize: "1.2rem" }} />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </DialogContent>
            <DialogActions className="dialogActions">
                <Button
                    className="cancelBtn"
                    variant="text"
                    onClick={closeDialog}
                >
                    Cancel
                </Button>
                <Button
                    className="confirmbtn"
                    variant="contained"
                    onClick={updateDevicePassword}
                    disabled={!password}
                >
                    Update Password
                </Button>
            </DialogActions>
        </Dialog>
    );
}
export default ResetPasswordDialog;