import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const HeadNavbar = () => {
  const router = useRouter();
  const path = usePathname();
  return (
    <div className="headnav">
      <h4 className="pagetitle"> {path.includes("/users") ? "Users" :"Devices"} </h4>
      <div className="searchsection">
        <div className="searchgroup">
          <TextField
            className="inputtype"
            color="primary"
            defaultValue="Search"
            variant="outlined"
            type="search"
            sx={{ "& .MuiInputBase-root": { height: "39px" }, width: "303px" }}
          />
          <FormControl
            className="selectdevice"
            variant="outlined"
            sx={{
              borderRadius: "0px 0px 0px 0px",
              width: "220px",
              height: "39px",
              m: 0,
              p: 0,
              "& .MuiInputBase-root": {
                m: 0,
                p: 0,
                minHeight: "39px",
                justifyContent: "center",
                display: "inline-flex",
              },
              "& .MuiInputLabel-root": {
                m: 0,
                p: 0,
                minHeight: "39px",
                display: "inline-flex",
              },
              "& .MuiMenuItem-root": {
                m: 0,
                p: 0,
                height: "39px",
                display: "inline-flex",
              },
              "& .MuiSelect-select": {
                m: 0,
                p: 0,
                height: "39px",
                alignItems: "center",
                display: "inline-flex",
              },
              "& .MuiInput-input": { m: 0, p: 0 },
              "& .MuiInputBase-input": { textAlign: "left", p: "0 !important" },
            }}
          >
            <InputLabel color="primary">Select Device</InputLabel>
            <Select
              color="primary"
              label="Select Device"
              disableUnderline
              displayEmpty
            >
              <MenuItem value="Device 1">Device 1</MenuItem>
              <MenuItem value="Device 2">Device 2</MenuItem>
              <MenuItem value="Device 3">Device 3</MenuItem>
            </Select>
            <FormHelperText />
          </FormControl>
        </div>
        {path?.includes("/users") ? (
          <div>
            <Button
              variant='contained'
              onClick={() => router.push("/users/add")}
            >
              Add User
            </Button>
          </div>
        ) : (
          ""
        )}
        <div className="profilegroup">
          <Image className="avatarIcon" alt="" src="/avatar@2x.png" height={30} width={30} />
          <div className="profilename">
            <h4 className="profile">Ansh Kalasannavar</h4>
            <p className="designation">Admin</p>
          </div>
          <Image className="icon" alt="" src="/icon1.svg" height={30} width={30} />
        </div>
      </div>
    </div>
  );
};

export default HeadNavbar;
