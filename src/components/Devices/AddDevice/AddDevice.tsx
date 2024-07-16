import ErrorMessagesComponent from "@/components/Core/ErrorMessagesComponent";
import LoadingComponent from "@/components/Core/LoadingComponent";
import { setSingleDevice } from "@/redux/Modules/userlogin";
import { addDeviceAPI, getSigleDeviceAPI, updateDeviceAPI } from "@/services/devicesAPIs";
import { Box, Button, TextField } from "@mui/material";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const AddDevice = () => {
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch();
  const [deviceDetails, setDeviceDetails] = useState<any>({
    device_name: "",
    device_serial_number: "",
    location: "",
  });
  const [errorMessages, setErrorMessages] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFieldValue = (event: any) => {
    const { name, value } = event.target;
    const deviceVAlue = value.replace(/^\s+/, '');
    setDeviceDetails({
      ...deviceDetails,
      [name]: deviceVAlue,
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

  const updateDevice = async () => {
    setLoading(true);
    try {
      const payload = { ...deviceDetails };
      let response: any = await updateDeviceAPI(payload, params?.id);

      if (response.success) {
        setErrorMessages(null);
        toast.success(response.message);
        setTimeout(() => {
          router.push(
            `/devices/${params?.id}/update-settings?state=Level1`
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

  const getSingleDevice = async () => {
    setLoading(true);
    try {
      const response = await getSigleDeviceAPI(params?.id);
      setDeviceDetails(response?.data);
      dispatch(setSingleDevice(response?.data));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params?.id) {
      getSingleDevice();
    }
  }, [])
  const apiCalls = () => {
    if (params?.id) {
      updateDevice();
    } else {
      addDevice();
    }
  }

  return (
    <Box id="addUser">
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
          Device Location
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
        onClick={apiCalls}
      >
        {params?.id ? "Update Device" : "Add Device"}
      </Button>
      <LoadingComponent loading={loading} />
    </Box>
  );
};
export default AddDevice;
