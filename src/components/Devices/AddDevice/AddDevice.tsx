import ErrorMessagesComponent from "@/components/Core/ErrorMessagesComponent";
import LoadingComponent from "@/components/Core/LoadingComponent";
import { setSingleDevice } from "@/redux/Modules/userlogin";
import {
  addDeviceAPI,
  getDeviceAPI,
  syncDeviceParamsAPI,
  updateDeviceAPI,
} from "@/services/devicesAPIs";
import { Box, Button, TextField } from "@mui/material";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  LayersControl,
  MapContainer,
  Marker,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import axios from "axios";
import SyncDeviceDialog from "@/components/Core/SyncDeviceParamatersDialog";

const AddDeviceComponent = () => {
  const router = useRouter();

  const params = useParams();
  const dispatch = useDispatch();
  const [openSyncParamsDialog, setOpenSyncParamsDialog] =
    useState<boolean>(false);

  const MAP_PROVIDERS = {
    google: {
      satellite: "Google Satellite",
      roadmap: "Google Roadmap",
    },
    osm: "OpenStreetMap (Mapnik)",
    yandex: {
      satellite: "Yandex Satellite",
      roadmap: "Yandex Roadmap",
    },
    mapbox: "Mapbox",
  };

  const tiles = [
    {
      attribution: "&copy; Google",
      name: MAP_PROVIDERS.google.satellite,
      checked: true,
      url: "//mt.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
      crs: L.CRS.EPSG3857,
    },
    {
      attribution: "&copy; Google",
      name: MAP_PROVIDERS.google.roadmap,
      checked: false,
      url: "//mt.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
      crs: L.CRS.EPSG3857,
    },
    {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      name: MAP_PROVIDERS.osm,
      checked: false,
      url: "//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      crs: L.CRS.EPSG3857,
    },
    {
      attribution: "&copy; Yandex",
      name: MAP_PROVIDERS.yandex.satellite,
      checked: false,
      url: "//sat04.maps.yandex.net/tiles?l=sat&v=3.456.0&x={x}&y={y}&z={z}",
      crs: L.CRS.EPSG3395,
    },
    {
      attribution: "&copy; Yandex",
      name: MAP_PROVIDERS.yandex.roadmap,
      checked: false,
      url: " https://core-renderer-tiles.maps.yandex.net/tiles?l=map&v=21.06.18-0-b210520094930&x={x}&y={y}&z={z}&scale=1&lang=ru-RU",
      subdomains: ["01", "02", "03", "04"],
      crs: L.CRS.EPSG3395,
    },
  ];

  const LocationMarker = ({ setDeviceDetails }: any) => {
    typeof window !== "undefined";

    const [position, setPosition] = useState<any>();

    const reverseGeocode = async (lat: any, lng: any) => {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
        );
        return response.data.display_name;
      } catch (error) {
        console.error("Error during reverse geocoding:", error);
        return null;
      }
    };

    const map = useMapEvents({
      async click(e) {
        try {
          const placeName = await reverseGeocode(e.latlng.lat, e.latlng.lng);

          let afterRemovingSpaces = placeName
            ?.split(",")[1]
            ?.replace(/[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? ]/g, "");

          setPosition(e.latlng);
          setDeviceDetails((prev: any) => ({
            ...prev,
            location: afterRemovingSpaces || "Unknown Location",
            coordinates: `${e.latlng.lat}, ${e.latlng.lng}`,
          }));
        } catch (error) {
          console.error("Failed to reverse geocode", error);
          setDeviceDetails((prev: any) => ({
            ...prev,
            location: "Unknown Location",
            coordinates: `${e.latlng.lat}, ${e.latlng.lng}`,
          }));
        }
      },
    });

    const customIcon: any = L.icon({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    return position ? <Marker position={position} icon={customIcon} /> : null;
  };

  const [deviceDetails, setDeviceDetails] = useState<any>({
    device_name: "",
    device_serial_number: "",
    location: "",
  });
  const [errorMessages, setErrorMessages] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFieldValue = (event: any) => {
    const { name, value } = event.target;
    const deviceVAlue = value.replace(/\s+/g, " ");
    setDeviceDetails({
      ...deviceDetails,
      [name]: deviceVAlue,
    });
  };

  const addDevice = async () => {
    setLoading(true);
    try {
      let data = {
        device_name: deviceDetails?.device_name
          ? deviceDetails?.device_name.trim()
          : "",
        device_serial_number: deviceDetails?.device_serial_number
          ? deviceDetails?.device_serial_number.trim()
          : "",
        location: deviceDetails?.location ? deviceDetails?.location.trim() : "",
      };
      const payload = { ...data };
      let response: any = await addDeviceAPI(payload);

      if (response.success) {
        setErrorMessages(null);
        setOpenSyncParamsDialog(true);
        setDeviceDetails(response?.data);
        toast.success(response.message);
        // setTimeout(() => {
        //   router.push(
        //     `/devices/${response?.data?.id}/update-settings?state=Level1`
        //   );
        // }, 1000);
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
      let data = {
        device_name: deviceDetails?.device_name
          ? deviceDetails?.device_name.trim()
          : "",
        device_serial_number: deviceDetails?.device_serial_number
          ? deviceDetails?.device_serial_number.trim()
          : "",
        location: deviceDetails?.location ? deviceDetails?.location.trim() : "",
      };
      const payload = { ...data };
      let response: any = await updateDeviceAPI(payload, params?.id);

      if (response.success) {
        setErrorMessages(null);
        toast.success(response.message);
        setTimeout(() => {
          router.push(`/devices/${params?.id}/update-settings?state=Level1`);
        }, 1000);
      } else if (response.status === 422) {
        setErrorMessages(response.error_data);
        throw response;
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const syncDeviceParmas = async () => {
    setLoading(true);
    try {
      let response: any = await syncDeviceParamsAPI(
        deviceDetails?.device_serial_number,
        params?.id || deviceDetails?.id
      );
      setOpenSyncParamsDialog(false);

      if (response.success) {
        setErrorMessages(null);
        toast.success(response.message);
        setTimeout(() => {
          router.push(`/devices/${params?.id}/update-settings?state=Level1`);
        }, 1000);
      } else if (response.status === 422) {
        setErrorMessages(response.error_data);
        setTimeout(() => {
          router.back();
        }, 1000);
        throw response;
      } else {
        toast.error(response.message);
        setTimeout(() => {
          router.back();
        }, 1000);
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
      const response = await getDeviceAPI(params?.id);
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
  }, []);

  const apiCalls = () => {
    if (params?.id) {
      updateDevice();
    } else {
      addDevice();
    }
  };

  let mapConfig: any = {
    lat: 16.0725381,
    lng: 80.3219856,
    zoom: 14,
  };

  return (
    <Box id="addUser" sx={{ display: "flex", gap: 2, width: "100%" }}>
      <div style={{ display: "flex", flexDirection: "row", gap: "1.5em" }}>
        <Box sx={{ width: "40%" }}>
          <div className="feildBlock">
            <label className="label">
              Device Name <span>*</span>
            </label>
            <TextField
              className="textFeild"
              value={deviceDetails["device_name"]}
              name="device_name"
              onChange={handleFieldValue}
              placeholder="Enter Device Name"
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
              placeholder="Enter Device Serial Number"
              fullWidth
            />
            <ErrorMessagesComponent
              errorMessage={errorMessages?.device_serial_number}
            />
          </div>

          <div className="feildBlock">
            <label className="label">Device Location</label>
            <TextField
              className="textFeild"
              value={deviceDetails["location"]}
              name="location"
              onChange={handleFieldValue}
              placeholder="Enter Device Location"
              fullWidth
              disabled
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

          {params?.id ? (
            <Button
              className="addUserBtn"
              variant="contained"
              color="success"
              sx={{ alignSelf: "flex-end" }}
              onClick={syncDeviceParmas}
            >
              Sync device params
            </Button>
          ) : (
            ""
          )}
          <LoadingComponent loading={loading} />
        </Box>

        <div style={{ width: "60%", height: "500px" }}>
          <MapContainer
            center={[mapConfig?.lat, mapConfig?.lng]}
            zoom={mapConfig?.zoom}
            style={{ height: "100%", width: "100%" }}
          >
            <LayersControl position="topleft">
              {tiles.map(({ attribution, checked, name, subdomains, url }) => {
                const tileLayerProps = {
                  attribution,
                  url,
                  name,
                };
                return (
                  <LayersControl.BaseLayer
                    checked={!!checked}
                    key={name}
                    name={name}
                  >
                    <TileLayer maxNativeZoom={23} {...tileLayerProps} />
                  </LayersControl.BaseLayer>
                );
              })}
            </LayersControl>
            <LocationMarker setDeviceDetails={setDeviceDetails} />
          </MapContainer>
        </div>
      </div>
      <SyncDeviceDialog
        openSyncParamsDialog={openSyncParamsDialog}
        setOpenSyncParamsDialog={setOpenSyncParamsDialog}
        handleSync={syncDeviceParmas}
      />
    </Box>
  );
};

export default AddDeviceComponent;
