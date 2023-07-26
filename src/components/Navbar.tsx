import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { SxProps } from "@mui/material";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#fff",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    borderRadius: theme.shape.borderRadius,
  },
}));

export const Navbar = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h3">Mile File</Typography>
        <Button style={{ marginLeft: 20 }} onClick={() => navigate("/")}>
          Home
        </Button>
        <Button
          style={{ margin: 20, border: "1px solid black" }}
          onClick={() => navigate("/AddRun")}
        >
          Add Run +
        </Button>
      </Toolbar>
    </AppBar>
  );
};
