import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, List, ListItem, ListItemText, ListItemIcon, Radio, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { getAllListUsersAPI } from "@/services/listUsersAPIs";
import { useRouter } from "next/navigation";
import LoadingComponent from "../Core/LoadingComponent";

const AssignUserDialog = ({ open, onClose }: any) => {
    const router = useRouter();

    const [usersData, setUsersData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);

    const getPatientResults = async () => {
        setLoading(true);
        try {
            const response = await getAllListUsersAPI();
            setUsersData(response?.record || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (open) {
            getPatientResults();
        }
    }, [open]);
    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>
                Select User
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{ position: 'absolute', right: 8, top: 8 }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <TextField
                    label="Search"
                    variant="outlined"
                    fullWidth
                    margin="dense"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <List>
                    {usersData.map((user: any, index: number) => {
                        console.log(user);

                        return (
                            <ListItem
                                key={index}
                            // onClick={() => setSelectedUser(user)}
                            // selected={user === selectedUser}
                            >
                                <ListItemIcon>
                                    <Radio
                                    // checked={user === selectedUser}
                                    />
                                </ListItemIcon>

                                <p> {user?.first_name + " " + user?.last_name}</p>

                            </ListItem>
                        )
                    })}
                </List>

            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<AddIcon />}
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={() => router.push("/users/add")}
                >
                    Add New User
                </Button>
                <Button
                    color="primary"
                    variant="contained"
                >
                    Confirm
                </Button>
            </DialogActions>
            <LoadingComponent loading={loading} />
        </Dialog>
    );
};

export default AssignUserDialog;
