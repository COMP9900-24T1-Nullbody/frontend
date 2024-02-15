import React from "react";
import { Grid, TextField, Button } from "@mui/material";
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
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Grid item id="form-title" marginBottom={4}>
          <div style={{ textAlign: "center" }}>
            <h1 style={{ fontSize: "2.5rem" }}>Welcome!</h1>
            <p style={{ fontSize: "1.25rem" }}>
              Sign up to access your dashboard
            </p>
          </div>
        </Grid>

        <Grid
          container
          rowSpacing={2}
          id="form-inputs"
          style={{ display: "flex", justifyContent: "center", width: "70%" }}
        >
          {/* Register Form */}
          <Grid item xs={12}>
            <TextField
              required
              id="register-name"
              label="Name"
              variant="standard"
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <TextField
              required
              id="register-email"
              label="Email Address"
              variant="standard"
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <TextField
              required
              id="register-password"
              label="Password"
              variant="standard"
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <TextField
              required
              id="register-confirm-password"
              label="Confirm Password"
              variant="standard"
              style={{ width: "100%", marginBottom: "10px" }}
            />
          </Grid>

          {/* Login Button */}
          <Grid item xs={12}>
            <Button variant="contained" style={{ width: "100%" }}>
              SIGN UP
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Register;
