import * as React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

interface SyncDialogProps {
  openSyncParamsDialog: boolean;
  setOpenSyncParamsDialog: any;
  handleSync: () => void;
}

const SyncDeviceDialog: React.FC<SyncDialogProps> = ({
  openSyncParamsDialog,
  setOpenSyncParamsDialog,
  handleSync,
}) => {
  return (
    <Dialog
      open={openSyncParamsDialog}
      aria-labelledby="sync-device-dialog-title"
      aria-describedby="sync-device-dialog-description"
    >
      <DialogTitle id="sync-device-dialog-title">Sync Device</DialogTitle>
      <DialogContent>
        <DialogContentText id="sync-device-dialog-description">
          Would you like to sync the device now?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setOpenSyncParamsDialog(false)}
          variant="outlined"
          color="error"
        >
          No
        </Button>
        <Button onClick={handleSync} variant="contained" color="primary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SyncDeviceDialog;
