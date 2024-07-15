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
} from "@/services/devicesAPIs";
import Level1Settings from "./Level1Settings";
import Level2Settings from "./Level2Settings";
import Level3Settings from "./Level3Settings";
import Level4Settings from "./Level4Settings";
import LoadingComponent from "@/components/Core/LoadingComponent";
import Image from "next/image";

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

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
    router.push(`${pathName}?state=Level${newValue + 1}`);
  };

  const { id } = useParams();
  const params = useSearchParams();

  const [selectedStep, setSelectedStep] = useState<any>("Level1");
  const [loading, setLoading] = useState<boolean>(false);
  const [levelBasedData, setLevelBasedData] = useState<any>({});

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
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLevelBasedDeviceDetails();
  }, [params]);

  return (
    <div id="viewSettings">

      <div className="headerBlock" >
        <Tabs
          className="levelTabs"
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Level1"  className="tabBtn"/>
          <Tab label="Level2" className="tabBtn" />
          <Tab label="Level3" className="tabBtn" />
          <Tab label="Fan Settings" className="tabBtn" />
        </Tabs>
        <div className="userInfo">
          <div className="userProfile">
            <Avatar alt="Aasia Ramanathan" sx={{ bgcolor: "#FF7A00", width: "30px", height: "30px" }} />
            <Typography variant="h6">Aasia Ramanathan</Typography>
          </div>
          <div className="status">
            <Image alt="" src="/Completed-icon.svg" width={13} height={13} />

            <Typography >Active</Typography>
          </div>
        </div>
      </div>
      <TabPanel value={value} index={0}>
        <Level1Settings
          levelBasedData={levelBasedData}
          setLevelBasedData={setLevelBasedData}
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
    </div>
  );
};
export default SingleDeviceSettings;
