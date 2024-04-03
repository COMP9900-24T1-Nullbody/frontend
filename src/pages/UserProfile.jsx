/* eslint-disable no-unused-vars */
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
  FormHelperText,
  CircularProgress
} from "@mui/material";

import NavBar from "../components/NavBar";
import { Edit, Save } from "@mui/icons-material";
import UploadIcon from "@mui/icons-material/Upload";

import { Theme } from "../theme/main";
import Image01 from "../img/1.jpg";

import ErrorIcon from "@mui/icons-material/Cancel";
import CorrectIcon from "@mui/icons-material/CheckCircle";

import config from "../config.json";
import { LoginSocialGoogle, LoginSocialMicrosoft } from "reactjs-social-login";
import {
  GoogleLoginButton,
  MicrosoftLoginButton
} from "react-social-login-buttons";
import { green } from "@mui/material/colors";

export default function UserProfile() {
  const [themeColor, setThemeColor] = useState("");

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

  return (
    <ThemeProvider theme={createTheme(Theme(themeColor))}>
      <Box>
        <Box sx={{ m: 1 }}>
          <NavBar setThemeColor={setThemeColor} avatarImage={imageSrc} />
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
  const [isUploading, setIsUploading] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    // 将图片显示在页面上
    reader.onloadend = () => {
      // 将图片传到后端
      setIsUploading(true);
      handleImageUpload(reader.result);

      setImageSrc(reader.result);
    };
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
        }
        setIsUploading(false);
      })
      .catch((error) => {
        alert(
          "Error: Upload avatar to server failed, Please check server status."
        );
        console.error("Error:", error);
      });
  };

  return (
    <Box sx={{ position: "relative" }}>
      {isUploading ? (
        <CircularProgress size="10rem" /> // 上传中
      ) : (
        <>
          <input
            accept=".jpg,.jpeg,.png,.gif,.bmp"
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
        </>
      )}
    </Box>
  );
}

function ProfileForm({ userInfo, setUserInfo }) {
  const [nameEditable, setNameEditable] = React.useState(false);
  const [emailEditable, setEmailEditable] = React.useState(false);
  const [passwordEditable, setPasswordEditable] = React.useState(false);

  // error/helperText config
  const [EmailError, setEmailError] = useState(false);
  const [EmailMessage, setEmailMessage] = useState("");

  const [PasswordLenError, setPasswordLenError] = useState(false);
  const PasswordLenMessage = "Length is 8-16 characters.";

  const [PasswordLowError, setPasswordLowError] = useState(false);
  const PasswordLowMessage = "At least one lowercase letter.";

  const [PasswordUpperError, setPasswordUpperError] = useState(false);
  const PasswordUpperMessage = "At least one uppercase letter.";

  const [PasswordSpecialError, setPasswordSpecialError] = useState(false);
  const PasswordSpecialMessage = "At least one special character.";

  const handleEditName = () => setNameEditable((show) => !show);
  const handleEditEmail = () => setEmailEditable((show) => !show);
  const handleEditPassword = () => setPasswordEditable((show) => !show);

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
  const handleGoogleLinkChange = (google_id) => {
    const updatedUserInfo = {
      ...userInfo,
      Linked_Account: {
        ...userInfo.Linked_Account,
        Google: google_id
      }
    };
    setUserInfo(updatedUserInfo);
  };

  // 更改微软账户link
  const handleMicrosoftLinkChange = (microsoft_id) => {
    const updatedUserInfo = {
      ...userInfo,
      Linked_Account: {
        ...userInfo.Linked_Account,
        Microsoft: microsoft_id
      }
    };
    setUserInfo(updatedUserInfo);
  };

  const updateName = () => {
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: userInfo.Name,
        token: localStorage.getItem("token")
      })
    };

    fetch(`${config.BACKEND_URL}/update/name`, request)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert(data.message);
          localStorage.setItem("token", data.token);
        }
      })
      .catch((error) => {
        alert("Error: Update name failed, Please check server status.");
        console.error("Error:", error);
      });
  };

  const updateEmail = () => {
    if (validateEmail(userInfo.Email)) {
      const request = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: userInfo.Email,
          token: localStorage.getItem("token")
        })
      };

      fetch(`${config.BACKEND_URL}/update/email`, request)
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            alert(data.message);
            localStorage.setItem("token", data.token);
          }
        })
        .catch((error) => {
          alert("Error: Update email failed, Please check server status.");
          console.error("Error:", error);
        });

      return true;
    } else {
      alert("Please check email helperText, and fix it.");

      return false;
    }
  };

  const updatePassword = () => {
    const checkPasswordLen = validatePasswordLen(userInfo.Password);
    const checkPasswordLow = validatePasswordLow(userInfo.Password);
    const checkPasswordUpper = validatePasswordUpper(userInfo.Password);
    const checkPasswordSpecial = validatePasswordSpecial(userInfo.Password);

    if (
      checkPasswordLen &&
      checkPasswordLow &&
      checkPasswordUpper &&
      checkPasswordSpecial
    ) {
      const request = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          password: userInfo.Password,
          token: localStorage.getItem("token")
        })
      };

      fetch(`${config.BACKEND_URL}/update/password`, request)
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            alert(data.message);
            localStorage.setItem("token", data.token);
          }
        })
        .catch((error) => {
          alert("Error: Update password failed, Please check server status.");
          console.error("Error:", error);
        });

      return true;
    } else {
      alert("Please check password helperText, and fix it.");

      return false;
    }
  };

  const updateGoogleLink = (google_id) => {
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        google_id: google_id,
        token: localStorage.getItem("token")
      })
    };

    fetch(`${config.BACKEND_URL}/update/google_id`, request)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert(data.message);
          handleGoogleLinkChange(google_id);
          localStorage.setItem("token", data.token);
        }
      })
      .catch((error) => {
        alert("Error: Update Google link failed, Please check server status.");
        console.error("Error:", error);
      });
  };

  const updateMicrosoftLink = (microsoft_id) => {
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        microsoft_id: microsoft_id,
        token: localStorage.getItem("token")
      })
    };

    fetch(`${config.BACKEND_URL}/update/microsoft_id`, request)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert(data.message);
          handleMicrosoftLinkChange(microsoft_id);
          localStorage.setItem("token", data.token);
        }
      })
      .catch((error) => {
        alert(
          "Error: Update Microsoft link failed, Please check server status."
        );
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    if (validateEmail(userInfo.Email)) {
      setEmailError(false);
      setEmailMessage("Valid Email format!");
    } else {
      setEmailError(true);
      setEmailMessage("Invalid Email format!");
    }
  }, [userInfo.Email]);

  useEffect(() => {
    if (validatePasswordLen(userInfo.Password)) {
      setPasswordLenError(false);
    } else {
      setPasswordLenError(true);
    }

    if (validatePasswordLow(userInfo.Password)) {
      setPasswordLowError(false);
    } else {
      setPasswordLowError(true);
    }

    if (validatePasswordUpper(userInfo.Password)) {
      setPasswordUpperError(false);
    } else {
      setPasswordUpperError(true);
    }

    if (validatePasswordSpecial(userInfo.Password)) {
      setPasswordSpecialError(false);
    } else {
      setPasswordSpecialError(true);
    }
  }, [userInfo.Password]);

  return (
    <Stack spacing={2} sx={{ marginTop: 2, width: "70%" }}>
      {/* Name */}
      <FormControl variant="outlined">
        <InputLabel>Name</InputLabel>
        <OutlinedInput
          id="name"
          label="Name"
          disabled={nameEditable ? false : true}
          value={userInfo.Name}
          onChange={handleNameChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  if (nameEditable) {
                    updateName();
                  }
                  handleEditName();
                }}
                onMouseDown={handleMouseDown}
                edge="end"
              >
                {nameEditable ? <Save /> : <Edit />}
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
          disabled={emailEditable ? false : true}
          value={userInfo.Email}
          onChange={handleEmailChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  let updateResult = true;
                  if (emailEditable) {
                    updateResult = updateEmail();
                  }
                  if (updateResult) {
                    handleEditEmail();
                  }
                }}
                onMouseDown={handleMouseDown}
                edge="end"
              >
                {emailEditable ? <Save /> : <Edit />}
              </IconButton>
            </InputAdornment>
          }
        />
        <FormHelperText error={EmailError}>
          {EmailError ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ErrorIcon fontSize="small" /> {EmailMessage}
            </Box>
          ) : userInfo.Email !== "" ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: green[500]
              }}
            >
              <CorrectIcon fontSize="small" /> {EmailMessage}
            </Box>
          ) : (
            ""
          )}
        </FormHelperText>
      </FormControl>

      {/* Password */}
      <FormControl variant="outlined" error={userInfo.Password === ""}>
        <InputLabel>Password</InputLabel>
        <OutlinedInput
          id="password"
          label="Password"
          type={passwordEditable ? "text" : "password"}
          disabled={passwordEditable ? false : true}
          value={userInfo.Password}
          onChange={handlePasswordChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  let updateResult = true;
                  if (passwordEditable) {
                    updateResult = updatePassword();
                  }
                  if (updateResult) {
                    handleEditPassword();
                  }
                }}
                onMouseDown={handleMouseDown}
                edge="end"
              >
                {passwordEditable ? <Save /> : <Edit />}
              </IconButton>
            </InputAdornment>
          }
        />
        {userInfo.Password === "" ? (
          <FormHelperText id="component-error-text">
            Empty password if you sign-up with google or microsoft account.
            Please change it as soon as possible.
          </FormHelperText>
        ) : (
          <FormHelperText
            error={
              PasswordLenError ||
              PasswordLowError ||
              PasswordUpperError ||
              PasswordSpecialError
            }
          >
            {userInfo.Password === "" ? (
              "" // 不显示任何内容
            ) : (
              <Box>
                {PasswordLenError ? (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ErrorIcon fontSize="small" /> {PasswordLenMessage}
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: green[500]
                    }}
                  >
                    <CorrectIcon fontSize="small" /> {PasswordLenMessage}
                  </Box>
                )}
                {PasswordLowError ? (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ErrorIcon fontSize="small" /> {PasswordLowMessage}
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: green[500]
                    }}
                  >
                    <CorrectIcon fontSize="small" /> {PasswordLowMessage}
                  </Box>
                )}
                {PasswordUpperError ? (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ErrorIcon fontSize="small" /> {PasswordUpperMessage}
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: green[500]
                    }}
                  >
                    <CorrectIcon fontSize="small" /> {PasswordUpperMessage}
                  </Box>
                )}
                {PasswordSpecialError ? (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ErrorIcon fontSize="small" /> {PasswordSpecialMessage}
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: green[500]
                    }}
                  >
                    <CorrectIcon fontSize="small" /> {PasswordSpecialMessage}
                  </Box>
                )}
              </Box>
            )}
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
            updateGoogleLink(data.sub);
          }}
          onReject={(err) => {
            console.log(err);
          }}
        >
          <GoogleLoginButton>Link with Google account</GoogleLoginButton>
        </LoginSocialGoogle>
      ) : (
        <Typography>Linked with: Google ID - {userInfo.Linked_Account.Google}</Typography>
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
            updateMicrosoftLink(data.id);
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
          Linked with: Microsoft ID - {userInfo.Linked_Account.Microsoft}
        </Typography>
      )}
    </Stack>
  );
}

// Validate Email
function validateEmail(email) {
  if (email === "") {
    return true;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate Password
function validatePasswordLen(password) {
  // 长度为8-16个字符
  const lengthRegex = /^.{8,16}$/;
  if (!lengthRegex.test(password)) {
    return false;
  }

  return true;
}

function validatePasswordLow(password) {
  // 至少有一个小写字符
  const lowercaseRegex = /[a-z]/;
  if (!lowercaseRegex.test(password)) {
    return false;
  }

  return true;
}

function validatePasswordUpper(password) {
  // 至少有一个大写字符
  const uppercaseRegex = /[A-Z]/;
  if (!uppercaseRegex.test(password)) {
    return false;
  }

  return true;
}

function validatePasswordSpecial(password) {
  // 至少有一个特殊字符，这里使用自定义的特殊字符列表
  const specialChars = "!@#$%^&*()_+{}[\\]:\";'<>?,./|\\\\`~=-";
  const specialRegex = new RegExp(`[${specialChars}]`);
  if (!specialRegex.test(password)) {
    return false;
  }

  return true;
}

// Validate Confirm Password
function validateConfirmPassword(password, confirmPassword) {
  if (password === confirmPassword) {
    return true;
  } else {
    return false;
  }
}

ProfileAvatar.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  setImageSrc: PropTypes.func.isRequired
};

ProfileForm.propTypes = {
  userInfo: PropTypes.object.isRequired,
  setUserInfo: PropTypes.func.isRequired
};
