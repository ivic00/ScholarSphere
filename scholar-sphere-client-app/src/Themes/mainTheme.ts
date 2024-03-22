import { ThemeOptions, createTheme } from "@mui/material";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#ff4545",
      light: "#ff6a6a",
      dark: "#b23030",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#45fdff",
      light: "#6afdff",
      dark: "#30b1b2",
      contrastText: "rgba(0,0,0,0.87)",
    },
    error: {
      main: "#c70009",
      light: "#d2333a",
      dark: "#8b0006",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#ffa726",
      light: "#ffb851",
      dark: "#b2741a",
      contrastText: "rgba(0,0,0,0.87)",
    },
    success: {
      main: "#66bb6a",
      light: "#84c887",
      dark: "#47824a",
      contrastText: "rgba(0,0,0,0.87)",
    },
    divider: "rgba(255,255,255,0.12)",
    text: {
      primary: "rgba(0,0,0,0.87)",
      secondary: "#000000",
      disabled: "#000000"
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    info: {
      main: "#0288d1",
      light: "#349fda",
      dark: "#015f92",
      contrastText: "#ffffff",
    },
  },
  typography: {
    h4: {
      fontSize: "1.7rem",
    },
    fontFamily: "Roboto Mono",
  },
};
const mainTheme = createTheme(themeOptions);

export default mainTheme;
