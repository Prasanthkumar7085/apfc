"use client";
import { getSigleDeviceAPI } from "@/services/devicesAPIs";
import { useEffect, useState } from "react";
import LoadingComponent from "../Core/LoadingComponent";
import { Grid, Typography, Paper, Box } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setSingleDevice } from "@/redux/Modules/userlogin";
import Image from "next/image";

const SingleDeviceView = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [deviceData, setDeviceData] = useState<any>({});

  const getSingleDevice = async () => {
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
    getSingleDevice();
  }, []);

  const capitalizeAndRemoveUnderscore = (text: any) => {
    return text.replace(/_/g, ' ').replace(/\b\w/g, (char: string) => char.toUpperCase());
  };

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
                {Object?.keys(deviceData).length && deviceData?.voltage_measurements !== null ? (
                  <div className="cardBody voltageMesurement">
                    <div className="eachInnerBody">
                      <div className="eachBodyInfo">

                        <label>Voltage V1N</label>
                        <Typography>
                          {deviceData.voltage_measurements?.voltage_v1n.toFixed(2) + " " + "V" || "--"}
                        </Typography>
                      </div>
                      <div className="eachBodyInfo">

                        <label className="eachBodyInfo">Voltage V2N</label>
                        <Typography>
                          {deviceData.voltage_measurements?.voltage_v2n.toFixed(2) + " " + "V" || "--"}
                        </Typography>
                      </div>
                      <div className="eachBodyInfo">

                        <label className="eachBodyInfo">Voltage V3N</label>
                        <Typography>
                          {deviceData.voltage_measurements?.voltage_v3n.toFixed(2) + " " + "V" || "--"}
                        </Typography>
                      </div>
                      <div className="eachBodyInfo avarageBlock">
                        <label>Average Voltage LN</label>
                        <Typography>
                          {deviceData.voltage_measurements?.average_voltage_ln.toFixed(2) + " " + "V" || "--"}
                        </Typography>
                      </div>
                    </div>
                    <div className="eachInnerBody">
                      <div className="eachBodyInfo">

                        <label>Voltage V12</label>
                        <Typography>
                          {deviceData.voltage_measurements?.voltage_v12.toFixed(2) + " " + "V" || "--"}
                        </Typography>
                      </div>
                      <div className="eachBodyInfo">

                        <label>Voltage V23</label>
                        <Typography>
                          {deviceData.voltage_measurements?.voltage_v23.toFixed(2) + " " + "V" || "--"}
                        </Typography>
                      </div>
                      <div className="eachBodyInfo">

                        <label>Voltage V31</label>
                        <Typography>
                          {deviceData.voltage_measurements?.voltage_v31.toFixed(2) + " " + "V" || "--"}
                        </Typography>
                      </div>
                      <div className="eachBodyInfo avarageBlock">

                        <label>Average Voltage LL</label>
                        <Typography>
                          {deviceData.voltage_measurements?.average_voltage_ll.toFixed(2) + " " + "V" || "--"}
                        </Typography>
                      </div>
                    </div>
                    <div className="eachInnerBody">
                      <div className="eachBodyInfo">

                        <label>Current I1</label>
                        <Typography>
                          {deviceData.voltage_measurements?.current_i1.toFixed(2) + " " + "V" || "--"}
                        </Typography>
                      </div>
                      <div className="eachBodyInfo">

                        <label>Current I2</label>
                        <Typography>
                          {deviceData.voltage_measurements?.current_i2.toFixed(2) + " " + "V" || "--"}
                        </Typography>
                      </div>
                      <div className="eachBodyInfo">

                        <label>Current I3</label>
                        <Typography>
                          {deviceData.voltage_measurements?.current_i3.toFixed(2) + " " + "V" || "--"}
                        </Typography>
                      </div>
                      <div className="eachBodyInfo avarageBlock">
                        <label>Average Current</label>
                        <Typography>
                          {deviceData.voltage_measurements?.average_current.toFixed(2) + " " + "V" || "--"}
                        </Typography>
                      </div>
                    </div>
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
                {Object?.keys(deviceData)?.length && deviceData?.errors !== null ? (
                  <div className="cardBody">
                    {Object?.keys(deviceData?.errors)?.map((item, index) => (
                      <div className="eachBodyInfo" key={index}>
                        <label>{capitalizeAndRemoveUnderscore(item)}</label>
                        <Typography className={deviceData?.errors[item] === true ? "errorData" : "nonError"} >

                          {deviceData?.errors[item] === true
                            ? <Image
                              alt=""
                              src="/iconinfo.svg"
                              height={18}
                              width={18}
                            />
                            : "" || ""}
                          {deviceData?.errors[item] === true
                            ? "Error"
                            : "Error" || "--"}
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
              <div className="cardBody voltageMesurement">
                <div className="eachInnerBody">
                  <div className="eachBodyInfo">

                    <label>kW1</label>
                    <Typography>
                      {deviceData.power_measurements?.kw1.toFixed(2) + " " + "V" || "--"}
                    </Typography>
                  </div>
                  <div className="eachBodyInfo">

                    <label>kW2</label>
                    <Typography>
                      {deviceData.power_measurements?.kw2.toFixed(2) + " " + "V" || "--"}
                    </Typography>
                  </div>
                  <div className="eachBodyInfo">

                    <label>kW3</label>
                    <Typography>
                      {deviceData.power_measurements?.kw3.toFixed(2) + " " + "V" || "--"}
                    </Typography>
                  </div>
                  <div className="eachBodyInfo avarageBlock">

                    <label>Total kW</label>
                    <Typography>
                      {deviceData.power_measurements?.total_kw.toFixed(2) + " " + "V" || "--"}
                    </Typography>
                  </div>
                </div>
                <div className="eachInnerBody">
                  <div className="eachBodyInfo">

                    <label>kVA1</label>
                    <Typography>
                      {deviceData.power_measurements?.kva1.toFixed(2) + " " + "V" || "--"}
                    </Typography>
                  </div>
                  <div className="eachBodyInfo">

                    <label>kVA2</label>
                    <Typography>
                      {deviceData.power_measurements?.kva2.toFixed(2) + " " + "V" || "--"}
                    </Typography>
                  </div>
                  <div className="eachBodyInfo">
                    <label>kVA3</label>

                    <Typography>
                      {deviceData.power_measurements?.kva3.toFixed(2) + " " + "V" || "--"}
                    </Typography>
                  </div>
                  <div className="eachBodyInfo avarageBlock">

                    <label>Total kVA</label>
                    <Typography>
                      {deviceData.power_measurements?.total_kva.toFixed(2) + " " + "V" || "--"}
                    </Typography>
                  </div>
                </div>
                <div className="eachInnerBody">
                  <div className="eachBodyInfo">

                    <label>kVAr1</label>
                    <Typography>
                      {deviceData.power_measurements?.kvar1.toFixed(2) + " " + "V" || "--"}
                    </Typography>
                  </div>
                  <div className="eachBodyInfo">

                    <label>kVAr2</label>
                    <Typography>
                      {deviceData.power_measurements?.kvar2.toFixed(2) + " " + "V" || "--"}
                    </Typography>
                  </div>
                  <div className="eachBodyInfo">

                    <label>kVAr3</label>
                    <Typography>
                      {deviceData.power_measurements?.kvar3.toFixed(2) + " " + "V" || "--"}
                    </Typography>
                  </div>
                  <div className="eachBodyInfo avarageBlock">

                    <label>Total kVAr</label>
                    <Typography>
                      {deviceData.power_measurements?.total_kvar.toFixed(2) + " " + "V" || "--"}
                    </Typography>
                  </div>
                </div>
                <div className="eachInnerBody">
                  <div className="eachBodyInfo">

                    <label>PF1</label>
                    <Typography>
                      {deviceData.power_measurements?.pf1.toFixed(2) + " " + "V" || "--"}
                    </Typography>
                  </div>
                  <div className="eachBodyInfo">

                    <label>PF2</label>
                    <Typography>
                      {deviceData.power_measurements?.pf2.toFixed(2) + " " + "V" || "--"}
                    </Typography>
                  </div>
                  <div className="eachBodyInfo">

                    <label>PF3</label>
                    <Typography>
                      {deviceData.power_measurements?.pf3.toFixed(2) + " " + "V" || "--"}
                    </Typography>
                  </div>
                  <div className="eachBodyInfo avaragePfBlock">

                    <label>Average PF</label>
                    <Typography>
                      {deviceData.average_pf?.toFixed(2) + " " + "V" || "--"}
                    </Typography>
                  </div>
                </div>
                <div className="eachInnerBody">
                  <div className="eachBodyInfo">

                    <label>kWh</label>
                    <Typography>
                      {deviceData.power_measurements?.kwh.toFixed(2) + " " + "V" || "--"}
                    </Typography>
                  </div>
                  <div className="eachBodyInfo">

                    <label>kVAh</label>
                    <Typography>
                      {deviceData.power_measurements?.kvah.toFixed(2) + " " + "V" || "--"}
                    </Typography>
                  </div>
                  <div className="eachBodyInfo">

                    <label>kVArh</label>
                    <Typography>
                      {deviceData.power_measurements?.kvarh.toFixed(2) + " " + "V" || "--"}
                    </Typography>
                  </div>
                </div>
                <div className="eachInnerBody">
                  <div className="eachBodyInfo">
                    <label>Temperature</label>
                    <Typography>
                      {deviceData.power_measurements?.temperature.toFixed(2) + " " + "V" || "--"}
                    </Typography>
                  </div>
                  <div className="eachBodyInfo">
                    <label>Frequency</label>
                    <Typography>
                      {deviceData.power_measurements?.frequency.toFixed(2) + " " + "V" || "--"}
                    </Typography>
                  </div>
                </div>
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
                    <label>{capitalizeAndRemoveUnderscore(item)}</label>
                    <Typography className={deviceData?.relay_status[item] == "ON" ? "radioOn" : "radioOff"}>

                      {deviceData?.relay_status[item] || "--"}
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
                    <label>{capitalizeAndRemoveUnderscore(item)}</label>
                    <Typography>

                      {deviceData?.bank_values[item]?.toFixed(2) + " " + "Kvar" || "--"}
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
              <div className="cardBody harmonicDistortion">
                {Object.keys(deviceData.total_harmonic_distortion).map((item, index) => (
                  <div className="eachBodyInfo" key={index}>
                    <label>{capitalizeAndRemoveUnderscore(item)}</label>
                    <Typography>

                      {deviceData?.total_harmonic_distortion[item] || "--"}
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
