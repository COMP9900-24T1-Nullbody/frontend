import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";
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
  FormHelperText
} from "@mui/material";

import NavBar from "../components/NavBar";
import { Edit, Save } from "@mui/icons-material";
import UploadIcon from "@mui/icons-material/Upload";

import { Theme } from "../theme/main";
import Image01 from "../img/1.jpg";

import config from "../config.json";
import { LoginSocialGoogle, LoginSocialMicrosoft } from "reactjs-social-login";
import {
  GoogleLoginButton,
  MicrosoftLoginButton
} from "react-social-login-buttons";

export default function UserProfile() {
  const [themeMode, setThemeMode] = useState("light");

  const [imageSrc, setImageSrc] = useState(Image01);
  const [userInfo, setUserInfo] = useState({
    Name: "-- Error: Token Decode Error, Please Re-Login --",
    Email: "-- Error: Token Decode Error, Please Re-Login --",
    Password: "-- Error: Token Decode Error, Please Re-Login --",
    Linked_Account: {
      Google: "",
      Microsoft: ""
    }
  });

  // 添加解密逻辑
  useEffect(() => {
    const token = localStorage.getItem("token"); // 从localStorage获取token
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // 使用jwt-decode库解密token
        // 更新user_info中的数据
        setUserInfo({
          Name: decodedToken.name,
          Email: decodedToken.email,
          Password: decodedToken.password,
          Linked_Account: {
            Google: decodedToken.google_id,
            Microsoft: decodedToken.microsoft_id
          }
        });
        setImageSrc(decodedToken.avatar_url);
      } catch (error) {
        console.error("Token Decode Error：", error);
      }
    }
  }, []); // useEffect的依赖项为空数组，表示只在组件挂载时执行一次

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
            alignItems: "center"
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
              height: "100vh"
            }}
          >
            <ProfileAvatar imageSrc={imageSrc} setImageSrc={setImageSrc} />
            <ProfileForm userInfo={userInfo} setUserInfo={setUserInfo} />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

function ProfileAvatar({ imageSrc, setImageSrc }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    // 将图片显示在页面上
    reader.onloadend = () => {
      // 将图片传到后端
      handleImageUpload(reader.result);

      setImageSrc(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (ImageData) => {
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        image: ImageData,
        token: localStorage.getItem("token")
      })
    };

    fetch(`${config.BACKEND_URL}/upload_avatar`, request)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert(data.message);
          localStorage.setItem("token", data.token);
          window.location.reload(); // 刷新页面
        }
      });
  };

  return (
    <Box sx={{ position: "relative" }}>
      <input
        accept="image/png, image/jpeg, image/jpg"
        type="file"
        onChange={handleImageChange}
        style={{ display: "none" }}
        id="raised-button-file"
      />
      <label htmlFor="raised-button-file">
        <IconButton
          component="span"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Avatar
            alt="User Avatar"
            src={imageSrc}
            sx={{
              minWidth: "250px",
              minHeight: "250px",
              filter: isHovered ? "grayscale(100%) blur(2px)" : "none",
              transition: "filter 0.3s ease-in-out"
            }}
          />
          {isHovered && (
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                borderRadius: 2,
                backgroundColor: "black",
                color: "#fff",
                padding: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <UploadIcon fontSize="large" />
              <Typography variant="h5" sx={{ marginLeft: "4px" }}>
                Upload
              </Typography>
            </Box>
          )}
        </IconButton>
      </label>
    </Box>
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
        Google: email
      }
    };
    setUserInfo(updatedUserInfo);
  };

  // 更改微软账户link
  const handleMicrosoftLinkChange = (email) => {
    const updatedUserInfo = {
      ...userInfo,
      Linked_Account: {
        ...userInfo.Linked_Account,
        Microsoft: email
      }
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
      <FormControl variant="outlined" error={userInfo.Password === ""}>
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
        {userInfo.Password === "" && (
          <FormHelperText id="component-error-text">
            Empty password if you sign-up with google or microsoft account.
            Please change it as soon as possible.
          </FormHelperText>
        )}
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

ProfileAvatar.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  setImageSrc: PropTypes.func.isRequired
};

ProfileForm.propTypes = {
  userInfo: PropTypes.object.isRequired,
  setUserInfo: PropTypes.func.isRequired
};
