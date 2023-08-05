import React from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { SignupLoginForm } from "./SignupLoginForm";

export const SignupLogin = (isLogin: boolean) => {
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
        {isLogin ? (
          <h1>Login to continue</h1>
        ) : (
          <h1>Create an account to continue</h1>
        )}
        <SignupLoginForm isLoginForm={isLogin} />
      </Paper>
    </div>
  );
};
