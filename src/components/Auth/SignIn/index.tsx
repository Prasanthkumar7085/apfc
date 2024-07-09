"use client"
import {
  TextField,
  InputAdornment,
  Icon,
  IconButton,
  Button,
  CircularProgress,
  Grid,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import { signInAPI } from "@/services/authAPIs";
import { setUserDetails } from "@/redux/Modules/userlogin";
import ErrorMessagesComponent from "@/components/Core/ErrorMessagesComponent";
import Image from "next/image";


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
    <div className="loginPage">
      <Grid container>
        <Grid item lg={8}>
          <picture>
            <img className="loginImg" alt="" src="/image@2x.jpg" />
          </picture>
        </Grid>
        <Grid item lg={4}>
          <div className="formContainer">
            <Image className="logoIcon" alt="" src="/logo.svg" height={90} width={10} />
                <p className="formTitle">LOGIN</p>
                <h2 className="formSubTitle">
                  Welcome to the Peepul Agri APFC Application
                </h2>
              <div className="inputsection">
                <div className="inputgroup">
                  <div className="inputusername">
                    <label className="label">User Name</label>
                    <TextField
                      className="inputtype"
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
                  <div className="inputpassword">
                    <div className="passwordgroup">
                      <label className="label">Password</label>
                      <TextField
                        className="inputtype"
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
                    <p className="forgotYourPassword">
                      Forgot Your Password?
                    </p>
                  </div>
                </div>
                <Button
                  className="inputbutton"
                  variant="contained"
                  onClick={() => router.push("/devices")}
                >
                  {loading ? (
                    <CircularProgress color="inherit" size={"1.8rem"} />
                  ) : (
                    "Login"
                  )}

                </Button>
              </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default LoginPage;
