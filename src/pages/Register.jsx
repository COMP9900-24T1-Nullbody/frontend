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
  DialogActions
} from "@mui/material";

import { LoginSocialGoogle, LoginSocialMicrosoft } from "reactjs-social-login";
import {
  GoogleLoginButton,
  MicrosoftLoginButton
} from "react-social-login-buttons";

import CoverImage from "../img/cover.png";
import config from "../config.json";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const navigate = useNavigate();

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
    handleRegister(request);
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
    {/* 封面图片，使用sx属性添加媒体查询来控制显示/隐藏 */}
    <Grid item sm={8} md={8} sx={{ display: { md: 'block', xs: 'none' } }}>
      <img
        src={CoverImage}
        alt="Login"
        style={{ width: "100%", height: "100%", display: "block" }}
      />
    </Grid>

    {/* 表单 */}
    <Grid
      item
      xs={12} // 当封面图片隐藏时占满所有可用空间
      md={4} // 默认情况下占据部分空间
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%', // 确保在封面图片隐藏时此项占满所有可用空间
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
              onClick={handleNormalRegister}
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

export default Register;
