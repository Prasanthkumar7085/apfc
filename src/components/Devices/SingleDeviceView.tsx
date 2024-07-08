"use client"
import { getSigleDeviceAPI } from "@/services/devicesAPIs";
import { useEffect, useState } from "react";
import LoadingComponent from "../Core/LoadingComponent";
import { Grid, Typography, Paper } from "@mui/material";

const SingleDeviceView = () => {
    const [loading, setLoading] = useState(false);
    const [deviceData, setDeviceData] = useState<any>({});

    const getPatientResults = async () => {
        setLoading(true);
        try {
            const response = await getSigleDeviceAPI();
            setDeviceData(response?.record);
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
            <p>{deviceData?.device_name || '--'}</p>
            <Grid container spacing={2} sx={{ padding: 2 }}>
                <Grid item xs={12}>
                    <Typography variant="h6">Device Number: {deviceData?.device_id || '--'}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ padding: 2 }}>
                        <Typography variant="subtitle1">Voltage Measurements</Typography>
                        <Typography>Voltage V1N: {deviceData?.device_parameters?.voltage_measurements?.voltage_v1n || '--'}</Typography>
                        <Typography>Voltage V2N: {deviceData?.device_parameters?.voltage_measurements?.voltage_v2n || '--'}</Typography>
                        <Typography>Voltage V3N: {deviceData?.device_parameters?.voltage_measurements?.voltage_v3n || '--'}</Typography>
                        <Typography>Voltage V12: {deviceData?.device_parameters?.voltage_measurements?.voltage_v12 || '--'}</Typography>
                        <Typography>Voltage V23: {deviceData?.device_parameters?.voltage_measurements?.voltage_v23 || '--'}</Typography>
                        <Typography>Voltage V31: {deviceData?.device_parameters?.voltage_measurements?.voltage_v31 || '--'}</Typography>
                        <Typography>Current I1: {deviceData?.device_parameters?.voltage_measurements?.current_i1 || '--'}</Typography>
                        <Typography>Current I2: {deviceData?.device_parameters?.voltage_measurements?.current_i2 || '--'}</Typography>
                        <Typography>Current I3: {deviceData?.device_parameters?.voltage_measurements?.current_i3 || '--'}</Typography>
                        <Typography>Average Voltage LN: {deviceData?.device_parameters?.voltage_measurements?.average_voltage_ln || '--'}</Typography>
                        <Typography>Average Voltage LL: {deviceData?.device_parameters?.voltage_measurements?.average_voltage_ll || '--'}</Typography>
                        <Typography>Average Current: {deviceData?.device_parameters?.voltage_measurements?.average_current || '--'}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ padding: 2 }}>
                        <Typography variant="subtitle1">Power Measurements</Typography>
                        <Typography>kW1: {deviceData?.device_parameters?.power_measurements?.kw1 || '--'}</Typography>
                        <Typography>kW2: {deviceData?.device_parameters?.power_measurements?.kw2 || '--'}</Typography>
                        <Typography>kW3: {deviceData?.device_parameters?.power_measurements?.kw3 || '--'}</Typography>
                        <Typography>Total kW: {deviceData?.device_parameters?.power_measurements?.total_kw || '--'}</Typography>
                        <Typography>kVA1: {deviceData?.device_parameters?.power_measurements?.kva1 || '--'}</Typography>
                        <Typography>kVA2: {deviceData?.device_parameters?.power_measurements?.kva2 || '--'}</Typography>
                        <Typography>kVA3: {deviceData?.device_parameters?.power_measurements?.kva3 || '--'}</Typography>
                        <Typography>Total kVA: {deviceData?.device_parameters?.power_measurements?.total_kva || '--'}</Typography>
                        <Typography>kVAr1: {deviceData?.device_parameters?.power_measurements?.kvar1 || '--'}</Typography>
                        <Typography>kVAr2: {deviceData?.device_parameters?.power_measurements?.kvar2 || '--'}</Typography>
                        <Typography>kVAr3: {deviceData?.device_parameters?.power_measurements?.kvar3 || '--'}</Typography>
                        <Typography>Total kVAr: {deviceData?.device_parameters?.power_measurements?.total_kvar || '--'}</Typography>
                        <Typography>PF1: {deviceData?.device_parameters?.power_measurements?.pf1 || '--'}</Typography>
                        <Typography>PF2: {deviceData?.device_parameters?.power_measurements?.pf2 || '--'}</Typography>
                        <Typography>PF3: {deviceData?.device_parameters?.power_measurements?.pf3 || '--'}</Typography>
                        <Typography>Average PF: {deviceData?.average_pf || '--'}</Typography>
                        <Typography>kWh: {deviceData?.device_parameters?.power_measurements?.kwh || '--'}</Typography>
                        <Typography>kVAh: {deviceData?.device_parameters?.power_measurements?.kvah || '--'}</Typography>
                        <Typography>kVArh: {deviceData?.device_parameters?.power_measurements?.kvarh || '--'}</Typography>
                        <Typography>Temperature: {deviceData?.device_parameters?.power_measurements?.temperature || '--'}</Typography>
                        <Typography>Frequency: {deviceData?.device_parameters?.power_measurements?.frequency || '--'}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ padding: 2 }}>
                        <Typography variant="subtitle1">Errors</Typography>
                        <Typography>No Voltage Error: {deviceData?.device_parameters?.errors?.no_voltage_error || '--'}</Typography>
                        <Typography>Under Voltage Error: {deviceData?.device_parameters?.errors?.under_voltage_error || '--'}</Typography>
                        <Typography>Over Voltage Error: {deviceData?.device_parameters?.errors?.over_voltage_error || '--'}</Typography>
                        <Typography>THD I Error: {deviceData?.device_parameters?.errors?.thd_i_error || '--'}</Typography>
                        <Typography>Temperature Error: {deviceData?.device_parameters?.errors?.temperature_error || '--'}</Typography>
                        <Typography>Over Compensate Error: {deviceData?.device_parameters?.errors?.over_compensate_error || '--'}</Typography>
                        <Typography>Under Compensate Error: {deviceData?.device_parameters?.errors?.under_compensate_error || '--'}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ padding: 2 }}>
                        <Typography variant="subtitle1">Relay Status</Typography>
                        <Typography>Relay 1: {deviceData?.device_parameters?.relay_status?.relay1 || '--'}</Typography>
                        <Typography>Relay 2: {deviceData?.device_parameters?.relay_status?.relay2 || '--'}</Typography>
                        <Typography>Relay 3: {deviceData?.device_parameters?.relay_status?.relay3 || '--'}</Typography>
                        <Typography>Relay 4: {deviceData?.device_parameters?.relay_status?.relay4 || '--'}</Typography>
                        <Typography>Relay 5: {deviceData?.device_parameters?.relay_status?.relay5 || '--'}</Typography>
                        <Typography>Relay 6: {deviceData?.device_parameters?.relay_status?.relay6 || '--'}</Typography>
                        <Typography>Relay 7: {deviceData?.device_parameters?.relay_status?.relay7 || '--'}</Typography>
                        <Typography>Relay 8: {deviceData?.device_parameters?.relay_status?.relay8 || '--'}</Typography>
                        <Typography>Relay 9: {deviceData?.device_parameters?.relay_status?.relay9 || '--'}</Typography>
                        <Typography>Relay 10: {deviceData?.device_parameters?.relay_status?.relay10 || '--'}</Typography>
                        <Typography>Relay 11: {deviceData?.device_parameters?.relay_status?.relay11 || '--'}</Typography>
                        <Typography>Relay 12: {deviceData?.device_parameters?.relay_status?.relay12 || '--'}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ padding: 2 }}>
                        <Typography variant="subtitle1">Bank Values</Typography>
                        <Typography>Bank 1: {deviceData?.device_parameters?.bank_values?.bank1 || '--'}</Typography>
                        <Typography>Bank 2: {deviceData?.device_parameters?.bank_values?.bank2 || '--'}</Typography>
                        <Typography>Bank 3: {deviceData?.device_parameters?.bank_values?.bank3 || '--'}</Typography>
                        <Typography>Bank 4: {deviceData?.device_parameters?.bank_values?.bank4 || '--'}</Typography>
                        <Typography>Bank 5: {deviceData?.device_parameters?.bank_values?.bank5 || '--'}</Typography>
                        <Typography>Bank 6: {deviceData?.device_parameters?.bank_values?.bank6 || '--'}</Typography>
                        <Typography>Bank 7: {deviceData?.device_parameters?.bank_values?.bank7 || '--'}</Typography>
                        <Typography>Bank 8: {deviceData?.device_parameters?.bank_values?.bank8 || '--'}</Typography>
                        <Typography>Bank 9: {deviceData?.device_parameters?.bank_values?.bank9 || '--'}</Typography>
                        <Typography>Bank 10: {deviceData?.device_parameters?.bank_values?.bank10 || '--'}</Typography>
                        <Typography>Bank 11: {deviceData?.device_parameters?.bank_values?.bank11 || '--'}</Typography>
                        <Typography>Bank 12: {deviceData?.device_parameters?.bank_values?.bank12 || '--'}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper sx={{ padding: 2 }}>
                        <Typography variant="subtitle1">Total Harmonic Distortion (THD)</Typography>
                        <Typography>THD of Voltage V1N: {deviceData?.device_parameters?.total_harmonic_distortion?.thd_voltage_v1n || '--'}</Typography>
                        <Typography>THD of Voltage V2N: {deviceData?.device_parameters?.total_harmonic_distortion?.thd_voltage_v2n || '--'}</Typography>
                        <Typography>THD of Voltage V3N: {deviceData?.device_parameters?.total_harmonic_distortion?.thd_voltage_v3n || '--'}</Typography>
                        <Typography>THD of Voltage V12: {deviceData?.device_parameters?.total_harmonic_distortion?.thd_voltage_v12 || '--'}</Typography>
                        <Typography>THD of Voltage V23: {deviceData?.device_parameters?.total_harmonic_distortion?.thd_voltage_v23 || '--'}</Typography>
                        <Typography>THD of Voltage V31: {deviceData?.device_parameters?.total_harmonic_distortion?.thd_voltage_v31 || '--'}</Typography>
                        <Typography>THD of Current I1: {deviceData?.device_parameters?.total_harmonic_distortion?.thd_current_i1 || '--'}</Typography>
                        <Typography>THD of Current I2: {deviceData?.device_parameters?.total_harmonic_distortion?.thd_current_i2 || '--'}</Typography>
                        <Typography>THD of Current #3: {deviceData?.device_parameters?.total_harmonic_distortion?.thd_current_i3 || '--'}</Typography>
                    </Paper>
                </Grid>
            </Grid>
            <LoadingComponent loading={loading} />
        </div>
    );
}
export default SingleDeviceView;
