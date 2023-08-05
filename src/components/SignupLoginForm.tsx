import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Input from "@material-ui/core/Input";
import { TextField, Button } from "@material-ui/core";
import { Box } from "@mui/material";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { postApiUser } from "../api/users";
import { useDispatch } from "react-redux";
import { loadUser } from "../redux/userSlice";
import { useAuth } from "../context/AuthContext";

interface FormInput {
  email: string;
  password: string;
}

export const SignupLoginForm = (props: { isLoginForm: boolean }) => {
  const dispatch = useDispatch();
  const { signup, login, currentUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormInput> = async ({ email, password }) => {
    setLoading(true);
    if (props.isLoginForm) {
      try {
        await login(email, password);
        console.log(currentUser);
      } catch (e) {
        console.log("login failed", e);
      }
    } else {
      try {
        await signup(email, password);
        console.log(currentUser);
        await postApiUser({ email: email, name: "namePlaceholder" });
      } catch (e) {
        console.log("sign up failed", e);
      }
    }
    setLoading(false);
  };

  return (
    <>
      <Box sx={{ m: 2 }}>
        <Controller
          name={"email"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              color={"primary"}
              onChange={onChange}
              value={value}
              label={"email"}
            />
          )}
        />
      </Box>
      <Box>
        <Controller
          name={"password"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField onChange={onChange} value={value} label={"password"} />
          )}
        />
      </Box>
      {JSON.stringify(currentUser)}
      <Button
        onClick={handleSubmit(onSubmit)}
        variant="contained"
        style={{ marginTop: "30px" }}
        disabled={loading}
      >
        {props.isLoginForm ? "Log in" : "Sign up"}
      </Button>
    </>
  );
};
