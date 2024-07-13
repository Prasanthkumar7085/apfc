"use client"
import { getSigleDeviceAPI } from "@/services/devicesAPIs";
import { useEffect, useState } from "react";
import LoadingComponent from "../Core/LoadingComponent";
import { Grid, Typography, Paper, Button } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

const SingleDeviceView = () => {
    const params = useParams();
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [deviceData, setDeviceData] = useState<any>({});

    const getPatientResults = async () => {
        setLoading(true);
        try {
            const response = await getSigleDeviceAPI(params?.id);
            setDeviceData(response?.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPatientResults();
    }, []);

    return (
        <div>
            <Button
                variant="outlined"
                className="backBtn"
                sx={{ alignSelf: 'flex-start', mb: 2 }}
                onClick={() => router.back()}
                startIcon={<Image src="/users/back-icon.svg" alt="" width={13} height={13} />}  >
                Back
            </Button>
            <p>{deviceData?.device_name || '--'}</p>
            <Grid container spacing={2} sx={{ padding: 2 }}>
                <Grid item xs={12}>
                    <Typography variant="h6">Device Number: {deviceData?.device_id || '--'}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ padding: 2 }}>
                        <Typography variant="subtitle1">Voltage Measurements</Typography>
                        {deviceData?.length
                            ?
                            Object?.keys(deviceData?.voltage_measurements)?.map((item, index) => (
                                <div key={index}>
                                    <Typography>{item}: {deviceData?.voltage_measurements[item] || '--'}</Typography>
                                </div>
                            ))
                            : ""
                        }
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ padding: 2 }}>
                        <Typography variant="subtitle1">Power Measurements</Typography>
                        {deviceData?.length
                            ?
                            Object?.keys(deviceData?.power_measurements).map((item, index) => (
                                <div key={index}>
                                    <Typography>{item}: {deviceData?.power_measurements[item] || '--'}</Typography>
                                </div>
                            ))
                            : ""
                        }
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ padding: 2 }}>
                        <Typography variant="subtitle1">Errors</Typography>
                        {deviceData?.length
                            ?
                            Object?.keys(deviceData?.errors).map((item, index) => (
                                <div key={index}>
                                    <Typography>{item}: {deviceData?.errors[item] === true ? "Error" : "" || '--'}</Typography>
                                </div>
                            ))
                            : ""
                        }
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ padding: 2 }}>
                        <Typography variant="subtitle1">Relay Status</Typography>
                        {deviceData?.length
                            ?
                            Object?.keys(deviceData?.relay_status).map((item, index) => (
                                <div key={index}>
                                    <Typography>{item}: {deviceData?.relay_status[item] || '--'}</Typography>
                                </div>
                            ))
                            : ""
                        }
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ padding: 2 }}>
                        <Typography variant="subtitle1">Bank Values</Typography>
                        {deviceData?.length
                            ?
                            Object?.keys(deviceData?.bank_values).map((item, index) => (
                                <div key={index}>
                                    <Typography>{item}: {deviceData?.bank_values[item] || '--'}</Typography>
                                </div>
                            ))
                            : ""
                        }
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper sx={{ padding: 2 }}>
                        <Typography variant="subtitle1">Total Harmonic Distortion (THD)</Typography>
                        {deviceData?.length
                            ?
                            Object?.keys(deviceData?.total_harmonic_distortion).map((item, index) => (
                                <div key={index}>
                                    <Typography>{item}: {deviceData?.total_harmonic_distortion[item] || '--'}</Typography>
                                </div>
                            ))
                            : ""
                        }
                    </Paper>
                </Grid>
            </Grid>
            <LoadingComponent loading={loading} />
        </div>
    );
}
export default SingleDeviceView;
