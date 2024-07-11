import ErrorMessagesComponent from "@/components/Core/ErrorMessagesComponent";
import LoadingComponent from "@/components/Core/LoadingComponent";
import { addDeviceAPI } from "@/services/devicesAPIs";
import { Box, Button, TextField } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const AddDevice = () => {
  const router = useRouter();
  const [deviceDetails, setDeviceDetails] = useState<any>({
    device_name: "",
    device_serial_number: "",
    location: "",
  });
  const [errorMessages, setErrorMessages] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFieldValue = (event: any) => {
    const { name, value } = event.target;
    setDeviceDetails({
      ...deviceDetails,
      [name]: value,
    });
  };

  const addDevice = async () => {
    setLoading(true);
    try {
      const payload = { ...deviceDetails };
      let response: any = await addDeviceAPI(payload);

      if (response.success) {
        setErrorMessages(null);
        toast.success(response.message);
        setTimeout(() => {
          router.push(
            `/devices/${response?.data?.id}/update-settings?state=Level1`
          );
        }, 1000);
      } else if (response.status === 422) {
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
    <Box id="addUser">
      <Button
        className="backBtn"
        variant="outlined"
        sx={{ alignSelf: "flex-start", mb: 2 }}
        onClick={() => router.back()}
        startIcon={
          <Image src="/users/back-icon.svg" alt="" width={13} height={13} />
        }
      >
        Back
      </Button>
      <div className="feildBlock">
        <label className="label">
          Device Name <span>*</span>
        </label>
        <TextField
          className="textFeild"
          value={deviceDetails["device_name"]}
          name="device_name"
          onChange={handleFieldValue}
          placeholder="Device Name"
          fullWidth
        />
        <ErrorMessagesComponent errorMessage={errorMessages?.device_name} />
      </div>

      <div className="feildBlock">
        <label className="label">
          Device Serial Number <span>*</span>
        </label>
        <TextField
          className="textFeild"
          value={deviceDetails["device_serial_number"]}
          name="device_serial_number"
          onChange={handleFieldValue}
          placeholder="Device Serial Number"
          fullWidth
        />
        <ErrorMessagesComponent
          errorMessage={errorMessages?.device_serial_number}
        />
      </div>

      <div className="feildBlock">
        <label className="label">
          Device Location <span>*</span>
        </label>
        <TextField
          className="textFeild"
          value={deviceDetails["location"]}
          name="location"
          onChange={handleFieldValue}
          placeholder="Device Location"
          fullWidth
        />
        <ErrorMessagesComponent errorMessage={errorMessages?.location} />
      </div>

      <Button
        className="addUserBtn"
        variant="contained"
        color="success"
        sx={{ alignSelf: "flex-end" }}
        onClick={addDevice}
      >
        Add Device
      </Button>
      <LoadingComponent loading={loading} />
    </Box>
  );
};
export default AddDevice;
