import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";

const DeleteDialog = ({ deleteUser, open, closeDialog, lable, headerName }: any) => {
    const router = useRouter();

    return (
        <Dialog open={open} onClose={closeDialog} maxWidth="xs" fullWidth className="deleteDialog">
            <DialogTitle className="dialogHeader">
                <span className="dialogHeading"> {headerName}</span>
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
                <p>{lable}</p>
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
                    onClick={deleteUser}
                >
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
}
export default DeleteDialog;