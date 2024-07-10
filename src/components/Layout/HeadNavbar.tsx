import {
  Button,
  FormControl,
  FormHelperText,
  InputAdornment,
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
      <h4 className="pagetitle"> {path.includes("/users") ? "Users" : "Devices"} </h4>
      <div className="navActions">
        <TextField
          className="defaultTextFeild"
          defaultValue="Search"
          variant="outlined"
          type="search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Image src="/users/search-icon.svg" alt="" width={15} height={15} />
              </InputAdornment>
            ),
          }}
        />
        <FormControl
          className="defaultSelect"
          variant="outlined"
        >
          <Select
            color="primary"
          >
            <MenuItem value="">Select Device</MenuItem>
            <MenuItem value="Device 1">Device 1</MenuItem>
            <MenuItem value="Device 2">Device 2</MenuItem>
            <MenuItem value="Device 3">Device 3</MenuItem>
          </Select>
        </FormControl>

        {path?.includes("/users") ? (
          <Button
            className="addUserBtn"
            variant='contained'
            onClick={() => router.push("/users/add")}
            startIcon={<Image src="/users/add-icon.svg" alt="" height={10} width={10}/>}
          >
            Add New User
          </Button>

        ) : (
          ""
        )}
        <div className="profilegroup">
          <Image className="avatarIcon" alt="" src="/avatar@2x.png" height={20} width={20} />
          <div className="profilename">
            <h4 className="profile">Ansh Kalasannavar</h4>
            <p className="designation">Admin</p>
          </div>
          <Image className="icon" alt="" src="/icon1.svg" height={10} width={10} />
        </div>
      </div>
    </div>
  );
};

export default HeadNavbar;
