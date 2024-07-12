import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, List, ListItem, ListItemText, ListItemIcon, Radio, IconButton, InputAdornment } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { useParams, useRouter } from "next/navigation";
import LoadingComponent from "../Core/LoadingComponent";
import { assignUserAPI, getAllListUsersAPI } from "@/services/devicesAPIs";
import Image from "next/image";
import { toast } from "sonner";
import { assignDeviceAPI, getAllListDevicesAPI } from "@/services/listUsersAPIs";

const AssignDeviceDialog = ({ open, onClose, getSinleUser, getSinleUserDevices }: any) => {
    const router = useRouter();
    const params = useParams();
    const [deviceData, setDeviceData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedUser, setSelectedUser] = useState<any>({});

    const getAllDevices = async () => {
        setLoading(true);
        try {
            let queryParams: any = {
                search_string: search ? search : ""
            };
            if (search) {
                queryParams["search_string"] = search;
            }
            const response = await getAllListDevicesAPI(queryParams);
            setDeviceData(response?.data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    const assignDevice = async (id: any) => {
        setLoading(true);
        try {
            const payload = {
                device: id,
            };
            let response: any = await assignDeviceAPI(payload, params?.id);

            if (response.success) {
                onClose();
                toast.success(response.message);
                getSinleUser();
                getSinleUserDevices();
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllDevices();
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
                    {deviceData.map((device: any, index: number) => (
                        <ListItem
                            key={index}
                            onClick={() => setSelectedUser(device)}
                            selected={device === selectedUser}
                        >
                            <ListItemIcon>
                                <Radio
                                    checked={device === selectedUser}
                                    onChange={() => setSelectedUser(device)}
                                />
                            </ListItemIcon>
                            <ListItemText primary={device?.device_name} />
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
                    onClick={() => router.push("/devices/add")}
                >
                    Add New Device
                </Button>
                <Button
                    color="primary"
                    variant="contained"
                    disabled={!selectedUser.id}
                    onClick={() => {
                        assignDevice(selectedUser.id);
                    }}
                >
                    Confirm
                </Button>
            </DialogActions>
            <LoadingComponent loading={loading} />
        </Dialog>
    );
};

export default AssignDeviceDialog;
