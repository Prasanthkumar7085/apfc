import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, List, ListItem, ListItemText, ListItemIcon, Radio, IconButton, InputAdornment } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";
import LoadingComponent from "../Core/LoadingComponent";
import { assignUserAPI, getAllListUsersAPI } from "@/services/devicesAPIs";
import Image from "next/image";
import { toast } from "sonner";
import { capitalizeFirstTwoWords } from "@/lib/helpers/nameFormate";

const AssignUserDialog = ({ open, onClose, getData, devicesId }: any) => {
    const router = useRouter();
    const [usersData, setUsersData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedUser, setSelectedUser] = useState<any>({});

    const getAllUsers = async () => {
        setLoading(true);
        try {
            let queryParams: any = {
                search_string: search ? search : ""
            };
            if (search) {
                queryParams["search_string"] = search;
            }
            const response = await getAllListUsersAPI(queryParams);
            setUsersData(response?.data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    const updateUser = async (id: any) => {
        setLoading(true);
        try {
            const payload = {
                user: id,
            };
            let response: any = await assignUserAPI(payload, devicesId);

            if (response.success) {
                onClose();
                toast.success(response.message);
                getData({});
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, [search]);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>
                Select User
                <IconButton
                    aria-label="close"
                    onClick={() => {
                        onClose();
                        setSearch("")
                        setSelectedUser({});
                    }}
                    sx={{ position: 'absolute', right: 8, top: 8 }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <TextField
                    className="defaultTextFeild"
                    variant="outlined"
                    type="search"
                    placeholder="Search User"
                    fullWidth
                    margin="dense"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Image src="/users/search-icon.svg" alt="" width={15} height={15} />
                            </InputAdornment>
                        ),
                    }}
                />
                <List>
                    {usersData.map((user: any, index: number) => (
                        <ListItem
                            key={index}
                            onClick={() => setSelectedUser(user)}
                            selected={user === selectedUser}
                        >
                            <ListItemIcon>
                                <Radio
                                    checked={user === selectedUser}
                                    onChange={() => setSelectedUser(user)}
                                />
                            </ListItemIcon>
                            <ListItemText primary={capitalizeFirstTwoWords(user?.full_name)} />
                        </ListItem>
                    ))}
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
                    disabled={!selectedUser.id}
                    onClick={() => {
                        updateUser(selectedUser.id);
                    }}
                >
                    Confirm
                </Button>
            </DialogActions>
            <LoadingComponent loading={loading} />
        </Dialog>
    );
};

export default AssignUserDialog;
