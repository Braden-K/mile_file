import React from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { LoginForm } from "./LoginForm";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "100px",
    marginBottom: "100px",
  },
  paper: {
    padding: "30px",
  },
}));

export const Login = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper elevation={4} className={classes.paper}>
        <h1>Login To Continue</h1>
        <LoginForm />
      </Paper>
    </div>
  );
};
