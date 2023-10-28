import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSelector } from "react-redux";
import { User } from "../models/User";
import { RootState } from "../redux/store";

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
  const { logout } = useAuth();
  const user: User = useSelector((state: RootState) => state.user);

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h3">Mile File</Typography>
        <Button style={{ marginLeft: 20 }} onClick={() => navigate("/")}>
          Home
        </Button>
        <Button
          style={{ marginLeft: 20 }}
          onClick={() => navigate("/calendar")}
        >
          Calendar
        </Button>
        <Button style={{ marginLeft: 20 }} onClick={() => navigate("/shoes")}>
          Shoes
        </Button>
        <Button
          style={{ marginLeft: 20 }}
          onClick={() => navigate("/calculator")}
        >
          calculator
        </Button>
        <Button
          style={{ margin: 20, border: "1px solid black" }}
          onClick={() => navigate("/AddRun")}
        >
          Add Run +
        </Button>
        {user.id !== -1 && (
          <Button style={{ marginLeft: "auto" }} onClick={() => logout()}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
