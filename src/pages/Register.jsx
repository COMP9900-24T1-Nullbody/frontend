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
} from "@mui/material";

import { useGoogleLogin } from "@react-oauth/google";
import GoogleIcon from "@mui/icons-material/Google";
import MicrosoftIcon from "@mui/icons-material/Microsoft";

import CoverImage from "../img/cover.png";
import config from "../config.json";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const navigate = useNavigate();

  // Google OAuth
  const [GoogleId, setGoogleId] = useState("");
  const GoogleLogin = useGoogleLogin({
    onSuccess: (response) => GoogleonSuccess(response),
    onError: (error) => GoogleonFailure(error),
  });
  const GoogleonSuccess = async (response) => {
    console.log(response);
    const userInfo = await axios
      .get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${response.access_token}` },
      })
      .then((res) => res.data);

    console.log(userInfo);
    setName(userInfo.name);
    setEmail(userInfo.email);
    setGoogleId(userInfo.sub);
  };
  const GoogleonFailure = (error) => {
    console.log(error);
  };
  useEffect(() => {
    if (GoogleId != "") {
      fetch(`${config.BACKEND_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password: "",
          google_id: GoogleId,
        }),
      })
        .catch((error) => {
          console.error("Error:", error);
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
        });
    }
  }, [GoogleId]);

  const handleRegister = async () => {
    fetch(`${config.BACKEND_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        google_id: "",
      }),
    }).catch((error) => {
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
          flexDirection: "column",
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
              <Button
                variant="contained"
                sx={{ width: "100%" }}
                onClick={() => {
                  console.log("TODO: sign up with Microsoft account");
                }}
                startIcon={<MicrosoftIcon />}
              >
                Sign up with Microsoft account
              </Button>
            </Grid>

            {/* Sign Up with Google account */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                sx={{ width: "100%" }}
                onClick={() => GoogleLogin()}
                startIcon={<GoogleIcon />}
              >
                Sign up with Google account
              </Button>
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
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ width: "100%", marginBottom: "10px" }}
            />
            <TextField
              required
              id="register-email"
              label="Email Address"
              variant="standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ width: "100%", marginBottom: "10px" }}
            />
            <TextField
              required
              id="register-password"
              label="Password"
              variant="standard"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ width: "100%", marginBottom: "10px" }}
            />
            <TextField
              required
              id="register-confirm-password"
              label="Confirm Password"
              variant="standard"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{ width: "100%", marginBottom: "10px" }}
            />
          </Grid>

          {/* Sign Up Button */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{ width: "100%" }}
              onClick={handleRegister}
            >
              SIGN UP
            </Button>
          </Grid>

          {/* Already have an account */}
          <Grid item xs={12} textAlign={"center"}>
            Already have an account? <Link href="/login">Login here</Link>
          </Grid>
        </Grid>
      </Grid>

      {/* Dialog for displaying login result */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Register Result</DialogTitle>
        <DialogContent>{dialogContent}</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default Register;
