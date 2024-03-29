import { lightGreen } from "@mui/material/colors";
export const Theme = (mode) => ({
  palette: {
    mode,
    primary: {
      ...(mode === "dark"
        ? {
            main: "#000000", // 将主色调设置为黑色
          }
        : {
            main: lightGreen[300],
          }),
    },
  },
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: mode === "dark" ? "#000000" : lightGreen[200], // 根据模式设置颜色
          "&.Mui-checked": {
            color: mode === "dark" ? "#000000" : lightGreen[200], // 根据模式设置颜色
          },
          "&.MuiCheckbox-indeterminate": {
            color: mode === "dark" ? "#000000" : lightGreen[200], // 根据模式设置颜色
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: mode === "dark" ? "#000000" : lightGreen[200], // 根据模式设置颜色
          "&.Mui-checked": {
            color: mode === "dark" ? "#000000" : lightGreen[200], // 根据模式设置颜色
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: mode === "dark" ? "#000000" : lightGreen[200], // 根据模式设置颜色
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          "&.MuiAppBar-positionStatic": {
            backgroundColor: mode === "dark" ? "#000000" : lightGreen[200], // 根据模式设置颜色
          },
        },
      },
    },
  },
});
