import React from "react";
import { Grid, TextField, Button, Link } from "@mui/material";
import CoverImage from "../img/cover.png";

function Login() {
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
            <h1 style={{ fontSize: "2.5rem" }}>Welcome Back!</h1>
            <p style={{ fontSize: "1.25rem" }}>
              Log in to access your dashboard
            </p>
          </div>
        </Grid>

        <Grid
          container
          rowSpacing={2}
          id="form-inputs"
          style={{ display: "flex", justifyContent: "center", width: "70%" }}
        >
          {/* Login Form */}
          <Grid item xs={12}>
            <TextField
              required
              id="login-email"
              label="Email Address"
              variant="standard"
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <TextField
              required
              id="login-password"
              label="Password"
              variant="standard"
              style={{ width: "100%", marginBottom: "10px" }}
            />
          </Grid>

          {/* Forgot Password Link */}
          <Grid item xs={12}>
            <Link href="#">Forgot password?</Link>
          </Grid>

          {/* Login Button */}
          <Grid item xs={12}>
            <Button variant="contained" style={{ width: "100%" }}>
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
    </Grid>
  );
}

export default Login;
