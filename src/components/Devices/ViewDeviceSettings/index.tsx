import React, { useEffect, useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Avatar,

} from "@mui/material";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import {
  getfanDeviceSettingsAPI,
  getLevel1DeviceSettingsAPI,
  getLevel2DeviceSettingsAPI,
  getLevel3DeviceSettingsAPI,
  getSigleDeviceAPI,
  updateDevicePasswordAPI,
} from "@/services/devicesAPIs";
import Level1Settings from "./Level1Settings";
import Level2Settings from "./Level2Settings";
import Level3Settings from "./Level3Settings";
import Level4Settings from "./Level4Settings";
import LoadingComponent from "@/components/Core/LoadingComponent";
import { useDispatch, useSelector } from "react-redux";
import { setSingleDevice } from "@/redux/Modules/userlogin";
import Image from "next/image";
import { capitalizeFirstTwoWords } from "@/lib/helpers/nameFormate";
import { toast, Toaster } from "sonner";

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
        <Box className="tab-content">
          {children}
        </Box>
      )}
    </div>
  );
}

const SingleDeviceSettings = () => {
  const [value, setValue] = useState(0);
  const router = useRouter();
  const pathName = usePathname();

  const deviceName = useSelector(
    (state: any) => state?.auth?.singleDevice
  );

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
    router.replace(`${pathName}?state=Level${newValue + 1}`);
  };

  const { id } = useParams();
  const params = useSearchParams();
  const dispatch = useDispatch();

  const [selectedStep, setSelectedStep] = useState<any>("Level1");
  const [loading, setLoading] = useState<boolean>(false);
  const [levelBasedData, setLevelBasedData] = useState<any>({});
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);

  const getLevelBasedAPI = () => {
    let responseData: any;

    if (params.get("state") == "Level1") {
      responseData = getLevel1DeviceSettingsAPI(id);
    }
    if (params.get("state") == "Level2") {
      responseData = getLevel2DeviceSettingsAPI(id);
    }
    if (params.get("state") == "Level3") {
      responseData = getLevel3DeviceSettingsAPI(id);
    }
    if (params.get("state") == "Level4") {
      responseData = getfanDeviceSettingsAPI(id);
    }
    return responseData;
  };

  const getLevelBasedDeviceDetails = async () => {
    setLoading(true);
    try {
      const response = await getLevelBasedAPI();
      if (response?.status == 200 || response?.status == 201) {
        setLevelBasedData(response?.data);
        setPassword(response?.data?.password);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const [deviceData, setDeviceData] = useState<any>({});

  const getPatientResults = async () => {
    setLoading(true);
    try {
      const response = await getSigleDeviceAPI(id);
      setDeviceData(response?.data);
      dispatch(setSingleDevice(response?.data));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateDevicePassword = async () => {
    setLoading(true);
    try {
      const payload = {
        password: password,
      };
      let response: any = await updateDevicePasswordAPI(payload, id);

      if (response.success) {
        toast.success(response.message);
        getLevelBasedDeviceDetails();
        closeDialog();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPatientResults();
  }, []);

  useEffect(() => {
    getLevelBasedDeviceDetails();
  }, [params]);

  const openDialog = () => {
    setOpen(true);
  }

  const closeDialog = () => {
    setOpen(false)
  }

  return (
    <div id="viewSettings">

      <div className="headerBlock" >
        <Tabs
          className="levelTabs"
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Level1" className="tabBtn" />
          <Tab label="Level2" className="tabBtn" />
          <Tab label="Level3" className="tabBtn" />
          <Tab label="Fan Settings" className="tabBtn" />
        </Tabs>
        <div className="userInfo">
          {deviceName?.user_full_name ? (
            <div className="userProfile">
              <Avatar alt="Aasia Ramanathan" sx={{ bgcolor: "#FF7A00", width: "30px", height: "30px" }} >
                {deviceName?.user_full_name?.[0].toUpperCase() || "--"}
              </Avatar>
              <Typography variant="h6">
                {capitalizeFirstTwoWords(deviceName?.user_full_name) ||
                  "--"}
              </Typography>
            </div>
          ) : (
            ""
          )}
          <div className="status">
            {deviceName?.status == "ACTIVE" ?
              <Image alt="" src="/devices/icondot-online.svg" width={8} height={8} /> : <Image alt="" src="/devices/icondot-offline.svg" width={8} height={8} />}

            <Typography className={deviceName?.status == "ACTIVE" ? "active" : "inactive"} >{deviceName?.status == "ACTIVE" ? "Active" : "Inactive"}</Typography>
          </div>
          <div className="backBtn editbtn"
            title="Edit Device"
            style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
            onClick={() => {
              router.push(`/devices/${id}/update-settings?state=${params.get("state")}`)
            }}
          >
            <Image
              alt=""
              src="/edit-user.svg"
              width={10}
              height={10}

            />
            <span>Edit</span>
          </div>
        </div>
      </div>
      <TabPanel value={value} index={0}>
        <Level1Settings
          levelBasedData={levelBasedData}
          setLevelBasedData={setLevelBasedData}
          password={password}
          setPassword={setPassword}
          updateDevicePassword={updateDevicePassword}
          openDialog={openDialog}
          closeDialog={closeDialog}
          open={open}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Level2Settings levelBasedData={levelBasedData} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Level3Settings levelBasedData={levelBasedData} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Level4Settings levelBasedData={levelBasedData} />
      </TabPanel>

      <LoadingComponent loading={loading} />
      <Toaster richColors closeButton position="top-right" />
    </div>
  );
};
export default SingleDeviceSettings;
