"use client";
import { getSigleDeviceAPI } from "@/services/devicesAPIs";
import { useEffect, useState } from "react";
import LoadingComponent from "../Core/LoadingComponent";
import {
  Grid,
  Typography,
  Paper,
  Box,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setSingleDevice } from "@/redux/Modules/userlogin";
import Image from "next/image";
import ActivityGraph from "./ActivityGraph";
import TotalKWCard from "./DeviceParameterWiseDetails/TotalKWCard";

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
  const params = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [deviceData, setDeviceData] = useState<any>({});
  const [value, setValue] = useState(0);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

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
    return text
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char: string) => char.toUpperCase());
  };

  const capitalize = (text: any) => {
    // Convert "Relay1" to "Relay 1" and "Bank1" to "Bank 1"
    const spacedText = text.replace(/(\D)(\d)/g, "$1 $2");
    return spacedText
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char: string) => char.toUpperCase());
  };

  const firstRowHeight = "100%";
  console.log(deviceData, "deviceData");
  return (
    <div id="deviceViewPage">
      <div className="headerBlock">
        <Tabs
          className="levelTabs"
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Device Details" className="tabBtn" />
          <Tab label="Activity" className="tabBtn" />
        </Tabs>
      </div>

      <TabPanel value={value} index={0}>
        <div className="deviceinfo">
          <Typography className="deviceNum">
            Device Number:
            <span className="deviceName">
              {deviceData?.device_serial_number || "--"}
            </span>{" "}
          </Typography>
        </div>
        <Grid container spacing={2} className="deviceInfoContainer">
          <Grid
            item
            xs={12}
            md={6}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Grid container spacing={2} style={{ flex: 1 }}>
              <Grid item xs={12} sm={6} md={4}>
                <TotalKWCard />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TotalKWCard />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TotalKWCard />
              </Grid>
            </Grid>

            <Grid container spacing={2} style={{ flex: 1 }}>
              <Grid item xs={12} sm={6} md={4}>
                <TotalKWCard />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TotalKWCard />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TotalKWCard />
              </Grid>
            </Grid>

            <Grid container spacing={2} style={{ flex: 1 }}>
              <Grid item xs={12} sm={6} md={4}>
                <TotalKWCard />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TotalKWCard />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TotalKWCard />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6} style={{ display: "flex" }}>
            <Paper className="eachDetailsCard" style={{ flex: 1 }}>
              <div className="cardHeader">
                <Typography variant="h6">Errors</Typography>
              </div>
              <div className="cardBody">
                <div className="eachBodyInfo">
                  <label>No voltage error</label>
                  <Typography>
                    {deviceData?.no_voltage === 1 ? "No error" : "Error"}
                  </Typography>
                </div>
                <div className="eachBodyInfo">
                  <label>Under voltage error</label>
                  <Typography>
                    {deviceData?.under_voltage === 1 ? "No error" : "Error"}
                  </Typography>
                </div>

                <div className="eachBodyInfo">
                  <label>Over voltage error</label>
                  <Typography>
                    {deviceData?.over_voltage === 1 ? "No error" : "Error"}
                  </Typography>
                </div>

                <div className="eachBodyInfo">
                  <label>THID I error</label>
                  <Typography>
                    {deviceData?.thdi === 1 ? "No error" : "Error"}
                  </Typography>
                </div>

                <div className="eachBodyInfo">
                  <label>Temperature error</label>
                  <Typography>
                    {deviceData?.thdi === 1 ? "No error" : "Error"}
                  </Typography>
                </div>

                <div className="eachBodyInfo">
                  <label>Under compensate error</label>
                  <Typography>
                    {deviceData?.thdi === 1 ? "No error" : "Error"}
                  </Typography>
                </div>
              </div>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper className="eachDetailsCard">
              <div className="cardHeader">
                <Typography variant="h6">Relay Status</Typography>
              </div>
              <div className="cardBody">
                {Array.from({ length: 8 }, (_, index) => {
                  const relayKey = `relay${index + 1}`;
                  const relayStatus = deviceData?.[relayKey];

                  return (
                    <div className="eachBodyInfo" key={index}>
                      <label>{`Relay ${index + 1}`}</label>
                      <Typography
                        className={relayStatus === 1 ? "radioOn" : "radioOff"}
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
                <Typography variant="h6">Bank Values</Typography>
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
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ActivityGraph />
      </TabPanel>
      <LoadingComponent loading={loading} />
    </div>
  );
};
export default SingleDeviceView;
