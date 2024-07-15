"use client";
import { getSigleDeviceAPI } from "@/services/devicesAPIs";
import { useEffect, useState } from "react";
import LoadingComponent from "../Core/LoadingComponent";
import { Grid, Typography, Paper, Box } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setSingleDevice } from "@/redux/Modules/userlogin";

const SingleDeviceView = () => {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [deviceData, setDeviceData] = useState<any>({});

  const getPatientResults = async () => {
    setLoading(true);
    try {
      const response = await getSigleDeviceAPI(params?.id);
      setDeviceData(response?.data);
      dispatch(setSingleDevice(response?.data));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPatientResults();
  }, []);
 
  const firstRowHeight = '100%';
  return (
    <div id="deviceViewPage">
      <div className="deviceinfo">
        <Typography className="deviceNum">
          Device Number:{" "}
          <span className="deviceName">{deviceData?.device_id || "--"}</span>{" "}
        </Typography>
      </div>
      <Grid container spacing={2} className="deviceInfoContainer">
        <Grid item xs={12} md={6} style={{ display: 'flex', flexDirection: 'column' }}>
          <Grid container spacing={2} style={{ flex: 1 }}>
            <Grid item xs={12} md={12}>
              <Paper className="eachDetailsCard" style={{ height: firstRowHeight }}>
                <div className="cardHeader">
                  <Typography variant="h6">Voltage Measurements</Typography>
                </div>
                {Object.keys(deviceData).length && deviceData.voltage_measurements !== null ? (
                  <div className="cardBody">
                    {Object.keys(deviceData.voltage_measurements).map((item, index) => (
                      <div className="eachBodyInfo" key={index}>
                        <label>{item}</label>
                        <Typography>
                          {deviceData.voltage_measurements[item] || "--"}
                        </Typography>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="noData">No Data</div>
                )}

              </Paper>
            </Grid>
            <Grid item xs={12} md={12}>
              <Paper className="eachDetailsCard" style={{ height: firstRowHeight }}>


                <div className="cardHeader">
                  <Typography variant="h6">Errors</Typography>
                </div>
                {Object.keys(deviceData).length && deviceData.errors !== null ? (
                  <div className="cardBody">
                    {Object.keys(deviceData.errors).map((item, index) => (
                      <div className="eachBodyInfo" key={index}>
                        <label>{item}</label>
                        <Typography>

                          {deviceData?.errors[item] === true
                            ? "Error"
                            : "" || "--"}
                        </Typography>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="noData">No Data</div>
                )}

              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} style={{ display: 'flex' }}>
          <Paper className="eachDetailsCard" style={{ flex: 1 }}>
            <div className="cardHeader">
              <Typography variant="h6">Power Measurements</Typography>
            </div>

            {Object.keys(deviceData).length && deviceData.power_measurements !== null ? (
              <div className="cardBody">
                {Object.keys(deviceData.power_measurements).map((item, index) => (
                  <div className="eachBodyInfo" key={index}>
                    <label>{item}</label>
                    <Typography>

                      {deviceData?.power_measurements[item] === true
                        ? "Error"
                        : "" || "--"}
                    </Typography>
                  </div>
                ))}
              </div>
            ) : (
              <div className="noData">No Data</div>
            )}


          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className="eachDetailsCard">
            <div className="cardHeader">
              <Typography variant="h6">Relay Status</Typography>
            </div>

            {Object.keys(deviceData).length && deviceData.relay_status !== null ? (
              <div className="cardBody">
                {Object.keys(deviceData.relay_status).map((item, index) => (
                  <div className="eachBodyInfo" key={index}>
                    <label>{item}</label>
                    <Typography>

                      {deviceData?.relay_status[item] === true
                        ? "Error"
                        : "" || "--"}
                    </Typography>
                  </div>
                ))}
              </div>
            ) : (
              <div className="noData">No Data</div>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className="eachDetailsCard">
            <div className="cardHeader">
              <Typography variant="h6">Bank Values</Typography>
            </div>

            {Object.keys(deviceData).length && deviceData.bank_values !== null ? (
              <div className="cardBody">
                {Object.keys(deviceData.bank_values).map((item, index) => (
                  <div className="eachBodyInfo" key={index}>
                    <label>{item}</label>
                    <Typography>

                      {deviceData?.bank_values[item] === true
                        ? "Error"
                        : "" || "--"}
                    </Typography>
                  </div>
                ))}
              </div>
            ) : (
              <div className="noData">No Data</div>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className="eachDetailsCard">
            <div className="cardHeader">
              <Typography variant="h6">
                Total Harmonic Distortion (THD)
              </Typography>
            </div>

            {Object.keys(deviceData).length && deviceData.total_harmonic_distortion !== null ? (
              <div className="cardBody">
                {Object.keys(deviceData.total_harmonic_distortion).map((item, index) => (
                  <div className="eachBodyInfo" key={index}>
                    <label>{item}</label>
                    <Typography>

                      {deviceData?.total_harmonic_distortion[item] === true
                        ? "Error"
                        : "" || "--"}
                    </Typography>
                  </div>
                ))}
              </div>
            ) : (
              <div className="noData">No Data</div>
            )}
          </Paper>
        </Grid>
      </Grid>
      <LoadingComponent loading={loading} />
    </div>
  );
};
export default SingleDeviceView;
