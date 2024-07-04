import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import styles from "./HeadNavbar.module.css";
import { useRouter } from "next/navigation";

const HeadNavbar = () => {
  const router = useRouter();
  return (
    <div className={styles.headnav}>
      <h4 className={styles.pagetitle}>Devices</h4>
      <div className={styles.searchsection}>
        <div className={styles.searchgroup}>
          <TextField
            className={styles.inputtype}
            color="primary"
            defaultValue="Search"
            variant="outlined"
            type="search"
            sx={{ "& .MuiInputBase-root": { height: "39px" }, width: "303px" }}
          />
          <FormControl
            className={styles.selectdevice}
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
        <div>
          <Button
            variant='contained'
            onClick={() => router.push("/users/add")}
          >
            Add User
          </Button>
        </div>
        <div className={styles.profilegroup}>
          <img className={styles.avatarIcon} alt="" src="/avatar@2x.png" />
          <div className={styles.profilename}>
            <h4 className={styles.profile}>Ansh Kalasannavar</h4>
            <p className={styles.designation}>Admin</p>
          </div>
          <img className={styles.icon} alt="" src="/icon1.svg" />
        </div>
      </div>
    </div>
  );
};

export default HeadNavbar;
