import React from "react";
import { Grid, TextField, Button, Box, Typography } from "@mui/material";
import CoverImage from "../img/cover.png";

function Register() {
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
          container
          rowSpacing={2}
          id="form-inputs"
          sx={{ display: "flex", justifyContent: "center", width: "70%" }}
        >
          {/* Register Form */}
          <Grid item xs={12}>
            <TextField
              required
              id="register-name"
              label="Name"
              variant="standard"
              sx={{ width: "100%", marginBottom: "10px" }}
            />
            <TextField
              required
              id="register-email"
              label="Email Address"
              variant="standard"
              sx={{ width: "100%", marginBottom: "10px" }}
            />
            <TextField
              required
              id="register-password"
              label="Password"
              variant="standard"
              sx={{ width: "100%", marginBottom: "10px" }}
            />
            <TextField
              required
              id="register-confirm-password"
              label="Confirm Password"
              variant="standard"
              sx={{ width: "100%", marginBottom: "10px" }}
            />
          </Grid>

          {/* Login Button */}
          <Grid item xs={12}>
            <Button variant="contained" sx={{ width: "100%" }}>
              SIGN UP
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Register;
