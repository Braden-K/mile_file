import React, { useState } from "react";
import { Button, Link, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { SignupLoginForm } from "./SignupLoginForm";

export const SignupLogin = (props: {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "100px",
        marginBottom: "100px",
        flexDirection: "column",
      }}
    >
      <Paper elevation={4} style={{ padding: "30px" }}>
        {props.isLogin ? (
          <h1>Login to continue</h1>
        ) : (
          <h1>Create an account to continue</h1>
        )}
        <SignupLoginForm isLoginForm={props.isLogin} />
      </Paper>

      <Button
        style={{ marginTop: 20 }}
        onClick={() => props.setIsLogin(!props.isLogin)}
      >
        {props.isLogin
          ? "Don't have an account? Sign up here"
          : "Already have an account? Login here"}
      </Button>
    </div>
  );
};
