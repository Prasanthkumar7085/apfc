"use client"
import {
  TextField,
  InputAdornment,
  Icon,
  IconButton,
  Button,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import styles from "./index.module.css";
import { signInAPI } from "@/services/authAPIs";
import { setUserDetails } from "@/redux/Modules/userlogin";
import ErrorMessagesComponent from "@/components/Core/ErrorMessagesComponent";


const LoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [email, setEmail] = useState<any>();
  const [password, setPassword] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessages, setErrorMessages] = useState<any>();
  const [invalid, setInvalid] = useState<any>();

  const signIn = async (e: any) => {
    e.preventDefault();
    setInvalid(false);
    setLoading(true);
    try {
      const payload = {
        email: email,
        password: password,
      };
      let response: any = await signInAPI(payload);

      if (response.success) {
        toast.success(response?.message);
        Cookies.set("user", response?.data?.user_details?.user_type);
        dispatch(setUserDetails(response));
        router.push("/devices")
      } else if (response.status == 422) {
        setErrorMessages(response.error_data);
        setLoading(false);
        throw response;
      } else if (response.status === 401) {
        setInvalid(response.message);
      } else {
        toast.error(response.message || 'Error while login')
      }
    } catch (err) {
      console.error(err);
      toast.error('Error while login')
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className={styles.loginpage}>
      <div className={styles.login}>
        <img className={styles.imageIcon} alt="" src="/image@2x.jpg" />
        <div className={styles.loginsection}>
          <img className={styles.logoIcon} alt="" src="/logo.svg" />
          <div className={styles.logingroup}>
            {/* <form onSubmit={signIn}> */}
            <div className={styles.titlegroup}>
              <p className={styles.paragraph}>LOGIN</p>
              <h2 className={styles.title}>
                Welcome to the Peepul Agri APFC Application
              </h2>
            </div>
            <div className={styles.inputsection}>
              <div className={styles.inputgroup}>
                <div className={styles.inputusername}>
                  <label className={styles.label}>User Name</label>
                  <TextField
                    className={styles.inputtype}
                    color="primary"
                    variant="outlined"
                    sx={{ "& .MuiInputBase-root": { height: "48px" } }}
                    name="email"
                    type={"text"}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrorMessages(null);
                    }}
                  />
                  <ErrorMessagesComponent errorMessage={errorMessages?.email} />
                </div>
                <div className={styles.inputpassword}>
                  <div className={styles.passwordgroup}>
                    <label className={styles.label}>Password</label>
                    <TextField
                      className={styles.inputtype}
                      color="primary"
                      variant="outlined"
                      sx={{ "& .MuiInputBase-root": { height: "48px" } }}
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrorMessages(null);
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={togglePasswordVisibility} edge="end">
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <ErrorMessagesComponent errorMessage={errorMessages?.password} />
                  </div>
                  <p className={styles.forgotYourPassword}>
                    Forgot Your Password?
                  </p>
                </div>
              </div>
              <Button
                className={styles.inputbutton}
                disableElevation
                color="success"
                variant="contained"
                sx={{ borderRadius: "0px 0px 0px 0px" }}
                // type="submit"
                onClick={() => router.push("/devices")}
              >
                {loading ? (
                  <CircularProgress color="inherit" size={"1.8rem"} />
                ) : (
                  "Login"
                )}

              </Button>
            </div>
            {/* </form> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
