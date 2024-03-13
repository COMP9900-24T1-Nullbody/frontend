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
  Divider
} from "@mui/material";

import { LoginSocialGoogle, LoginSocialMicrosoft } from "reactjs-social-login";
import {
  GoogleLoginButton,
  MicrosoftLoginButton
} from "react-social-login-buttons";

import CoverImage from "../img/cover.png";
import config from "../config.json";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const navigate = useNavigate();

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
      handleLogin(request);
    }
  }, []);

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
          email: GoogleProfile.email,
          password: "",
          google_id: GoogleProfile.sub,
          microsoft_id: "",
          token: ""
        })
      };
      handleLogin(request);
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
      handleLogin(request);
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
    handleLogin(request);
  };

  const handleLogin = (request) => {
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
          alt="Login"
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
              <GoogleLoginButton>Login with Google account</GoogleLoginButton>
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
              variant="standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ width: "100%", marginBottom: "10px" }}
            />
            <TextField
              required
              id="login-password"
              label="Password"
              variant="standard"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ width: "100%", marginBottom: "10px" }}
            />
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

export default Login;
