import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  createTheme,
  ThemeProvider,
  Avatar,
  Stack,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";

import NavBar from "../components/NavBar";
import { Edit, Save } from "@mui/icons-material";

import { Theme } from "../theme/main";
import Image01 from "../img/1.jpg";

import config from "../config.json";
import { LoginSocialGoogle, LoginSocialMicrosoft } from "reactjs-social-login";
import {
  GoogleLoginButton,
  MicrosoftLoginButton,
} from "react-social-login-buttons";

export default function UserProfile() {
  const [themeMode, setThemeMode] = useState("light");

  const [userInfo, setUserInfo] = useState({
    Name: "Sample Name",
    Email: "Sample@Email.com",
    Password: "Sample Password",
    Linked_Account: {
      Google: "",
      Microsoft: "",
    },
  });

  const toggleThemeMode = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider
      theme={
        themeMode === "light"
          ? createTheme(Theme("light"))
          : createTheme(Theme("dark"))
      }
    >
      <Box>
        <Box sx={{ m: 1 }}>
          <NavBar toggleThemeMode={toggleThemeMode} />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 2,
              boxShadow: 3,
              m: 1,
              p: 1,
              width: "50%",
              height: "100vh",
            }}
          >
            <ProfileAvatar />
            <ProfileForm userInfo={userInfo} setUserInfo={setUserInfo} />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

function ProfileAvatar() {
  return (
    <Avatar
      alt="Remy Sharp"
      src={Image01}
      sx={{
        minWidth: "250px",
        minHeight: "250px",
      }}
    />
  );
}

function ProfileForm({ userInfo, setUserInfo }) {
  const [editName, setEditName] = React.useState(false);
  const [editEmail, setEditEmail] = React.useState(false);
  const [editPassword, setEditPassword] = React.useState(false);

  const handleEditName = () => setEditName((show) => !show);
  const handleEditEmail = () => setEditEmail((show) => !show);
  const handleEditPassword = () => setEditPassword((show) => !show);

  const handleMouseDown = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  // 更改姓名
  const handleNameChange = (event) => {
    const updatedUserInfo = { ...userInfo, Name: event.target.value };
    setUserInfo(updatedUserInfo);
  };
  // 更改Email
  const handleEmailChange = (event) => {
    const updatedUserInfo = { ...userInfo, Email: event.target.value };
    setUserInfo(updatedUserInfo);
  };
  // 更改Password
  const handlePasswordChange = (event) => {
    const updatedUserInfo = { ...userInfo, Password: event.target.value };
    setUserInfo(updatedUserInfo);
  };

  // 更改谷歌账户link
  const handleGoogleLinkChange = (email) => {
    const updatedUserInfo = {
      ...userInfo,
      Linked_Account: {
        ...userInfo.Linked_Account,
        Google: email,
      },
    };
    setUserInfo(updatedUserInfo);
  };

  // 更改微软账户link
  const handleMicrosoftLinkChange = (email) => {
    const updatedUserInfo = {
      ...userInfo,
      Linked_Account: {
        ...userInfo.Linked_Account,
        Microsoft: email,
      },
    };
    setUserInfo(updatedUserInfo);
  };

  return (
    <Stack spacing={2} sx={{ marginTop: 2, width: "70%" }}>
      {/* Name */}
      <FormControl variant="outlined">
        <InputLabel>Name</InputLabel>
        <OutlinedInput
          id="name"
          label="Name"
          disabled={editName ? false : true}
          value={userInfo.Name}
          onChange={handleNameChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleEditName}
                onMouseDown={handleMouseDown}
                edge="end"
              >
                {editName ? <Save /> : <Edit />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      {/* Email */}
      <FormControl variant="outlined">
        <InputLabel>Email</InputLabel>
        <OutlinedInput
          id="email"
          label="Email"
          disabled={editEmail ? false : true}
          value={userInfo.Email}
          onChange={handleEmailChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleEditEmail}
                onMouseDown={handleMouseDown}
                edge="end"
              >
                {editEmail ? <Save /> : <Edit />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      {/* Password */}
      <FormControl variant="outlined">
        <InputLabel>Password</InputLabel>
        <OutlinedInput
          id="password"
          label="Password"
          type={editPassword ? "text" : "password"}
          disabled={editPassword ? false : true}
          value={userInfo.Password}
          onChange={handlePasswordChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleEditPassword}
                onMouseDown={handleMouseDown}
                edge="end"
              >
                {editPassword ? <Save /> : <Edit />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      {/* Google Link */}
      {userInfo.Linked_Account.Google === "" ? (
        <LoginSocialGoogle
          client_id={config.GOOGLE_CLIENTID}
          redirect_uri={window.location.href}
          onResolve={({ provider, data }) => {
            console.log(provider);
            console.log(data);
            handleGoogleLinkChange(data.email);
          }}
          onReject={(err) => {
            console.log(err);
          }}
        >
          <GoogleLoginButton>Link with Google account</GoogleLoginButton>
        </LoginSocialGoogle>
      ) : (
        <Typography>Linked with: {userInfo.Linked_Account.Google}</Typography>
      )}

      {/* Microsoft Link */}
      {userInfo.Linked_Account.Microsoft === "" ? (
        <LoginSocialMicrosoft
          client_id={config.MICROSOFT_CLIENTID}
          redirect_uri={window.location.href}
          scope={"openid profile User.Read email"}
          onResolve={({ provider, data }) => {
            console.log(provider);
            console.log(data);
            handleMicrosoftLinkChange(data.mail);
          }}
          onReject={(err) => {
            console.log(err);
          }}
        >
          <MicrosoftLoginButton>
            Link with Microsoft account
          </MicrosoftLoginButton>
        </LoginSocialMicrosoft>
      ) : (
        <Typography>
          Linked with: {userInfo.Linked_Account.Microsoft}
        </Typography>
      )}
    </Stack>
  );
}

ProfileForm.propTypes = {
  userInfo: PropTypes.object.isRequired,
  setUserInfo: PropTypes.func.isRequired,
};
