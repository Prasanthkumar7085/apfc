"use client";
import {
  getfanDeviceSettingsAPI,
  getLevel1DeviceSettingsAPI,
  getLevel2DeviceSettingsAPI,
  getLevel3DeviceSettingsAPI,
} from "@/services/devicesAPIs";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ArrowSteppers from "./AddDeviceSteppers";
import Level1Component from "./FormComponents/Level1Component";
import Level2Component from "./FormComponents/Level2Component";
import Level3Component from "./FormComponents/Level3Component";
import Level4Component from "./FormComponents/Level4Component";

const UpdateLevelBasedSettings = () => {
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
    <div id="settingsPage">
      <ArrowSteppers
        selectedStep={selectedStep}
        setSelectedStep={setSelectedStep}
      />
      {params?.get("state") == "Level1" ? (
        <Level1Component
          levelBasedData={levelBasedData}
          setLevelBasedData={setLevelBasedData}
          getLevelBasedDeviceDetails={getLevelBasedDeviceDetails}
        />
      ) : (
        ""
      )}
      {params?.get("state") == "Level2" ? (
        <Level2Component
          levelBasedData={levelBasedData}
          setLevelBasedData={setLevelBasedData}
          getLevelBasedDeviceDetails={getLevelBasedDeviceDetails}
        />
      ) : (
        ""
      )}
      {params?.get("state") == "Level3" ? (
        <Level3Component
          levelBasedData={levelBasedData}
          setLevelBasedData={setLevelBasedData}
          getLevelBasedDeviceDetails={getLevelBasedDeviceDetails}
        />
      ) : (
        ""
      )}
      {params?.get("state") == "Level4" ? (
        <Level4Component
          levelBasedData={levelBasedData}
          setLevelBasedData={setLevelBasedData}
          getLevelBasedDeviceDetails={getLevelBasedDeviceDetails}
        />
      ) : (
        ""
      )}
    </div>
  );
};
export default UpdateLevelBasedSettings;
