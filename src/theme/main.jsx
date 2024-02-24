// themes.js
import { createTheme } from '@mui/material/styles';
import { blue, orange, green } from '@mui/material/colors';

// Dark Mode
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: orange[500],
    },
  },
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: green[200], // 设置 Checkbox 的默认颜色为浅橙色
          '&.Mui-checked': {
            color: green[200], // 设置 Checkbox 被选中时的颜色为浅橙色
          },
          '&.MuiCheckbox-indeterminate': {
            color: green[200], // 设置 Checkbox 为不定态时的颜色为浅橙色
          },
        },
      },
    },
  },
});

// Light Mode
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: orange[500],
    },
  },
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: blue[200], // 设置 Checkbox 的默认颜色为浅橙色
          '&.Mui-checked': {
            color: blue[200], // 设置 Checkbox 被选中时的颜色为浅橙色
          },
          '&.MuiCheckbox-indeterminate': {
            color: blue[200], // 设置 Checkbox 为不定态时的颜色为浅橙色
          },
        },
      },
    },
  },
});
