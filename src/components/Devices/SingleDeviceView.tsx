"use client";
import { getSigleDeviceAPI } from "@/services/devicesAPIs";
import { useEffect, useState } from "react";
import LoadingComponent from "../Core/LoadingComponent";
import { Grid, Typography, Paper, Button } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { capitalizeFirstTwoWords } from "@/lib/helpers/nameFormate";

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
  console.log(deviceData, "Fsdijweiewi");
  return (
    <div id="deviceViewPage">
      <Button
        variant="outlined"
        className="backBtn"
        sx={{ alignSelf: "flex-start", mb: 2 }}
        onClick={() => router.back()}
        startIcon={
          <Image src="/users/back-icon.svg" alt="" width={13} height={13} />
        }
      >
        Back
      </Button>
      <div className="deviceinfo">
        <Typography className="deviceName">
          {deviceData?.device_name || "--"}
        </Typography>
        <Typography className="deviceNum">
          Device Number:{" "}
          <span className="deviceName">{deviceData?.device_id || "--"}</span>{" "}
        </Typography>
      </div>
      <Grid container spacing={2} className="deviceInfoContainer">
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Paper className="eachDetailsCard">
                <div className="cardHeader">
                  <Typography variant="h6">Voltage Measurements</Typography>
                </div>
                <div className="cardBody">
                  {Object?.keys(deviceData)?.length &&
                  deviceData?.voltage_measurements !== null
                    ? Object?.keys(deviceData?.voltage_measurements)?.map(
                        (item, index) => (
                          <div className="eachBodyInfo" key={index}>
                            <label>{item}</label>
                            <Typography>
                              {" "}
                              {deviceData?.voltage_measurements[item] || "--"}
                            </Typography>
                          </div>
                        )
                      )
                    : "No Data"}
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} md={12}>
              <Paper className="eachDetailsCard">
                <div className="cardHeader">
                  <Typography variant="h6">Errors</Typography>
                </div>
                <div className="cardBody">
                  {Object?.keys(deviceData)?.length &&
                  deviceData?.errors !== null
                    ? Object?.keys(deviceData?.errors).map((item, index) => (
                        <div className="eachBodyInfo" key={index}>
                          <label>{item}</label>

                          <Typography>
                            {" "}
                            {deviceData?.errors[item] === true
                              ? "Error"
                              : "" || "--"}
                          </Typography>
                        </div>
                      ))
                    : "No Data"}
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className="eachDetailsCard">
            <div className="cardHeader">
              <Typography variant="h6">Power Measurements</Typography>
            </div>
            <div className="cardBody">
              {Object?.keys(deviceData)?.length &&
              deviceData?.power_measurements !== null
                ? Object?.keys(deviceData?.power_measurements).map(
                    (item, index) => (
                      <div className="eachBodyInfo" key={index}>
                        <label>{item}</label>

                        <Typography>
                          {deviceData?.power_measurements[item] || "--"}
                        </Typography>
                      </div>
                    )
                  )
                : "No Data"}
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className="eachDetailsCard">
            <div className="cardHeader">
              <Typography variant="h6">Relay Status</Typography>
            </div>
            <div className="cardBody">
              {Object?.keys(deviceData)?.length &&
              deviceData?.relay_status !== null
                ? Object?.keys(deviceData?.relay_status).map((item, index) => (
                    <div className="eachBodyInfo" key={index}>
                      <label>{item}</label>

                      <Typography>
                        {" "}
                        {deviceData?.relay_status[item] || "--"}
                      </Typography>
                    </div>
                  ))
                : "No Data"}
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className="eachDetailsCard">
            <div className="cardHeader">
              <Typography variant="h6">Bank Values</Typography>
            </div>
            <div className="cardBody">
              {Object?.keys(deviceData)?.length &&
              deviceData?.bank_values !== null
                ? Object?.keys(deviceData?.bank_values).map((item, index) => (
                    <div className="eachBodyInfo" key={index}>
                      <label>{item}</label>

                      <Typography>
                        {" "}
                        {deviceData?.bank_values[item] || "--"}
                      </Typography>
                    </div>
                  ))
                : "No Data"}
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className="eachDetailsCard">
            <div className="cardHeader">
              <Typography variant="h6">
                Total Harmonic Distortion (THD)
              </Typography>
            </div>
            <div className="cardBody">
              {Object?.keys(deviceData)?.length &&
              deviceData?.total_harmonic_distortion !== null
                ? Object?.keys(deviceData?.total_harmonic_distortion).map(
                    (item, index) => (
                      <div className="eachBodyInfo" key={index}>
                        <label>{item}</label>

                        <Typography>
                          {" "}
                          {deviceData?.total_harmonic_distortion[item] || "--"}
                        </Typography>
                      </div>
                    )
                  )
                : "No Data"}
            </div>
          </Paper>
        </Grid>
      </Grid>
      <LoadingComponent loading={loading} />
    </div>
  );
};
export default SingleDeviceView;
