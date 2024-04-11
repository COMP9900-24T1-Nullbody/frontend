import React, { useEffect, useState } from "react";

import NavBar from "../components/NavBar";
import CollapseSiderMenu from "../components/CollapseSideMenu";
import { Box, createTheme, ThemeProvider } from "@mui/material";

import ViewTable from "../components/Views/ViewTable";

import { Theme } from "../theme/main";

import Image01 from "../img/1.jpg";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

import config from "../config.json";

export default function SingleCompanyView() {
  const [selectedFramework, setSelectedFramework] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  const [data, setData] = useState([]);

  useEffect(() => {
    if (selectedCompany && selectedFramework) {
      const request = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company_name: selectedCompany,
          framework: selectedFramework,
        }),
      };

      fetch(`${config.BACKEND_URL}/company_info/v3`, request)
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.error(data.error);
          } else {
            setData(data.Risks);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [selectedCompany, selectedFramework]);

  const [themeColor, setThemeColor] = useState(
    localStorage.getItem("theme-color")
  );
  useEffect(() => {
    localStorage.setItem("theme-color", themeColor);
  }, [themeColor]);

  const [imageSrc, setImageSrc] = useState(Image01);

  const navigate = useNavigate();

  // 添加解密逻辑
  useEffect(() => {
    const token = localStorage.getItem("token"); // 从localStorage获取token
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // 使用jwt-decode库解密token
        setImageSrc(decodedToken.avatar_url);
      } catch (error) {
        alert("Error: Token may be expired, Please Re-Login.");
        console.error("Token Decode Error：", error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    } else {
      alert("Error: Token not found, Please Re-Login.");
      navigate("/login");
    }
  }, []); // useEffect的依赖项为空数组，表示只在组件挂载时执行一次

  return (
    <ThemeProvider theme={createTheme(Theme(themeColor))}>
      <Box>
        <Box sx={{ m: 1 }}>
          <NavBar setThemeColor={setThemeColor} avatarImage={imageSrc} />
        </Box>

        <Box sx={{ display: "flex" }}>
          <Box>
            <CollapseSiderMenu
              data={data}
              setData={setData}
              setSelectedCompany={setSelectedCompany}
              setSelectedFramework={setSelectedFramework}
            />
          </Box>
          <Box flexGrow={1} sx={{ borderRadius: 2, boxShadow: 3, m: 1, p: 1 }}>
            <ViewTable data={data} />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
