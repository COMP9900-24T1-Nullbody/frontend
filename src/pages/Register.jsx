import React, { useState } from "react";
import { Grid, TextField, Button, Box, Typography, Link } from "@mui/material";
import CoverImage from "../img/cover.png";
import config from "../config.json";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await fetch(
        `${config.BACKEND_URL}:${config.BACKEND_PORT}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name, email, password })
        }
      );
      const data = await response.json();
      console.log(data); // You can handle the response here
    } catch (error) {
      console.error("Error:", error);
    }
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
    </Grid>
  );
}

export default Register;
