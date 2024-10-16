import * as React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { Router } from "next/router";
import { useParams, useRouter } from "next/navigation";

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
  const router = useRouter();
  const params = useParams();
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
          onClick={() => {
            setOpenSyncParamsDialog(false);
            if (!params?.id) {
              router.back();
            }
          }}
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
