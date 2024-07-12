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

const SaveAndConfirmationButtons = ({
  levelBasedData,
  getLevelBasedDeviceDetails,
}: any) => {
  const router = useRouter();
  const params = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();
  const pathName = usePathname();

  const getLevelBasedAPI = (payload: any) => {
    let responseData: any;

    if (params?.get("state") == "Level1") {
      responseData = addLeve1DeviceSettingsAPI(id, payload);
      router.push(`${pathName}?state=Level2`);
    }
    if (params?.get("state") == "Level2") {
      responseData = addLeve2DeviceSettingsAPI(id, payload);
      router.push(`${pathName}?state=Level3`);
    }
    if (params?.get("state") == "Level3") {
      responseData = addLeve3DeviceSettingsAPI(id, payload);
      router.push(`${pathName}?state=Level4`);
    }
    if (params?.get("state") == "Level4") {
      responseData = addfanDeviceSettingsAPI(id, payload);
      router.back();
    }
    return responseData;
  };

  const addLevelBasedSettings = async () => {
    setLoading(true);
    let payload = { ...levelBasedData };
    try {
      const response = await getLevelBasedAPI(payload);
      if (response?.status == 200 || response?.status == 201) {
        getLevelBasedDeviceDetails();
        toast.success(response?.message);
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
