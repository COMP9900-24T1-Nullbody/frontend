import React, { useEffect, useState } from "react";

import NavBar from "../components/NavBar";
import CollapseSiderMenu from "../components/CollapseSideMenu";
import { Box, createTheme, ThemeProvider } from "@mui/material";

import ViewTable from "../components/Views/ViewTable";
import ViewBarChart from "../components/Views/ViewBarChart";
import ViewLineChart from "../components/Views/ViewLineChart";
import ViewPieChart from "../components/Views/ViewPieChart";

import { Theme } from "../theme/main";

import Image01 from "../img/1.jpg";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function MultiConpanyView() {
  const [themeColor, setThemeColor] = useState("");

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
            <CollapseSiderMenu />
          </Box>
          <Box flexGrow={1} sx={{ borderRadius: 2, boxShadow: 3, m: 1, p: 1 }}>
            <ViewTable />
            <ViewBarChart />
            <ViewLineChart />
            <ViewPieChart />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
