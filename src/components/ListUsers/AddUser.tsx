"use client";
import { useEffect, useState } from "react";
import { TextField, Select, MenuItem, Button, Box, Typography, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { addUserAPI, getSigleUserAPI, updateUserAPI } from "@/services/listUsersAPIs";
import LoadingComponent from "../Core/LoadingComponent";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import ErrorMessagesComponent from "../Core/ErrorMessagesComponent";

const AddUser = () => {
    const router = useRouter();
    const params = useParams();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState<any>();
    const [showPassword, setShowPassword] = useState(false);


    const getSingleUser = async () => {
        setLoading(true);
        try {
            const response = await getSigleUserAPI(params?.id);
            console.log(response);


            if (response.status === 200) {
                setName(response?.data?.full_name)
                setEmail(response?.data?.email)
                setPhone(response?.data?.phone)
                setUserType(response?.data?.user_type)
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
                full_name: name,
                email: email,
                phone: phone,
                password: password,
                user_type: userType,
            };
            let response: any = await addUserAPI(payload);
            console.log(response);

            if (response.success) {
                router.push('/users');
                setErrorMessages(null);

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
                full_name: name,
                email: email,
                phone: phone,
                user_type: userType,
            };
            let response: any = await updateUserAPI(payload, params?.id);
            console.log(response);

            if (response.success) {
                router.push('/users');
                setErrorMessages(null);

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

    const handlePhoneChange = (e: any) => {
        const value = e.target.value;
        if (/^\d{0,10}$/.test(value)) {
            setPhone(value);
        }
    };

    const handleNameChange = (e: any) => {
        const value = e.target.value.replace(/^\s+/, '');
        setName(value);
    };

    const handlePasswordChange = (e: any) => {
        const value = e.target.value.replace(/^\s+/, '');
        setPassword(value);
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
        <Box id="addUser">
            <Button
                className="backBtn"
                variant="outlined"
                sx={{ alignSelf: 'flex-start', mb: 2 }}
                onClick={() => router.back()}
                startIcon={<Image src="/users/back-icon.svg" alt="" width={13} height={13} />}
            >
                Back
            </Button>
            <div className="feildBlock">
                <label className="label">Full Name <span>*</span></label>
                <TextField
                    className="textFeild"
                    value={name}
                    onChange={(e) => handleNameChange(e)}
                    placeholder="User Full Name"
                    fullWidth
                />
                <ErrorMessagesComponent errorMessage={errorMessages?.full_name} />
            </div>
            <div className="feildBlock">
                <label className="label">Email <span>*</span></label>
                <TextField
                    className="textFeild"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="User Email"
                    fullWidth
                />
                <ErrorMessagesComponent errorMessage={errorMessages?.email} />
            </div>
            <div className="feildBlock">
                <label className="label">Mobile</label>
                <TextField
                    className="textFeild"
                    value={phone}
                    onChange={(e) => handlePhoneChange(e)}
                    placeholder="User Mobile"
                    fullWidth
                />
                <ErrorMessagesComponent errorMessage={errorMessages?.phone} />
            </div>
            {!params?.id ? (
                <div className="feildBlock">
                    <label className="label">Password <span>*</span></label>
                    <TextField
                        className="textFeild"
                        value={password}
                        type={showPassword ? "text" : "password"}
                        onChange={(e) => handlePasswordChange(e)}
                        placeholder="User Password"
                        fullWidth
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={togglePasswordVisibility} edge="end">
                                        {showPassword ? <VisibilityOff sx={{ fontSize: "1.2rem" }} /> : <Visibility sx={{ fontSize: "1.2rem" }} />}
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
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
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
        </Box>
    );
}

export default AddUser;
