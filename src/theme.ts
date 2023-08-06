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
    fontSize: 18,
    fontWeightRegular: 400,
    h1: {
      fontSize: "7rem",
      fontWeight: 600,
      fontFamily: "Poppins, sans-serif",
    },
    h2: {
      fontSize: "5rem",
      fontWeight: 600,
      fontFamily: "Poppins, sans-serif",
    },
    h3: {
      fontSize: "2.5rem",
      fontWeight: 600,
      color: "black",
      fontFamily: "Poppins, sans-serif",
    },
    h4: {
      fontSize: "2rem",
      fontWeight: 600,
      fontFamily: "Poppins, sans-serif",
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export default theme;
