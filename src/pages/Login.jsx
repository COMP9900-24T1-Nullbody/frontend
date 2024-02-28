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
} from "@mui/material";

import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";

import MicrosoftIcon from "@mui/icons-material/Microsoft";

import CoverImage from "../img/cover.png";
import config from "../config.json";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const navigate = useNavigate();

  // Google OAuth
  const [GoogleProfile, setGoogleProfile] = useState([]);
  const clientId = config.GOOGLE_CLIENTID;
  useEffect(() => {
    const initClient = () => {
      gapi.auth2.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });
  const GoogleonSuccess = async (res) => {
    setGoogleProfile(res.profileObj);

    fetch(`${config.BACKEND_URL}:${config.BACKEND_PORT}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "",
        password: "",
        google_id: GoogleProfile.googleId,
      }),
    })
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
  const GoogleonFailure = (err) => {
    console.log("failed", err);
  };

  const handleLogin = () => {
    fetch(`${config.BACKEND_URL}:${config.BACKEND_PORT}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, google_id: "" }),
    })
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

  const handleCloseDialog = () => {
    setOpenDialog(false);
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
          flexDirection: "column",
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
            <Button
              variant="contained"
              sx={{ width: "100%" }}
              onClick={() => {
                console.log("TODO: Login with Microsoft account");
              }}
              startIcon={<MicrosoftIcon />}
            >
              Login with Microsoft account
            </Button>
          </Grid>

          {/* Login with Google account */}
          <Grid item xs={12}>
            <GoogleLogin
              clientId={clientId}
              buttonText="Login with Google account"
              onSuccess={GoogleonSuccess}
              onFailure={GoogleonFailure}
              cookiePolicy={"single_host_origin"}
              isSignedIn={true}
            />
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
            <Link href="#">Forgot password?</Link>
          </Grid>

          {/* Login Button */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{ width: "100%" }}
              onClick={handleLogin}
            >
              LOG IN
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
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Login Result</DialogTitle>
        <DialogContent>{dialogContent}</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default Login;
