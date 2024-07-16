import { Visibility, VisibilityOff } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

const ResetPasswordDialog = ({ updateDevicePassword, open, closeDialog, password, setPassword }: any) => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <Dialog open={open} onClose={closeDialog} maxWidth="xs" fullWidth>
            <DialogTitle>
                Reset Password
                <IconButton
                    aria-label="close"
                    onClick={() => {
                        closeDialog();
                    }}
                    sx={{ position: 'absolute', right: 8, top: 8 }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <label>Resest Password</label>
                <TextField
                    className="settingsTextFeild"
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
            <DialogActions>
                <Button
                    variant="outlined"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={closeDialog}
                >
                    Cancel
                </Button>
                <Button
                    color="primary"
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