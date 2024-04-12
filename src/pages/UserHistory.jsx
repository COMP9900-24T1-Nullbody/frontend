import React, { useEffect, useState } from "react";
import {
  Box,
  createTheme,
  ThemeProvider,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

import NavBar from "../components/NavBar";
import ResultTable from "../components/Views/ResultTable";

import { Theme } from "../theme/main";

import Image01 from "../img/1.jpg";

import config from "../config.json";

export default function UserHistory() {
  const [analysis_data, setAnalysisData] = useState(null);
  useEffect(() => {
    fetch(`${config.BACKEND_URL}/list/analysis`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error(data.error);
        } else {
          console.log(data.analysis_histories);
          setAnalysisData(data.analysis_histories);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    if (analysis_data) {
      // 处理 analysis_data，并将数据添加到 datas 和 timestamps 中
      const updatedDatas = [];
      const updatedTimestamps = [];

      analysis_data.forEach((item) => {
        // 处理数据并添加到 updatedDatas
        updatedDatas.push(item.data);
        // 添加时间戳到 updatedTimestamps
        updatedTimestamps.push(item.timestamp);
      });

      // 更新 state 中的数据
      setDatas(updatedDatas);
      setTimestamps(updatedTimestamps);
    }
  }, [analysis_data]);

  const [selected_timestamp, setSelectedTimestamp] = useState("");
  const [selected_data, setSelectedData] = useState([]);
  const [timestamps, setTimestamps] = useState([]);
  const [datas, setDatas] = useState([]);

  const handleListItemClick = (index) => {
    setSelectedTimestamp(timestamps[index]);
    setSelectedData(datas[index]);
  };

  const handleDeleteClick = () => {
    fetch(`${config.BACKEND_URL}/delete/analysis`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        timestamp: selected_timestamp,
        data: selected_data,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          console.error(data.error);
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // 从 datas 中删除 selected_data
    const updatedDatas = datas.filter((dataItem) => dataItem !== selected_data);
    setDatas(updatedDatas);

    // 从 timestamps 中删除 selected_timestamp
    const updatedTimestamps = timestamps.filter(
      (timestampItem) => timestampItem !== selected_timestamp
    );
    setTimestamps(updatedTimestamps);

    // 清空 selected_data 和 selected_timestamp
    setSelectedData([]);
    setSelectedTimestamp("");
  };

  // 主题色
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
      <Box sx={{ m: 1 }}>
        <NavBar setThemeColor={setThemeColor} avatarImage={imageSrc} />
      </Box>

      <Box display="flex" sx={{ m: 1 }}>
        {/* 侧边栏 */}
        {timestamps.length > 0 && (
          <Box
            sx={{
              borderRadius: 2,
              boxShadow: 3,
              m: 1,
            }}
          >
            <List component="nav" aria-label="mailbox folders">
              {timestamps.map((timestamp, index) => (
                <React.Fragment key={timestamp}>
                  {index > 0 && <Divider />}
                  <ListItem
                    button
                    onClick={() => handleListItemClick(index)}
                    sx={{
                      bgcolor: selected_timestamp === timestamp && "green",
                    }}
                  >
                    <ListItemText primary={timestamp} />
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </Box>
        )}
        {/* 主内容区 */}
        <Box
          flexGrow={1}
          sx={{
            borderRadius: 2,
            boxShadow: 3,
            m: 1,
            p: 1,
          }}
        >
          {selected_data.length > 0 && (
            <ResultTable data={selected_data} onDelete={handleDeleteClick} />
          )}
          {timestamps.length === 0 && datas.length === 0 && (
            <Typography variant="h5">No Analysis History Data</Typography>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
