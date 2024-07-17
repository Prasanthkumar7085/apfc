import { capitalizeFirstTwoWords } from "@/lib/helpers/nameFormate";
import { prepareURLEncodedParams } from "@/lib/prepareUrlEncodedParams";
import { deleteSingleDevice, deleteSingleUser, removeUserDetails } from "@/redux/Modules/userlogin";
import { getSigleDeviceAPI } from "@/services/devicesAPIs";
import {
  Avatar,
  Button,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import Cookies from "js-cookie";
import Image from "next/image";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "../Core/LoadingComponent";

const HeadNavbar = () => {
  const router = useRouter();
  const path = usePathname();
  const params = useSearchParams();
  const param = useParams();
  const dispatch = useDispatch();

  const userDetails = useSelector(
    (state: any) => state.auth.user?.data?.user_details
  );
  const deviceData = useSelector(
    (state: any) => state?.auth?.singleDevice
  );
  const userData = useSelector(
    (state: any) => state?.auth?.singleUser
  );


  const [searchParams, setSearchParams] = useState(
    Object.fromEntries(new URLSearchParams(Array.from(params.entries())))
  );

  const [searchString, setSearchString] = useState(params.get("search_string") || "");
  const [status, setStatus] = useState(params.get("status") || "");
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(
    null
  );

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
      search_string: newSearchString,
      page: 1
    }
    let queryString = prepareURLEncodedParams("", queryParams)
    router.push(`${path}${queryString}`);
  };

  const handleStatusChange = (event: any) => {
    const newSearchString = event.target.value;
    setStatus(newSearchString);
    let queryParams = {
      ...searchParams,
      status: newSearchString,
      page: 1
    }
    let queryString = prepareURLEncodedParams("", queryParams)
    router.push(`${path}${queryString}`);
  };
  useEffect(() => {
    setSearchParams(
      Object.fromEntries(new URLSearchParams(Array.from(params.entries())))
    );
  }, [params]);

  const logout = () => {
    Cookies.remove("user");
    dispatch(removeUserDetails());
    router.push("/");
  };


  const capitalizeFirstLetter = (name: any) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }

  return (
    <div className="headnav">
      {path == "/users/add" || path == `/users/${param?.id}` || path.includes(`/users/${param?.id}/edit`) ? (
        <div className="withBackGrp" >
          <Button
            variant="outlined"
            className="backBtn"
            onClick={() => {
              router.back();
              dispatch(deleteSingleUser());
            }}
            startIcon={
              <Image src="/users/back-icon.svg" alt="" width={13} height={13} />
            }
          >
            Back
          </Button>
          <h5 className="pagetitle">{userData?.full_name ? userData?.full_name || "--" : "Add New User"}</h5>
        </div>
      ) : (
        path == "/users" ? <h4 className="pagetitle"> Users </h4> : ""
      )}
      {path == "/devices/add" || path == `/devices/${param?.id}` || path.includes(`/devices/${param?.id}/update-settings`) || path.includes(`devices/${param?.id}/view-settings`) || path.includes(`/devices/${param?.id}/edit`) ? (
        <div className="withBackGrp" >
          <Button
            variant="outlined"
            className="backBtn"
            onClick={() => {
              if (path == `/devices/${param?.id}/update-settings` || path.includes(`devices/${param?.id}/view-settings`)) {
                router.push('/devices');
              } else {
                router.back();
              }
              dispatch(deleteSingleDevice());
            }}
            startIcon={
              <Image src="/users/back-icon.svg" alt="" width={13} height={13} />
            }
          >
            Back
          </Button>
          <h5 className="pagetitle">{deviceData?.device_name ? deviceData?.device_name || "--" : "Add New Device"}</h5>
        </div>
      ) : (
        path == "/devices" ? <h4 className="pagetitle"> Devices </h4> : ""
      )}
      <div className="navActions">
        {path == "/devices/add" ||
          path == `/devices/${param?.id}` ||
          path.includes(`/devices/${param?.id}/update-settings`) ||
          path.includes(`devices/${param?.id}/view-settings`) ||
          path == "/users/add" ||
          path == `/users/${param?.id}` ||
          path.includes(`/users/${param?.id}/edit`) ||
          path.includes(`/devices/${param?.id}/edit`)
          ? (
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
                      <Image src="/users/search-icon.svg" alt="" width={15} height={15} />
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
                <MenuItem className="menuItem" value="">All</MenuItem>
                <MenuItem className="menuItem" value="ACTIVE">{path == '/users' ? "Active" : "Online"}</MenuItem>
                <MenuItem className="menuItem" value="INACTIVE">{path == '/users' ? "Inactive" : "Offline"}</MenuItem>
              </Select>
              {path == "/users" ? (
                <Button
                  className="addUserBtn"
                  variant='contained'
                  onClick={() => router.push("/users/add")}
                  startIcon={<Image src="/users/add-icon.svg" alt="" height={10} width={10} />}
                >
                  Add New User
                </Button>

              ) : (
                ""
              )}
              {path == "/devices" ? (
                <Button
                  className="addUserBtn"
                  variant='contained'
                  onClick={() => router.push("/devices/add")}
                  startIcon={<Image src="/users/add-icon.svg" alt="" height={10} width={10} />}
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
            <h4 className="profile">{capitalizeFirstTwoWords(userDetails?.full_name)}</h4>
            <p className="designation">
              {userDetails?.user_type ? capitalizeFirstLetter(userDetails.user_type) : ''}
            </p>
          </div>
          <Image className="icon" alt="" src="/icon1.svg" height={12} width={12} style={{ marginTop: "2px" }} />
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
