import { orange, lightGreen } from "@mui/material/colors";

export const Theme = (mode) => ({
  palette: {
    mode,
    primary: {
      ...(mode === "dark"
        ? {
            main: orange[500],
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
          color: mode === "dark" ? orange[200] : lightGreen[200], // 根据模式设置颜色
          "&.Mui-checked": {
            color: mode === "dark" ? orange[200] : lightGreen[200], // 根据模式设置颜色
          },
          "&.MuiCheckbox-indeterminate": {
            color: mode === "dark" ? orange[200] : lightGreen[200], // 根据模式设置颜色
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: mode === "dark" ? orange[200] : lightGreen[200], // 根据模式设置颜色
          "&.Mui-checked": {
            color: mode === "dark" ? orange[200] : lightGreen[200], // 根据模式设置颜色
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: mode === "dark" ? orange[200] : lightGreen[200], // 根据模式设置颜色
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          "&.MuiAppBar-positionStatic": {
            backgroundColor: mode === "dark" ? orange[200] : lightGreen[200], // 根据模式设置颜色
          },
        },
      },
    },
  },
});
