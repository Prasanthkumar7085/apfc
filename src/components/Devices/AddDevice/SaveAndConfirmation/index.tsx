import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useState } from "react";
import {
  addfanDeviceSettingsAPI,
  addLeve1DeviceSettingsAPI,
  addLeve2DeviceSettingsAPI,
  addLeve3DeviceSettingsAPI,
} from "@/services/devicesAPIs";
import { toast } from "sonner";
import { Button } from "@mui/material";
interface pageProps {
  levelBasedData: any;
  getLevelBasedDeviceDetails: any;
  setErrorMessages?: any;
}

const SaveAndConfirmationButtons = ({
  levelBasedData,
  getLevelBasedDeviceDetails,
  setErrorMessages
}: pageProps) => {
  const router = useRouter();
  const params = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();
  const pathName = usePathname();


  const getLevelBasedAPI = (payload: any) => {
    let responseData: any;

    if (params?.get("state") == "Level1") {
      responseData = addLeve1DeviceSettingsAPI(id, payload);
    }
    if (params?.get("state") == "Level2") {
      responseData = addLeve2DeviceSettingsAPI(id, payload);
    }
    if (params?.get("state") == "Level3") {
      responseData = addLeve3DeviceSettingsAPI(id, payload);
    }
    if (params?.get("state") == "Level4") {
      responseData = addfanDeviceSettingsAPI(id, payload);
    }
    return responseData;
  };

  const saveAndContinueButton = () => {
    if (params?.get("state") == "Level1") {
      router.push(`${pathName}?state=Level2`);
    }
    if (params?.get("state") == "Level2") {
      router.push(`${pathName}?state=Level3`);
    }
    if (params?.get("state") == "Level3") {
      router.push(`${pathName}?state=Level4`);
    }
    if (params?.get("state") == "Level4") {
      router.push("/devices");
    }
  };

  const level2Values = {
    created_at: levelBasedData?.created_at ? levelBasedData?.created_at : null,
    created_by: levelBasedData?.created_by ? levelBasedData?.created_by : null,
    ct_polarity_error: levelBasedData?.ct_polarity_error ? levelBasedData?.ct_polarity_error : "OFF",
    device_id: levelBasedData?.device_id ? levelBasedData?.device_id : null,
    factory_default: levelBasedData?.factory_default ? levelBasedData?.factory_default : "OFF",
    fan_setting: levelBasedData?.fan_setting ? levelBasedData?.fan_setting : "OFF",
    histeresis_pf: levelBasedData?.histeresis_pf ? levelBasedData?.histeresis_pf : null,
    histeresis_voltage: levelBasedData?.histeresis_voltage ? levelBasedData?.histeresis_voltage : null,
    id: levelBasedData?.id ? levelBasedData?.id : null,
    no_volt: levelBasedData?.no_volt ? levelBasedData?.no_volt : "OFF",
    over_compensate: levelBasedData?.over_compensate ? levelBasedData?.over_compensate : "OFF",
    over_temperature: levelBasedData?.over_temperature ? levelBasedData?.over_temperature : "OFF",
    over_temperature_setting: levelBasedData?.over_temperature_setting ? levelBasedData?.over_temperature_setting : null,
    over_volt: levelBasedData?.over_volt ? levelBasedData?.over_volt : "OFF",
    reset_energy: levelBasedData?.reset_energy ? levelBasedData?.reset_energy : "OFF",
    reset_energy_password: levelBasedData?.reset_energy_password ? levelBasedData?.reset_energy_password : null,
    reset_kvah: levelBasedData?.reset_kvah ? levelBasedData?.reset_kvah : "OFF",
    reset_kvarh: levelBasedData?.reset_kvarh ? levelBasedData?.reset_kvarh : "OFF",
    reset_kwh: levelBasedData?.reset_kwh ? levelBasedData?.reset_kwh : "OFF",
    set_max_over_volt: levelBasedData?.set_max_over_volt ? levelBasedData?.set_max_over_volt : null,
    set_min_over_volt: levelBasedData?.set_min_over_volt ? levelBasedData?.set_min_over_volt : null,
    step_error: levelBasedData?.step_error ? levelBasedData?.step_error : "OFF",
    step_error_setting: levelBasedData?.step_error_setting ? levelBasedData?.step_error_setting : null,
    thd_i_range: levelBasedData?.thd_i_range ? levelBasedData?.thd_i_range : null,
    total_harmonic_distortion: levelBasedData?.total_harmonic_distortion ? levelBasedData?.total_harmonic_distortion : "OFF",
    trip_time: levelBasedData?.trip_time ? levelBasedData?.trip_time : "OFF",
    under_compensate: levelBasedData?.under_compensate ? levelBasedData?.under_compensate : "OFF",
    under_volt: levelBasedData?.under_volt ? levelBasedData?.under_volt : "OFF",
    updated_at: levelBasedData?.updated_at ? levelBasedData?.updated_at : null,
    updated_by: levelBasedData?.updated_by ? levelBasedData?.updated_by : null,
  }

  const level3Values = {
    created_at: levelBasedData?.created_at ? levelBasedData?.created_at : null,
    created_by: levelBasedData?.created_by ? levelBasedData?.created_by : null,
    device_id: levelBasedData?.device_id ? levelBasedData?.device_id : null,
    id: levelBasedData?.id ? levelBasedData?.id : null,
    relay1: levelBasedData?.relay1 ? levelBasedData?.relay1 : "OFF",
    relay2: levelBasedData?.relay2 ? levelBasedData?.relay2 : "OFF",
    relay3: levelBasedData?.relay3 ? levelBasedData?.relay3 : "OFF",
    relay4: levelBasedData?.relay4 ? levelBasedData?.relay4 : "OFF",
    relay5: levelBasedData?.relay5 ? levelBasedData?.relay5 : "OFF",
    relay6: levelBasedData?.relay6 ? levelBasedData?.relay6 : "OFF",
    relay7: levelBasedData?.relay7 ? levelBasedData?.relay7 : "OFF",
    relay8: levelBasedData?.relay8 ? levelBasedData?.relay8 : "OFF",
    relay9: levelBasedData?.relay9 ? levelBasedData?.relay9 : "OFF",
    relay10: levelBasedData?.relay10 ? levelBasedData?.relay10 : "OFF",
    relay11: levelBasedData?.relay11 ? levelBasedData?.relay11 : "OFF",
    relay12: levelBasedData?.relay12 ? levelBasedData?.relay12 : "OFF",
    relay13: levelBasedData?.relay13 ? levelBasedData?.relay13 : "OFF",
    relay14: levelBasedData?.relay14 ? levelBasedData?.relay14 : "OFF",
    updated_at: levelBasedData?.updated_at ? levelBasedData?.updated_at : null,
    updated_by: levelBasedData?.updated_by ? levelBasedData?.updated_by : null,
  }

  const addLevelBasedSettings = async () => {
    setLoading(true);
    let payload = {};
    if (params?.get("state") == "Level2") {
      payload = { ...level2Values }
    } else if (params?.get("state") == "Level3") {
      payload = { ...level3Values }
    } else {
      payload = { ...levelBasedData };
    }
    try {
      const response = await getLevelBasedAPI(payload);
      if (response?.status == 200 || response?.status == 201) {
        await getLevelBasedDeviceDetails();
        setErrorMessages(null);
        saveAndContinueButton();
        toast.success(response?.message);
      } else if (response.status == 422) {
        setErrorMessages(response.error_data);
        throw response;
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="buttonGroup">
      <Button
        variant="text"
        type="button"
        className="btn cancelBtn"
        onClick={() => router.back()}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        type="submit"
        className="btn saveBtn"
        onClick={() => addLevelBasedSettings()}
      >
        Save & Continue
      </Button>
    </div>
  );
};
export default SaveAndConfirmationButtons;
