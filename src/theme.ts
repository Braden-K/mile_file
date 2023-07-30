import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#006699",
    },
    secondary: {
      main: "#7C4DFF",
    },
    background: {
      default: "#FFFFFF",
      paper: "#F5F5F5",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    fontSize: 14,
    fontWeightRegular: 400,
    h1: {
      fontSize: "2rem",
      fontWeight: 600,
      fontFamily: "Poppins, sans-serif",
    },
    h2: {
      fontSize: "1.8rem",
      fontWeight: 600,
      fontFamily: "Poppins, sans-serif",
    },
    h3: {
      fontSize: "1.6rem",
      fontWeight: 600,
      color: "black",
      fontFamily: "Poppins, sans-serif",
    },
    h4: {
      fontSize: "1.4rem",
      fontWeight: 600,
      fontFamily: "Poppins, sans-serif",
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export default theme;
