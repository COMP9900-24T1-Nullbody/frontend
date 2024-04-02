import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Link,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput,
} from "@mui/material";

import { LoginSocialGoogle, LoginSocialMicrosoft } from "reactjs-social-login";
import {
  GoogleLoginButton,
  MicrosoftLoginButton
} from "react-social-login-buttons";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ErrorIcon from "@mui/icons-material/Cancel";
import CorrectIcon from "@mui/icons-material/CheckCircle";

import CoverImage from "../img/cover.webp";
import config from "../config.json";
import { useNavigate } from "react-router-dom";
import { green } from "@mui/material/colors";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // navigate config
  const navigate = useNavigate();

  // shadow config
  const [boxShadow, setBoxShadow] = useState(3);

  // dialog config
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState("");

  // password visibility config
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // error/helperText config
  const [EmailError, setEmailError] = useState(false);
  const [EmailErrorMessage, setEmailErrorMessage] = useState("");
  useEffect(() => {
    if (validateEmail(email)) {
      setEmailError(false);
      setEmailErrorMessage("Email format is correct!");
    } else {
      setEmailError(true);
      setEmailErrorMessage("Invalid Email format!");
    }
  }, [email]);

  // auto-login with token only
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const request = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: "",
          password: "",
          google_id: "",
          microsoft_id: "",
          token: token
        })
      };
      handleLogin(request, false);
    }
  }, []);

  // OAuth
  const [GoogleProfile, setGoogleProfile] = useState([]);
  const [MicrosoftProfile, setMicrosoftProfile] = useState([]);
  useEffect(() => {
    if (GoogleProfile.length !== 0) {
      const request = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: GoogleProfile.email,
          password: "",
          google_id: GoogleProfile.sub,
          microsoft_id: "",
          token: ""
        })
      };
      handleLogin(request, true);
    } else if (MicrosoftProfile.length !== 0) {
      const request = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: MicrosoftProfile.mail,
          password: "",
          google_id: "",
          microsoft_id: MicrosoftProfile.id,
          token: ""
        })
      };
      handleLogin(request, true);
    }
  }, [GoogleProfile, MicrosoftProfile]);

  const handleNormalLogin = () => {
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password,
        google_id: "",
        microsoft_id: "",
        token: ""
      })
    };

    if (email === "" || password === "") {
      setDialogContent("Check if you filled in all the required fields.");
      setOpenDialog(true);
      return;
    }

    if (!EmailError) {
      handleLogin(request);
    } else {
      setDialogContent("Check your login form if there is any error message.");
      setOpenDialog(true);
    }
  };

  const handleLogin = (request, error_print = true) => {
    fetch(`${config.BACKEND_URL}/login`, request)
      .then((response) => {
        if (!response.ok) {
          console.error("Network response was not ok");
          return response.json();
        }
        return response.json(); // 这里移到下一个then中
      })
      .then((data) => {
        if (data.error) {
          if (error_print) {
            // 检查是否有错误消息
            setDialogContent(data.error);
            setOpenDialog(true);
          }
        } else {
          localStorage.setItem("token", data.token);
          console.log(data.token);

          setDialogContent(data.message);
          setOpenDialog(true);
          setTimeout(() => {
            navigate("/main");
          }, 1500);
        }
      })
      .catch((error) => {
        alert("Error: Login to server failed, Please check server status.");
        console.error("Error:", error);
      });
  };

  return (
    <Grid
      container
      width={"100vw"}
      height={"100vh"}
      justifyContent="center"
      alignItems="center"
    >
      {/* Cover Image */}
      <Grid item id="cover-img" xs={0} md={8} sx={{ display: { xs: "none", md: "block" } }}>
        <img src={CoverImage} alt="Login" style={{ maxWidth: "100%" }} />
      </Grid>

      {/* Form */}
      <Grid
        item
        id="form-section"
        xs={12}
        md={4}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          position: "relative", // 相对定位，用于覆盖在虚化背景上面
          zIndex: 1, // 提高层级，使得表单内容在虚化背景上方
          backgroundColor: "rgba(255, 255, 255, 0.8)", // 添加半透明背景
          padding: "20px", // 增加内边距
        }}
      >
        <Box
          boxShadow={boxShadow}
          sx={{
            borderRadius: 4,
            p: 4,
            width: "80%",
            transition: "box-shadow 0.5s ease" // 添加过渡效果
          }}
          onMouseEnter={() => {
            setBoxShadow(24);

            const coverImg = document.getElementById("cover-img");
            if (coverImg) {
              coverImg.style.filter = "blur(8px)"; // 让Cover Image 虚化
            }
          }}
          onMouseLeave={() => {
            setBoxShadow(3);

            const coverImg = document.getElementById("cover-img");
            if (coverImg) {
              coverImg.style.filter = "none"; // 恢复 Cover Image 正常显示
            }
          }}
        >
          <Grid
            container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column"
            }}
          >
            {/* Welcome Message */}
            <Grid item id="form-title" marginBottom={4}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h1" sx={{ fontSize: "2.5rem" }}>
                  Welcome!
                </Typography>
                <Typography variant="body1" sx={{ fontSize: "1.25rem" }}>
                  Log in to access your dashboard
                </Typography>
              </Box>
            </Grid>

            <Grid
              item
              container
              rowSpacing={2}
              id="form-inputs"
              sx={{ display: "flex", justifyContent: "center", width: "70%" }}
            >
              {/* Login with Microsoft account */}
              <Grid item xs={12}>
                <LoginSocialMicrosoft
                  client_id={config.MICROSOFT_CLIENTID}
                  redirect_uri={window.location.href}
                  scope={"openid profile User.Read email"}
                  onResolve={({ provider, data }) => {
                    console.log(provider);
                    console.log(data);
                    setMicrosoftProfile(data);
                  }}
                  onReject={(err) => {
                    console.log(err);
                  }}
                >
                  <MicrosoftLoginButton>
                    Login with Microsoft account
                  </MicrosoftLoginButton>
                </LoginSocialMicrosoft>
              </Grid>

              {/* Login with Google account */}
              <Grid item xs={12}>
                <LoginSocialGoogle
                  client_id={config.GOOGLE_CLIENTID}
                  redirect_uri={window.location.href}
                  onResolve={({ provider, data }) => {
                    console.log(provider);
                    console.log(data);
                    setGoogleProfile(data);
                  }}
                  onReject={(err) => {
                    console.log(err);
                  }}
                >
                  <GoogleLoginButton>
                    Login with Google account
                  </GoogleLoginButton>
                </LoginSocialGoogle>
              </Grid>

              <Grid item xs={12}>
                <Divider />
              </Grid>

              {/* Login Form */}
              <Grid item xs={12}>
                <TextField
                  required
                  id="login-email"
                  label="Email Address"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={EmailError}
                  helperText={
                    EmailError ? (
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <ErrorIcon fontSize="small" /> {EmailErrorMessage}
                      </Box>
                    ) : email !== "" ? (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: green[500]
                        }}
                      >
                        <CorrectIcon fontSize="small" /> {EmailErrorMessage}
                      </Box>
                    ) : (
                      ""
                    )
                  }
                  sx={{ width: "100%", marginBottom: "10px" }}
                />
                <FormControl
                  variant="outlined"
                  sx={{ width: "100%", marginBottom: "10px" }}
                >
                  <InputLabel htmlFor="standard-adornment-password">
                    Password *
                  </InputLabel>
                  <OutlinedInput
                    id="standard-adornment-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password *"
                  />
                </FormControl>
              </Grid>

              {/* Forgot Password Link */}
              <Grid item xs={12}>
                <Link href="/reset">Forgot password?</Link>
              </Grid>

              {/* Login Button */}
              <Grid item xs={12}>
                <Button
                  style={{ textTransform: "none" }}
                  variant="contained"
                  sx={{ width: "100%" }}
                  onClick={handleNormalLogin}
                >
                  Login
                </Button>
              </Grid>

              {/* Dont have an account */}
              <Grid item xs={12} textAlign={"center"}>
                Don&apos;t have an account?{" "}
                <Link href="/register">Register here</Link>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Grid>

      {/* Dialog for displaying login result */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Login Result</DialogTitle>
        <DialogContent>{dialogContent}</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

// Validate Email
function validateEmail(email) {
  if (email === "") {
    return true;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default Login;
