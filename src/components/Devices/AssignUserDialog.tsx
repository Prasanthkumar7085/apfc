import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, List, ListItem, ListItemText, ListItemIcon, Radio, IconButton, InputAdornment, Tooltip } from "@mui/material";
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

    const getAllUsers = async ({
        page = 1,
        limit = 100,
        search_string = search
    }) => {
        setLoading(true);
        try {
            let queryParams: any = {
                search_string: search_string ? search_string : "",
                page: page,
                limit: limit
            };
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
                setSelectedUser({});
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllUsers({
            page: 1,
            limit: 100,
            search_string: search
        });
    }, [search]);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth id="assignUserDialog">
            <DialogTitle className="dialogHeader">
                <span className="dialogHeading">

                    Select User
                </span>
                <IconButton
                    className="closeBtn"
                    aria-label="close"
                    onClick={() => {
                        onClose();
                        setSearch("")
                        setSelectedUser({});
                    }}

                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent className="dialogContent" >
                <TextField
                    className="defaultTextFeild"
                    variant="outlined"
                    type="search"
                    placeholder="Search "
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
                <List className="usersList">
                    {usersData.map((user: any, index: number) => (
                        <ListItem
                            key={index}
                            onClick={() => setSelectedUser(user)}
                            selected={user === selectedUser}
                        >
                            <ListItemIcon className="radioBtn">
                                <Radio
                                    checked={user?.id === selectedUser?.id}
                                    onChange={() => setSelectedUser(user)}
                                />
                            </ListItemIcon>
                            <Tooltip title={user?.full_name} arrow>
                                <ListItemText className="listText" primary={capitalizeFirstTwoWords(user?.full_name.length > 20
                                    ? user?.full_name.slice(0, 20) + '...'
                                    : user?.full_name)} />
                            </Tooltip>
                        </ListItem>
                    ))}
                </List>

            </DialogContent>
            <DialogActions className="dialogActions">
                <Button
                    className="addUserBtn"
                    variant="contained"
                    startIcon={<Image src="/users/assign-icon.svg" alt="" width={14} height={14} />}
                    onClick={() => router.push("/users/add")}
                >
                    Add New User
                </Button>
                <Button
                    className="confirmbtn"
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
