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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessages, setErrorMessages] = useState<any>();
  const [invalid, setInvalid] = useState<any>();

  const signIn = async (e: any) => {
    e.preventDefault();
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
        setInvalid(null);
        router.push("/devices")
      } else if (response.status == 422) {
        setErrorMessages(response.error_data);
        setInvalid(null);
        throw response;
      } else if (response.status === 401) {
        setInvalid(response.message);
        setErrorMessages(null);
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
      <div className="loginContainer">
        <div className="leftContainer">
          <picture>
            <img className="loginImg" alt="" src="/login-image.png" />
          </picture>
        </div>
        <div className="rightContainer" >
          <div className="formContainer">
            <Image className="logoIcon" alt="" src="/logo.svg" height={90} width={10} />
            <p className="formTitle">LOGIN</p>
            <h2 className="formSubTitle">
              Welcome to the Peepul Agri APFC Application
            </h2>
            <div className="formsBlock">
              <div className="InputFeild">
                <label className="formLabel">User Name</label>
                <TextField
                  autoComplete="new-email"
                  variant="outlined"
                  name="email"
                  type={"text"}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrorMessages(null);
                    setInvalid(null);
                  }}
                />
                <ErrorMessagesComponent errorMessage={errorMessages?.email} />
              </div>
              <div className="InputFeild">
                <label className="formLabel">Password</label>
                <TextField
                  autoComplete="new-password"
                  variant="outlined"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMessages(null);
                    setInvalid(null);
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={togglePasswordVisibility} edge="end">
                          {showPassword ? <VisibilityOff sx={{ fontSize: "1.2rem" }} /> : <Visibility sx={{ fontSize: "1.2rem" }} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <ErrorMessagesComponent errorMessage={errorMessages?.password} />
                <p style={{ color: "red" }}>{invalid}</p>
                <div className="forgotBtnGrp">

                  <Button variant="text" className="forgotBtn">
                    Forgot Your Password ?
                  </Button>
                </div>
              </div>
              <Button
                className="loginBtn"
                variant="contained"
                fullWidth
                onClick={signIn}
              >
                {loading ? (
                  <CircularProgress color="inherit" size={"1rem"} />
                ) : (
                  "Login"
                )}

              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
