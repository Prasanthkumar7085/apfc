"use client";
import formatDate from "@/lib/helpers/formatDate";
import { getSigleDeviceAPI } from "@/services/devicesAPIs";
import { Box, Grid, Paper, Tab, Tabs, Typography } from "@mui/material";
import Image from "next/image";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "rsuite";
import LoadingComponent from "../Core/LoadingComponent";
import ActivityGraph from "./ActivityGraph";
import TotalKWCard from "./DeviceParameterWiseDetails/TotalKWCard";
import TotalParamatersCard from "./DeviceParameterWiseDetails/TotalParamatersCard";
import { prepareURLEncodedParams } from "@/lib/prepareUrlEncodedParams";

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className="tab-content" sx={{ marginTop: "20px" }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const SingleDeviceView = () => {
  const params: any = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const paramsValues = useSearchParams();
  const path = usePathname();
  const [loading, setLoading] = useState(false);
  const [deviceData, setDeviceData] = useState<any>({});
  const [value, setValue] = useState(
    paramsValues?.get("tab") == "activity" ? 1 : 0
  );
  const [syncTime, setSyncTime] = useState<any>();
  const [graphFunctionCall, setGraphFunctionCall] = useState<boolean>(false);
  const deviceDetails = useSelector((state: any) => state?.auth?.singleDevice);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
    let queryString = prepareURLEncodedParams("", {
      tab: newValue == 0 ? "details" : newValue == 1 ? "activity" : "",
    });
    router.push(`${path}${queryString}`);
  };

  const getSingleDevice = async () => {
    setLoading(true);
    try {
      const response = await getSigleDeviceAPI(params?.id);
      setDeviceData(response?.data);
      setSyncTime(response?.data?.updated_at);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleDevice();
    let tabValue = paramsValues?.get("tab");
    setValue(tabValue == "activity" ? 1 : 0);
  }, []);

  return (
    <div id="deviceViewPage">
      <div
        className="headerBlock"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Tabs
          className="levelTabs"
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label="Device Details"
            className="tabBtn"
            icon={
              <Image
                src="/devices/new/device-settings.svg"
                alt=""
                height={20}
                width={20}
              />
            }
            iconPosition="start"
          />
          <Tab
            label="Activity"
            className="tabBtn"
            icon={
              <Image
                src="/devices/new/activity.svg"
                alt=""
                height={20}
                width={20}
              />
            }
            iconPosition="start"
          />
        </Tabs>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <p>Last sync {formatDate(syncTime, "DD-MM-YYYY hh:mm a")}</p>
          <Button
            onClick={() => {
              if (value == 1) {
                setGraphFunctionCall(true);
              } else {
                getSingleDevice();
              }
            }}
          >
            Update Sync
          </Button>
        </div>
      </div>

      <TabPanel value={value} index={0}>
        {deviceData?.serial_number ? (
          <div>
            <div className="deviceinfo">
              <Typography className="deviceNum">
                Device Serial Number :{" "}
                <span className="deviceName">
                  {deviceDetails?.device_serial_number || "--"}
                </span>
              </Typography>
            </div>
            <Grid container spacing={2} className="deviceInfoContainer">
              <Grid
                item
                xs={12}
                md={9}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Grid
                  container
                  spacing={2}
                  style={{ flex: 1, marginBottom: "20px" }}
                >
                  <Grid item xs={12} sm={6} md={4}>
                    <TotalKWCard
                      cardimage={"/devices/new/value/total-kw.svg"}
                      mainDetials={["Total KW", deviceData?.total_kw]}
                      subDetails={{
                        kW1: deviceData?.kw1,
                        kW2: deviceData?.kw2,
                        kW3: deviceData?.kw3,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TotalKWCard
                      cardimage={"/devices/new/value/avarage-pf.svg"}
                      mainDetials={["Average PF", deviceData?.average_pf]}
                      subDetails={{
                        PF1: deviceData?.pf1,
                        PF2: deviceData?.pf2,
                        PF3: deviceData?.pf3,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TotalKWCard
                      cardimage={"/devices/new/value/temparature.svg"}
                      mainDetials={["Temperature", deviceData?.temperature]}
                      subDetails={["Frequency", deviceData?.frequency]}
                    />
                  </Grid>
                </Grid>

                <Grid
                  container
                  spacing={2}
                  style={{ flex: 1, marginBottom: "20px" }}
                >
                  <Grid item xs={12}>
                    <div className="blockHeading">
                      <Image
                        src="/devices/new/value/voltage-mesurement.svg"
                        alt=""
                        height={15}
                        width={15}
                      />
                      <span>Voltage Measurements</span>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TotalKWCard
                      cardimage={"/devices/new/value/voltage-lv.svg"}
                      mainDetials={[
                        "Average Voltage LN",
                        deviceData?.average_voltage_ln,
                      ]}
                      subDetails={{
                        "Voltage V1N": deviceData?.voltage_v1n,
                        "Voltage V2N": deviceData?.voltage_v2n,
                        "Voltage V3N": deviceData?.voltage_v3n,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TotalKWCard
                      cardimage={"/devices/new/value/voltage-ll.svg"}
                      mainDetials={[
                        "Average Voltage LL",
                        deviceData?.average_voltage_ll,
                      ]}
                      subDetails={{
                        "Voltage V12": deviceData?.voltage_v12,
                        "Voltage V23": deviceData?.voltage_v23,
                        "Voltage V31": deviceData?.voltage_v31,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TotalKWCard
                      cardimage={"/devices/new/value/avarage-current.svg"}
                      mainDetials={[
                        "Average Current",
                        deviceData?.average_current,
                      ]}
                      subDetails={{
                        "Current I1": deviceData?.current_i1,
                        "Current I2": deviceData?.current_i2,
                        "Current I3": deviceData?.current_i3,
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2} style={{ flex: 1 }}>
                  <Grid item xs={12}>
                    <div className="blockHeading">
                      <Image
                        src="/devices/new/value/power-messure.svg"
                        alt=""
                        height={15}
                        width={15}
                      />
                      <span>Power measurements</span>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TotalKWCard
                      cardimage={"/devices/new/value/avarage-kva.svg"}
                      mainDetials={["Average kVA", deviceData?.total_kva]}
                      subDetails={{
                        kVA1: deviceData?.kva1,
                        kVA2: deviceData?.kva2,
                        kVA3: deviceData?.kva3,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TotalKWCard
                      cardimage={"/devices/new/value/total-kva.svg"}
                      mainDetials={["Total kVAr", deviceData?.total_kvar]}
                      subDetails={{
                        kVAr1: deviceData?.kvar1,
                        kVAr2: deviceData?.kvar2,
                        kVAr3: deviceData?.kvar3,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TotalParamatersCard deviceDetails={deviceData} />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} md={3} style={{ display: "flex" }}>
                <Paper
                  className="eachDetailsCard errorsCard"
                  style={{ flex: 1 }}
                >
                  <div className="cardHeader">
                    <Typography variant="h6">
                      <Image
                        src="/devices/new/value/errors.svg"
                        alt=""
                        height={15}
                        width={15}
                      />
                      <span>Errors</span>
                    </Typography>
                  </div>

                  <div className="cardBody">
                    <div className="eachBodyInfo">
                      <label>No voltage error</label>
                      <Typography
                        className={
                          deviceData?.no_voltage === 1 ? "errorText" : ""
                        }
                      >
                        {deviceData?.no_voltage === 0 ? "No Error" : "Error"}
                      </Typography>
                    </div>
                    <div className="eachBodyInfo">
                      <label>Under voltage error</label>
                      <Typography
                        className={
                          deviceData?.under_voltage === 1 ? "errorText" : ""
                        }
                      >
                        {deviceData?.under_voltage === 0 ? "No Error" : "Error"}
                      </Typography>
                    </div>

                    <div className="eachBodyInfo">
                      <label>Over voltage error</label>
                      <Typography
                        className={
                          deviceData?.over_voltage === 1 ? "errorText" : ""
                        }
                      >
                        {deviceData?.over_voltage === 0 ? "No Error" : "Error"}
                      </Typography>
                    </div>

                    <div className="eachBodyInfo">
                      <label>THID I error</label>
                      <Typography
                        className={deviceData?.thdi === 1 ? "errorText" : ""}
                      >
                        {deviceData?.thdi === 0 ? "No Error" : "Error"}
                      </Typography>
                    </div>

                    <div className="eachBodyInfo">
                      <label>Temperature error</label>
                      <Typography
                        className={
                          deviceData?.over_temperature === 1 ? "errorText" : ""
                        }
                      >
                        {deviceData?.over_temperature === 0
                          ? "No Error"
                          : "Error"}
                      </Typography>
                    </div>

                    <div className="eachBodyInfo">
                      <label>Under compensate error</label>
                      <Typography
                        className={
                          deviceData?.under_compensation === 1
                            ? "errorText"
                            : ""
                        }
                      >
                        {deviceData?.under_compensation === 0
                          ? "No Error"
                          : "Error"}
                      </Typography>
                    </div>
                  </div>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper className="eachDetailsCard">
                  <div className="cardHeader">
                    <Typography variant="h6">
                      <Image
                        src="/devices/new/value/relay-status.svg"
                        alt=""
                        height={15}
                        width={15}
                      />
                      <span>Relay Status</span>
                    </Typography>
                  </div>
                  <div className="cardBody">
                    {Array.from({ length: 14 }, (_, index) => {
                      const relayKey = `relay${index + 1}`;
                      const relayStatus = deviceData?.[relayKey];

                      return (
                        <div className="eachBodyInfo" key={index}>
                          <label>{`Relay ${index + 1}`}</label>
                          <Typography
                            className={
                              relayStatus === 1 ? "radioOn" : "radioOff"
                            }
                          >
                            {relayStatus === 1 ? "ON" : "OFF"}
                          </Typography>
                        </div>
                      );
                    })}
                  </div>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper className="eachDetailsCard">
                  <div className="cardHeader">
                    <Typography variant="h6">
                      <Image
                        src="/devices/new/value/bank-values.svg"
                        alt=""
                        height={15}
                        width={15}
                      />
                      <span> Bank Values</span>
                    </Typography>
                  </div>
                  <div className="cardBody">
                    {Array.from({ length: 14 }, (_, index) => {
                      const bankValue = deviceData[`bank${index + 1}`] || 0;

                      return (
                        <div className="eachBodyInfo" key={index}>
                          <label>{`Bank ${index + 1}:`}</label>
                          <Typography>{bankValue}</Typography>
                        </div>
                      );
                    })}
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </div>
        ) : (
          <div
            style={{
              width: "100%",
              display: loading ? "none" : "flex",
              justifyContent: "center",
            }}
          >
            <Image src="/no-device-image.svg" alt="" width={450} height={450} />
          </div>
        )}
      </TabPanel>

      <TabPanel value={value} index={1}>
        <ActivityGraph
          graphFunctionCall={graphFunctionCall}
          setGraphFunctionCall={setGraphFunctionCall}
          setSyncTime={setSyncTime}
        />
      </TabPanel>
      <LoadingComponent loading={loading} />
    </div>
  );
};
export default SingleDeviceView;
