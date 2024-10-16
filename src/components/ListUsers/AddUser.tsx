"use client";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, IconButton, InputAdornment, MenuItem, Select, TextField } from "@mui/material";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import { addUserAPI, getSigleUserAPI, updateUserAPI } from "@/services/listUsersAPIs";
import ErrorMessagesComponent from "../Core/ErrorMessagesComponent";
import LoadingComponent from "../Core/LoadingComponent";
import { useDispatch } from "react-redux";
import { setSingleUser } from "@/redux/Modules/userlogin";

const AddUser = () => {
    const router = useRouter();
    const params = useParams();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState<any>();
    const [showPassword, setShowPassword] = useState(false);
    const [userDetails, setUserDetails] = useState<any>({
        full_name: "",
        email: "",
        phone: "",
        password: "",
        user_type: "",
    });

    const handleFieldValue = (event: any) => {
        const { name, value } = event.target;
        const userValue = name === "phone"
            ? value.replace(/\D/g, '').slice(0, 10)
            : value.replace(/^\s+/, '');
        setUserDetails({
            ...userDetails,
            [name]: userValue,
        });
    };

    const getSingleUser = async () => {
        setLoading(true);
        try {
            const response = await getSigleUserAPI(params?.id);
            if (response.status === 200) {
                setUserDetails(response?.data)
                dispatch(setSingleUser(response?.data));
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const addUser = async () => {
        setLoading(true);
        try {
            const payload = {
                ...userDetails
            };
            let response: any = await addUserAPI(payload);

            if (response.success) {
                setErrorMessages(null);
                toast.success(response.message);
                setTimeout(() => {
                    router.push('/users');
                }, 1000)

            } else if (response.status === 422) {
                setErrorMessages(response.error_data);
                throw response;
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const updateUser = async () => {
        setLoading(true);
        try {
            const payload = {
                ...userDetails
            };
            let response: any = await updateUserAPI(payload, params?.id);

            if (response.success) {
                setErrorMessages(null);
                toast.success(response.message);
                setTimeout(() => {
                    router.push('/users');
                }, 1000)
            } else if (response.status === 422) {
                setErrorMessages(response.error_data);
                throw response;
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const sendButton = () => {
        if (params?.id) {
            updateUser();
        } else {
            addUser();
        }
    }

    useEffect(() => {
        if (params?.id) {
            getSingleUser();
        }
    }, [])

    return (
        <Box id="addUser" className="addNewUserPage">
            <div className="feildBlock">
                <label className="label">Full Name <span>*</span></label>
                <TextField
                    className="textFeild"
                    name="full_name"
                    value={userDetails["full_name"]}
                    onChange={handleFieldValue}
                    placeholder="Enter User Full Name"
                    fullWidth
                />
                <ErrorMessagesComponent errorMessage={errorMessages?.full_name} />
            </div>
            <div className="feildBlock">
                <label className="label">Email <span>*</span></label>
                <TextField
                    className="textFeild"
                    name="email"
                    value={userDetails["email"]}
                    onChange={handleFieldValue}
                    placeholder="Enter User Email"
                    fullWidth
                />
                <ErrorMessagesComponent errorMessage={errorMessages?.email} />
            </div>
            <div className="feildBlock">
                <label className="label">Mobile</label>
                <TextField
                    className="textFeild"
                    name="phone"
                    value={userDetails["phone"]}
                    onChange={handleFieldValue}
                    placeholder="Enter User Mobile"
                    fullWidth
                />
                <ErrorMessagesComponent errorMessage={errorMessages?.phone} />
            </div>
            {!params?.id ? (
                <div className="feildBlock">
                    <label className="label">Password <span>*</span></label>
                    <TextField
                        className="textFeild"
                        name="password"
                        value={userDetails["password"]}
                        type={showPassword ? "text" : "password"}
                        onChange={handleFieldValue}
                        placeholder="Enter User Password"
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={togglePasswordVisibility} edge="end">
                                        {showPassword ? <Visibility sx={{ fontSize: "1.2rem" }} /> : <VisibilityOff sx={{ fontSize: "1.2rem" }} />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <ErrorMessagesComponent errorMessage={errorMessages?.password} />
                </div>
            ) : (
                ""
            )}
            <div className="feildBlock">
                <label className="label">User Type <span>*</span></label>
                <Select
                    className="selectComponent"
                    name="user_type"
                    value={userDetails["user_type"]}
                    onChange={handleFieldValue}
                    displayEmpty
                    fullWidth
                >
                    <MenuItem className="menuItem" value="USER">User</MenuItem>
                    <MenuItem className="menuItem" value="ADMIN">Admin</MenuItem>
                </Select>
                <ErrorMessagesComponent errorMessage={errorMessages?.user_type} />
            </div>
            <Button
                className="addUserBtn"
                variant="contained"
                color="success"
                sx={{ alignSelf: "flex-end" }}
                onClick={sendButton}
            >
                {params?.id ? "Update User" : "Add User"}
            </Button>
            <LoadingComponent loading={loading} />
            <Toaster richColors closeButton position="top-right" />
        </Box>
    );
}

export default AddUser;
