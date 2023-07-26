import React from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { LoginForm } from "./LoginForm";

export const Login = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "100px",
        marginBottom: "100px",
      }}
    >
      <Paper elevation={4} style={{ padding: "30px" }}>
        <h1>Login To Continue</h1>
        <LoginForm />
      </Paper>
    </div>
  );
};
