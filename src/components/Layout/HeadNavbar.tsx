import { capitalizeFirstTwoWords } from "@/lib/helpers/nameFormate";
import { prepareURLEncodedParams } from "@/lib/prepareUrlEncodedParams";
import { removeUserDetails } from "@/redux/Modules/userlogin";
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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const HeadNavbar = () => {
  const router = useRouter();
  const path = usePathname();
  const params = useSearchParams();
  const dispatch = useDispatch();

  const userDetails = useSelector(
    (state: any) => state.auth.user?.data?.user_details
  );

  const [searchParams, setSearchParams] = useState(
    Object.fromEntries(new URLSearchParams(Array.from(params.entries())))
  );
  const [searchString, setSearchString] = useState(params.get("search_string") || "");
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
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
      search_string: newSearchString
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

  return (
    <div className="headnav">
      <h4 className="pagetitle"> {path.includes("/users") ? "Users" : "Devices"} </h4>
      <div className="navActions">
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
        {/* <FormControl
          className="defaultSelect"
          variant="outlined"
        >
          <Select
            color="primary"
          >
            <MenuItem className="menuItem" value="">Select Device</MenuItem>
            <MenuItem className="menuItem" value="Device 1">Device 1</MenuItem>
            <MenuItem className="menuItem" value="Device 2">Device 2</MenuItem>
            <MenuItem className="menuItem" value="Device 3">Device 3</MenuItem>
          </Select>
        </FormControl> */}

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
            <p className="designation">{userDetails?.user_type}</p>
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
