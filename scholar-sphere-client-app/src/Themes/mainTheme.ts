import { ThemeOptions, createTheme } from "@mui/material";
const glassyBackgroundPrimary = {
  background: "rgba(38, 166, 154, 0.5);",
  borderRadius: "16px",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(4.3px)",
  "-webkit-backdrop-filter": "blur(4.3px)",
};
const glassyBackground = {
  background: "rgba(255, 255, 255, 0.5);",
  borderRadius: "16px",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(4px)",
  "-webkit-backdrop-filter": "blur(4.3px)",

}
export const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#26a69a",
    },
    secondary: {
      main: "#A62632",
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
      contrastText: "#ffffff",
    },
    divider: "rgba(255,255,255,0.12)",
    text: {
      primary: "rgba(0,0,0,0.87)",
      secondary: "#000000",
      disabled: "#000000",
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
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 5,
      },
      styleOverrides: {
        root: {
          borderRadius: "12px",
          marginRight: "2.5vw",
          marginTop: "1.5vh",
          width: "95%",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
        },
      },
    },
    MuiButtonGroup: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderBottomLeftRadius: "25px",
          borderTopLeftRadius: "25px",
          boxShadow: 'none',
          backgroundColor: "rgba(255, 255, 255, 1)"
        },
      },
    },
  },
};
const mainTheme = createTheme(themeOptions);

export { glassyBackgroundPrimary };
export { glassyBackground };
export default mainTheme;
