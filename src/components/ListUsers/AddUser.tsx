"use client";
import { useState } from "react";
import { TextField, Select, MenuItem, Button, Box, Typography } from "@mui/material";
import { addUserAPI } from "@/services/listUsersAPIs";

const AddUser = () => {
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
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 3,
                backgroundColor: 'white',
                borderRadius: 2,
                boxShadow: 3,
                width: 400,
                margin: 'auto',
                mt: 5,
            }}
        >
            <Button
                variant="outlined"
                color="error"
                sx={{ alignSelf: 'flex-start', mb: 2 }}
            >
                Back
            </Button>
            <TextField
                label="Name*"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="User Name"
                fullWidth
                margin="normal"
            />
            <TextField
                label="Email*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="User Email"
                fullWidth
                margin="normal"
            />
            <TextField
                label="Mobile*"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="User Mobile"
                fullWidth
                margin="normal"
            />
            <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                displayEmpty
                fullWidth
                sx={{ mb: 2 }}
                placeholder="Select Status"
            >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
            <Button
                variant="contained"
                color="success"
                sx={{ mt: 2 }}
                fullWidth
            >
                Add User
            </Button>
        </Box>
    );
}

export default AddUser;
