import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Box,
  Typography,
  Link,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  FormHelperText,
  OutlinedInput
} from "@mui/material";

import { LoginSocialGoogle, LoginSocialMicrosoft } from "reactjs-social-login";
import {
  GoogleLoginButton,
  MicrosoftLoginButton
} from "react-social-login-buttons";

import PasswordStrengthBar from "react-password-strength-bar";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import CoverImage from "../img/cover.webp";
import config from "../config.json";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // navigate config
  const navigate = useNavigate();

  // dialog config
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState("");

  // password visibility config
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // error/helperText config
  const [EmailError, setEmailError] = useState(false);
  const [ConfirmPasswordError, setConfirmPasswordError] = useState(false);
  useEffect(() => {
    if (validateEmail(email)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  }, [email]);

  useEffect(() => {
    if (validateConfirmPassword(password, confirmPassword)) {
      setConfirmPasswordError(false);
    } else {
      setConfirmPasswordError(true);
    }
  }, [password, confirmPassword]);

  // Google OAuth
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
          name: GoogleProfile.name,
          email: GoogleProfile.email,
          password: "",
          google_id: GoogleProfile.sub,
          microsoft_id: "",
          token: ""
        })
      };
      handleRegister(request);
    } else if (MicrosoftProfile.length !== 0) {
      const request = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: MicrosoftProfile.displayName,
          email: MicrosoftProfile.mail,
          password: "",
          google_id: "",
          microsoft_id: MicrosoftProfile.id,
          token: ""
        })
      };
      handleRegister(request);
    }
  }, [GoogleProfile, MicrosoftProfile]);

  const handleNormalRegister = () => {
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password,
        google_id: "",
        microsoft_id: "",
        token: ""
      })
    };

    if (!EmailError && !ConfirmPasswordError) {
      handleRegister(request);
    } else {
      setDialogContent(
        "Check your register form if there is any error message."
      );
      setOpenDialog(true);
    }
  };

  const handleRegister = (request) => {
    fetch(`${config.BACKEND_URL}/register`, request)
      .then((response) => {
        if (!response.ok) {
          console.error("Network response was not ok");
          return response.json();
        }
        return response.json(); // 这里移到下一个then中
      })
      .then((data) => {
        if (data.error) {
          // 检查是否有错误消息
          setDialogContent(data.error);
          setOpenDialog(true);
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
        console.error("Error:", error);
      });
  };

  return (
    <Grid container width={"100vw"} height={"100vh"}>
      {/* Cover Image */}
      <Grid item id="cover-img" xs={8}>
        <img
          src={CoverImage}
          alt="Register"
          style={{ width: "100%", height: "100%", display: "block" }}
        />
      </Grid>

      {/* Form */}
      <Grid
        item
        container
        id="form-section"
        xs={4}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column"
        }}
      >
        <Grid item id="form-title" marginBottom={4}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h1" sx={{ fontSize: "2.5rem" }}>
              Welcome!
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1.25rem" }}>
              Sign up to access your dashboard
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
          <Grid item container spacing={2}>
            {/* Sign Up with Microsoft account */}
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
                  Sign up with Microsoft account
                </MicrosoftLoginButton>
              </LoginSocialMicrosoft>
            </Grid>

            {/* Sign Up with Google account */}
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
                  Sign up with Google account
                </GoogleLoginButton>
              </LoginSocialGoogle>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {/* Register Form */}
          <Grid item xs={12}>
            <TextField
              required
              id="register-name"
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ width: "100%", marginBottom: "10px" }}
            />
            <TextField
              required
              id="register-email"
              label="Email Address"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={EmailError}
              helperText={EmailError ? "Invalid Email format!" : ""}
              sx={{ width: "100%", marginBottom: "10px" }}
            />

            <FormControl
              variant="outlined"
              sx={{ width: "100%", marginBottom: "10px" }}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password *
              </InputLabel>
              <OutlinedInput
                id="register-password"
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

            {password !== "" && <PasswordStrengthBar password={password} />}

            <FormControl
              variant="outlined"
              sx={{ width: "100%", marginBottom: "10px" }}
            >
              <InputLabel htmlFor="outlined-adornment-confirm-password">
                Confirm Password *
              </InputLabel>
              <OutlinedInput
                id="register-confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={ConfirmPasswordError}
                helperText={ConfirmPasswordError ? "Password mismatch!" : ""}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password *"
              />
              <FormHelperText error={ConfirmPasswordError}>
                {ConfirmPasswordError ? "Password mismatch!" : ""}
              </FormHelperText>
            </FormControl>
          </Grid>

          {/* Sign Up Button */}
          <Grid item xs={12}>
            <Button
              style={{ textTransform: "none" }}
              variant="contained"
              sx={{ width: "100%" }}
              onClick={handleNormalRegister}
            >
              Sign Up
            </Button>
          </Grid>

          {/* Already have an account */}
          <Grid item xs={12} textAlign={"center"}>
            Already have an account? <Link href="/login">Login here</Link>
          </Grid>
        </Grid>
      </Grid>

      {/* Dialog for displaying login result */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Register Result</DialogTitle>
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

// Validate Confirm Password
function validateConfirmPassword(password, confirmPassword) {
  if (password === confirmPassword) {
    return true;
  } else {
    return false;
  }
}

export default Register;
