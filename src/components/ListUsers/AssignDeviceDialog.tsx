import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, List, ListItem, ListItemIcon, ListItemText, Radio, TextField, Tooltip } from "@mui/material";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { assignDeviceAPI, getAllListDevicesAPI } from "@/services/listUsersAPIs";
import LoadingComponent from "../Core/LoadingComponent";
import { capitalizeFirstTwoWords } from "@/lib/helpers/nameFormate";

const AssignDeviceDialog = ({ open, onClose, getSinleUser, getSinleUserDevices }: any) => {
    const router = useRouter();
    const params = useParams();
    const [deviceData, setDeviceData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedUser, setSelectedUser] = useState<any>({});

    const getAllDevices = async ({
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

            if (response.status == 200) {
                onClose();
                toast.success(response.message);
                getSinleUser();
                getSinleUserDevices();
                setSelectedUser({});
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllDevices({
            page: 1,
            limit: 100,
            search_string: search
        });
    }, [search]);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth id="assignUserDialog">
            <DialogTitle className="dialogHeader">
                <span className="dialogHeading">
                    Select Device
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
            <DialogContent className="dialogContent">
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
                    {deviceData.map((device: any, index: number) => (
                        <ListItem
                            key={index}
                        >
                            <ListItemIcon className="radioBtn">
                                <Radio
                                    checked={device?.id === selectedUser?.id}
                                    onChange={() => setSelectedUser(device)}
                                />
                            </ListItemIcon>
                            <Tooltip title={device?.device_name} arrow>
                                <ListItemText className="listText" primary={capitalizeFirstTwoWords(device?.device_name.length > 20
                                    ? device?.device_name.slice(0, 20) + '...'
                                    : device?.device_name)} />
                            </Tooltip>
                            {device?.user_full_name ? (
                                <Image src="/user-profile.svg" alt="" width={15} height={15} />
                            ) : (
                                ""
                            )}
                        </ListItem>
                    ))}
                </List>

            </DialogContent>
            <DialogActions className="dialogActions">
                <Button
                    className="addUserBtn"
                    variant="contained"
                    startIcon={<Image src="/users/assign-icon.svg" alt="" width={14} height={14} />}
                    onClick={() => router.push("/devices/add")}
                >
                    Add New Device
                </Button>
                <Button
                    className="confirmbtn"
                    variant="contained"
                    disabled={!selectedUser?.id}
                    onClick={() => {
                        assignDevice(selectedUser?.id);
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
