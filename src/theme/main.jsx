import { blue, orange, deepOrange, blueGrey } from "@mui/material/colors";

export const Theme = (mode) => ({
  palette: {
    mode,
    primary: {
      ...(mode === "dark"
        ? {
            main: orange[500]
          }
        : {
            main: deepOrange[300]
          })
    }
  },
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: mode === "dark" ? blueGrey[200] : blue[200], // 根据模式设置颜色
          "&.Mui-checked": {
            color: mode === "dark" ? blueGrey[200] : blue[200] // 根据模式设置颜色
          },
          "&.MuiCheckbox-indeterminate": {
            color: mode === "dark" ? blueGrey[200] : blue[200] // 根据模式设置颜色
          }
        }
      }
    }
  }
});
