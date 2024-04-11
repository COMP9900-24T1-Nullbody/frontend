import React, { useEffect, useState } from "react";
import {
  Box,
  createTheme,
  ThemeProvider,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

import NavBar from "../components/NavBar";
import ViewTable from "../components/Views/ViewTable";

import { Theme } from "../theme/main";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Image01 from "../img/1.jpg";

export default function UserHistory() {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

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

  const companies = ["Company_01", "Company_02", "Company_03"];

  const toggleDrawer = () => {
    setIsDrawerOpen((prevState) => !prevState);
  };

  // 修改点：总是显示折叠/展开按钮，而不是将其放在侧边栏内部
  const renderMenuButton = () => (
    <IconButton onClick={toggleDrawer}>
      {isDrawerOpen ? <MenuIcon /> : <ExpandMoreIcon />}
    </IconButton>
  );

  return (
    <ThemeProvider theme={createTheme(Theme(themeColor))}>
      <NavBar setThemeColor={setThemeColor} avatarImage={imageSrc} />
      <Box display="flex" sx={{ m: 1 }}>
        {/* 侧边栏外的折叠/展开按钮 */}
        {renderMenuButton()}
        {/* 侧边栏 */}
        <Box
          sx={{
            width: isDrawerOpen ? 250 : 0,
            overflow: "hidden",
            transition: "width 0.5s",
            borderRadius: 2,
            boxShadow: 3,
            m: 1,
          }}
        >
          <List component="nav" aria-label="mailbox folders">
            {isDrawerOpen &&
              companies.map((company, index) => (
                <React.Fragment key={company}>
                  {index > 0 && <Divider />}
                  <ListItem
                    button
                    selected={selectedCompany === company}
                    onClick={() => setSelectedCompany(company)}
                    sx={{
                      borderBottom:
                        selectedCompany === company && "1.5px solid black",
                    }}
                  >
                    <ListItemText primary={company} />
                  </ListItem>
                </React.Fragment>
              ))}
          </List>
        </Box>
        {/* 主内容区 */}
        <Box
          flexGrow={1}
          sx={{
            transition: "margin-left 0.5s",
            marginLeft: isDrawerOpen ? 0 : 60,
            borderRadius: 2,
            boxShadow: 3,
            m: 1,
            p: 1,
          }}
        >
          {selectedCompany && (
            <>
              <ViewTable company={selectedCompany} />
            </>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
