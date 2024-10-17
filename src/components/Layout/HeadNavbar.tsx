import { capitalizeFirstTwoWords } from "@/lib/helpers/nameFormate";
import { prepareURLEncodedParams } from "@/lib/prepareUrlEncodedParams";
import {
  deleteSingleDevice,
  deleteSingleUser,
  removeUserDetails,
} from "@/redux/Modules/userlogin";
import { getDeviceLocationsAPI } from "@/services/devicesAPIs";
import {
  Autocomplete,
  Avatar,
  Button,
  InputAdornment,
  Menu,
  MenuItem,
  Select,
  Switch,
  TextField,
  Tooltip,
} from "@mui/material";
import Cookies from "js-cookie";
import Image from "next/image";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const HeadNavbar = () => {
  const router = useRouter();
  const path = usePathname();
  const params = useSearchParams();
  const param = useParams();
  const dispatch = useDispatch();

  const userDetails = useSelector(
    (state: any) => state.auth.user?.data?.user_details
  );
  const deviceData = useSelector((state: any) => state?.auth?.singleDevice);
  const userData = useSelector((state: any) => state?.auth?.singleUser);
  const [deviceLocations, setDeviceLocations] = useState<any>([]);
  const [selectedLocation, setSelectedLocation] = useState<any>();

  const [searchParams, setSearchParams] = useState(
    Object.fromEntries(new URLSearchParams(Array.from(params.entries())))
  );
  const [isNearby, setIsNearby] = useState<boolean>(false);

  const [searchString, setSearchString] = useState(
    params.get("search_string") || ""
  );
  const [status, setStatus] = useState(params.get("status") || "");
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSearchChange = (event: any) => {
    const newSearchString = event.target.value;
    setSearchString(newSearchString);
    let queryParams = {
      ...searchParams,
      search_string: encodeURIComponent(newSearchString),
      page: 1,
    };
    let queryString = prepareURLEncodedParams("", queryParams);
    router.push(`${path}${queryString}`);
  };

  const handleStatusChange = (event: any) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
    let queryParams = {
      ...searchParams,
      status: encodeURIComponent(newStatus),
      page: 1,
    };
    let queryString = prepareURLEncodedParams("", queryParams);
    router.push(`${path}${queryString}`);
  };

  const handleSwitchChange = async (event: any) => {
    const checked = event.target.checked;

    let queryParams: any = {
      ...searchParams,
      page: 1,
      ...(checked
        ? {}
        : { latitude: undefined, longitude: undefined, radius: undefined }),
    };

    if (checked) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            queryParams.latitude = latitude;
            queryParams.longitude = longitude;
            queryParams.radius = 1000;
            setIsNearby(true);

            let queryString = prepareURLEncodedParams("", queryParams);
            router.push(`${path}${queryString}`);
          },
          (error: any) => {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                alert(
                  "Please enable location services in your browser settings."
                );
                break;
              case error.POSITION_UNAVAILABLE:
                console.error("Location information is unavailable.");
                break;
              case error.TIMEOUT:
                console.error("The request to get user location timed out.");
                break;
              case error.UNKNOWN_ERROR:
                console.error("An unknown error occurred.");
                break;
            }
            setIsNearby(false);
          },
          { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    } else {
      setIsNearby(false);
      let queryString = prepareURLEncodedParams("", queryParams);
      router.push(`${path}${queryString}`);
    }
  };

  const getDeviceList = async () => {
    try {
      const response = await getDeviceLocationsAPI();
      setDeviceLocations(response?.data);
      if (params.get("latitude") && params.get("longitude")) {
        let location = response?.data?.find(
          (item: any) =>
            item.coordinates[0] == searchParams?.latitude &&
            item.coordinates[1] == searchParams?.longitude
        );
        console.log(location, "location");
        setSelectedLocation(location);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (path == "/devices") {
      getDeviceList();
    }
  }, []);

  useEffect(() => {
    setSearchParams(
      Object.fromEntries(new URLSearchParams(Array.from(params.entries())))
    );
  }, [params]);

  const logout = () => {
    Cookies.remove("user");
    Cookies.remove("access_token");
    dispatch(removeUserDetails());
    router.push("/");
  };

  const capitalizeFirstLetter = (name: any) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  useEffect(() => {
    if (path == "/devices") {
      dispatch(deleteSingleDevice());
    } else if (path == "/users") {
      dispatch(deleteSingleUser());
    }
  }, [path]);

  return (
    <div className="headnav">
      {path == "/users/add" ||
      path == `/users/${param?.id}` ||
      path.includes(`/users/${param?.id}/edit`) ? (
        <div className="withBackGrp">
          <Button
            variant="outlined"
            className="backBtn"
            onClick={() => {
              router.back();
              // dispatch(deleteSingleUser());
            }}
            startIcon={
              <Image src="/users/back-icon.svg" alt="" width={13} height={13} />
            }
          >
            Back
          </Button>
          {userData?.full_name?.length > 20 ? (
            <Tooltip title={userData?.full_name} arrow>
              <h5 className="pagetitle">
                {userData?.full_name
                  ? capitalizeFirstTwoWords(
                      userData?.full_name?.length > 20
                        ? userData?.full_name.slice(0, 20) + "..."
                        : userData?.full_name
                    ) || "--"
                  : "Add New User"}
              </h5>
            </Tooltip>
          ) : (
            <h5 className="pagetitle">
              {userData?.full_name
                ? capitalizeFirstTwoWords(userData?.full_name) || "--"
                : "Add New User"}
            </h5>
          )}
        </div>
      ) : path == "/users" ? (
        <h4 className="pagetitle"> Users </h4>
      ) : (
        ""
      )}
      {path == "/devices/add" ||
      path == `/devices/${param?.id}` ||
      path.includes(`/devices/${param?.id}/update-settings`) ||
      path.includes(`devices/${param?.id}/view-settings`) ||
      path.includes(`/devices/${param?.id}/edit`) ? (
        <div className="withBackGrp">
          <Button
            variant="outlined"
            className="backBtn"
            onClick={() => {
              // if (path == `/devices/${param?.id}/update-settings` || path.includes(`devices/${param?.id}/view-settings`)) {
              //   router.push('/devices');
              // } else {
              router.back();
              // }
              // dispatch(deleteSingleDevice());
            }}
            startIcon={
              <Image src="/users/back-icon.svg" alt="" width={13} height={13} />
            }
          >
            Back
          </Button>
          {deviceData?.device_name?.length > 20 ? (
            <Tooltip title={deviceData?.device_name} arrow>
              <h5 className="pagetitle">
                {deviceData?.device_name
                  ? capitalizeFirstTwoWords(
                      deviceData?.device_name?.length > 20
                        ? deviceData?.device_name.slice(0, 20) + "..."
                        : deviceData?.device_name
                    ) || "--"
                  : "Add New Device"}
              </h5>
            </Tooltip>
          ) : (
            <h5 className="pagetitle">
              {deviceData?.device_name
                ? capitalizeFirstTwoWords(deviceData?.device_name) || "--"
                : "Add New Device"}
            </h5>
          )}
        </div>
      ) : path == "/devices" ? (
        <h4 className="pagetitle"> Devices </h4>
      ) : (
        ""
      )}
      <div className="navActions">
        {path == "/devices/add" ||
        path == `/devices/${param?.id}` ||
        path.includes(`/devices/${param?.id}/update-settings`) ||
        path.includes(`devices/${param?.id}/view-settings`) ||
        path == "/users/add" ||
        path == `/users/${param?.id}` ||
        path.includes(`/users/${param?.id}/edit`) ||
        path.includes(`/devices/${param?.id}/edit`) ? (
          ""
        ) : (
          <>
            <TextField
              className="defaultTextFeild"
              defaultValue="Search"
              variant="outlined"
              type="search"
              value={searchString}
              onChange={handleSearchChange}
              placeholder="Search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Image
                      src="/users/search-icon.svg"
                      alt=""
                      width={15}
                      height={15}
                    />
                  </InputAdornment>
                ),
              }}
            />

            <Select
              className="defaultSelect"
              disableUnderline
              displayEmpty
              value={status}
              onChange={handleStatusChange}
            >
              <MenuItem className="menuItem" value="">
                All
              </MenuItem>
              <MenuItem className="menuItem" value="ACTIVE">
                {path == "/users" ? "Active" : "Online"}
              </MenuItem>
              <MenuItem className="menuItem" value="INACTIVE">
                {path == "/users" ? "Inactive" : "Offline"}
              </MenuItem>
            </Select>

            <Autocomplete
              className="defaultAutoComplete"
              options={deviceLocations}
              disabled={isNearby ? true : false}
              value={selectedLocation ? selectedLocation : null}
              getOptionLabel={(option: any) => option.location}
              sx={{ width: 200, display: path == "/users" ? "none" : "" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Select Location"
                />
              )}
              onChange={(event, value) => {
                setSelectedLocation(value);

                let queryParams: any = {
                  ...searchParams,
                  page: 1,
                };
                queryParams.latitude = value?.coordinates[0];
                queryParams.longitude = value?.coordinates[1];
                queryParams.radius = 1000;
                let queryString = prepareURLEncodedParams("", queryParams);
                router.push(`${path}${queryString}`);
              }}
            />

            <div style={{ display: path == "/users" ? "none" : "" }}>
              <Switch
                checked={isNearby}
                disabled={selectedLocation ? true : false}
                onChange={handleSwitchChange}
                color="primary"
                name="nearbySwitch"
                inputProps={{ "aria-label": "controlled" }}
              />
              <span>{isNearby ? "Nearby me" : "Nearby me"}</span>
            </div>

            {path == "/users" ? (
              <Button
                className="addUserBtn"
                variant="contained"
                onClick={() => router.push("/users/add")}
                startIcon={
                  <Image
                    src="/users/add-icon.svg"
                    alt=""
                    height={10}
                    width={10}
                  />
                }
              >
                Add New User
              </Button>
            ) : (
              ""
            )}
            {path == "/devices" ? (
              <Button
                className="addUserBtn"
                variant="contained"
                onClick={() => router.push("/devices/add")}
                startIcon={
                  <Image
                    src="/users/add-icon.svg"
                    alt=""
                    height={10}
                    width={10}
                  />
                }
              >
                Add New Device
              </Button>
            ) : (
              ""
            )}
          </>
        )}
        <div
          className="profileGrp"
          onClick={handleOpenUserMenu}
          style={{ cursor: "pointer" }}
        >
          <Avatar sx={{ bgcolor: "orange" }}>
            {userDetails?.full_name?.slice(0, 1).toUpperCase()}
          </Avatar>
          <div className="profileName">
            <h4 className="profile">
              {capitalizeFirstTwoWords(userDetails?.full_name)}
            </h4>
            <p className="designation">
              {userDetails?.user_type
                ? capitalizeFirstLetter(userDetails.user_type)
                : ""}
            </p>
          </div>
          <Image
            className="icon"
            alt=""
            src="/icon1.svg"
            height={12}
            width={12}
            style={{ marginTop: "2px" }}
          />
        </div>
      </div>
      <Menu
        className="profileMenuBlock"
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem className="menuItem" onClick={logout}>
          Log Out
        </MenuItem>
      </Menu>
    </div>
  );
};

export default HeadNavbar;
