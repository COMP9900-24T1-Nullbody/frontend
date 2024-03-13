import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";

import config from "../config.json";
import CoverImage from "../img/cover.png";

function PasswordReset() {
  const initial_timer = 10;

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newpassword, setNewPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const [emailDisabled, setEmailDisabled] = useState(false);

  const [passwordshow, setPasswordShow] = useState(false);

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1); // 每秒减1
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  useEffect(() => {
    if (timer === 0) {
      setLoading(false);
    }
  }, [timer]);

  useEffect(() => {
    console.log(otp);
    if (otp.length === 6) {
      handleOTPSubmit();
    }
  }, [otp]);

  const handleOTPSubmit = () => {
    fetch(`${config.BACKEND_URL}/reset_password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: parseInt(otp),
        email,
        new_password: newpassword,
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
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSendVerificationCode = () => {
    fetch(`${config.BACKEND_URL}/request_reset_password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
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

          setEmailDisabled(true);
          setPasswordShow(true);

          setTimer(initial_timer);
          setLoading(true);
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
          alt="PasswordReset"
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
              Please confirm your email address to reset your password.
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
          {/* Password Reset Form */}
          <Grid item xs={12}>
            <TextField
              required
              id="reset-email"
              label="Email Address"
              variant="standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={emailDisabled}
              sx={{ width: "100%", marginBottom: "10px" }}
            />
          </Grid>

          {/* Show verification code TextField only when email is disabled */}
          {emailDisabled && (
            <Grid item xs={12}>
              <MuiOtpInput
                value={otp}
                TextFieldsProps={{ placeholder: "-" }}
                onChange={handleChange}
                length={6}
              />
            </Grid>
          )}

          {/* Password Reset Form */}
          {passwordshow && (
            <Grid item xs={12}>
              <TextField
                required
                id="new-password"
                label="New Password"
                variant="standard"
                type="password"
                value={newpassword}
                onChange={(e) => setNewPassword(e.target.value)}
                sx={{ width: "100%", marginBottom: "10px" }}
              />
            </Grid>
          )}

          {/* Send Verification Code Button */}
          <Grid item xs={12}>
            <Button
              style={{ textTransform: "none" }}
              variant="contained"
              sx={{ width: "100%" }}
              disabled={loading || timer > 0}
              onClick={handleSendVerificationCode}
            >
              {loading ? (
                <>
                  <CircularProgress
                    size={24}
                    variant="determinate"
                    value={((initial_timer - timer) / initial_timer) * 100}
                  />
                  `Resend in {timer}s`
                </>
              ) : (
                "Send Verification Code"
              )}
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {/* Dialog for displaying password reset result */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Password Reset Result</DialogTitle>
        <DialogContent>{dialogContent}</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default PasswordReset;
