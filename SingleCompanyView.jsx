import React, { useEffect, useState } from "react";
import { Box, createTheme, ThemeProvider, IconButton } from "@mui/material";
import NavBar from "../components/NavBar";
import CollapseSiderMenu from "../components/CollapseSideMenu";
import ViewTable from "../components/Views/ViewTable";
import { Theme } from "../theme/main";
import Image01 from "../img/1.jpg";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function SingleCompanyView() {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [themeColor, setThemeColor] = useState("");
  const [imageSrc, setImageSrc] = useState(Image01);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true); // 新增状态来控制侧边栏的展开状态
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

  // 切换侧边栏展开状态的函数
  const toggleDrawer = () => {
    setIsDrawerOpen((prevState) => !prevState);
  };

  return (
    <ThemeProvider theme={createTheme(Theme(themeColor))}>
      <Box>
        <Box sx={{ m: 1 }}>
          <NavBar setThemeColor={setThemeColor} avatarImage={imageSrc} setSelectedCompany={setSelectedCompany}/>
        </Box>

        <Box sx={{ display: "flex" }}>
          <Box sx={{ width: isDrawerOpen ? 250 : 0, overflow: 'hidden', transition: 'width 0.5s', borderRadius: 2, boxShadow: 3, m: 1 }}>
            <CollapseSiderMenu />
          </Box>
          {/* 折叠/展开按钮固定在侧边栏的右边并居中显示 */}
          <Box sx={{ position: 'sticky', top: 0, zIndex: 1, marginLeft: 'auto', marginRight: 'auto' }}>
            <IconButton onClick={toggleDrawer}>
              {isDrawerOpen ? <MenuIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
          <Box flexGrow={1} sx={{ borderRadius: 2, boxShadow: 3, m: 1, p: 1 }}>
            <ViewTable selectedCompany={selectedCompany} />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
