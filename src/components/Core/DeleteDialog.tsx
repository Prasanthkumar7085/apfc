import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";

const DeleteDialog = ({ deleteUser, open, closeDialog, lable }: any) => {
    const router = useRouter();

    return (
        <Dialog open={open} onClose={closeDialog} maxWidth="xs" fullWidth>
            <DialogTitle>
                Delete User
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
                <p>{lable}</p>
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
                    onClick={deleteUser}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}
export default DeleteDialog;