"use client";
import { useState } from "react";
import { TextField, Select, MenuItem, Button, Box, Typography } from "@mui/material";
import { addUserAPI } from "@/services/listUsersAPIs";
import LoadingComponent from "../Core/LoadingComponent";
import { useRouter } from "next/navigation";
import Image from "next/image";

const AddUser = () => {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState<any>();

    const addUser = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                name: name,
                email: email,
                phone: phone,
                status: status,
            };
            let response: any = await addUserAPI(payload);

            if (response.success) {

            } else if (response.status == 422) {
                setErrorMessages(response.error_data);
                setLoading(false);
                throw response;
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

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
                <label className="label">Name <span>*</span></label>
                <TextField
                    className="textFeild"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="User Name"
                    fullWidth
                />
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
            </div>
            <div className="feildBlock">
                <label className="label">Mobile <span>*</span></label>
                <TextField
                    className="textFeild"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="User Mobile"
                    fullWidth
                />
            </div>
            <div className="feildBlock">
                <label className="label">Status <span>*</span></label>
                <Select
                    className="selectComponent"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    displayEmpty
                    fullWidth
                >
                    <MenuItem className="menuItem" value="active">Active</MenuItem>
                    <MenuItem className="menuItem" value="inactive">Inactive</MenuItem>
                </Select>
            </div>
            <Button
                className="addUserBtn"
                variant="contained"
                color="success"
                sx={{alignSelf:"flex-end" }}
                
            >
                Add User
            </Button>
            <LoadingComponent loading={loading} />
        </Box>
    );
}

export default AddUser;
