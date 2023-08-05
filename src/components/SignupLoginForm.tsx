import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Input from "@material-ui/core/Input";
import { TextField, Button } from "@material-ui/core";
import { Box } from "@mui/material";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { getApiUserByEmail, postApiUser } from "../api/users";
import { useDispatch } from "react-redux";
import { loadUser } from "../redux/userSlice";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface FormInput {
  email: string;
  password: string;
  name?: string;
}

export const SignupLoginForm = (props: { isLoginForm: boolean }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signup, login } = useAuth();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit: SubmitHandler<FormInput> = async ({
    email,
    password,
    name,
  }) => {
    setLoading(true);
    if (props.isLoginForm) {
      try {
        await login(email, password);
      } catch (e) {
        console.log("login failed", e);
      }
    } else {
      try {
        await signup(email, password);
        await postApiUser({ email: email, name: name });
      } catch (e) {
        console.log("sign up failed", e);
      }
    }
    const user = await getApiUserByEmail(email);
    if (user) {
      dispatch(loadUser({ id: user.id, email: user.email, name: user.name }));
      setLoading(false);
      navigate("/");
    } else {
      console.log(
        "Firebase signup/login succeeded but a database error occurred"
      );
    }
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
      <Box sx={{ mb: 2 }}>
        <Controller
          name={"password"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField onChange={onChange} value={value} label={"password"} />
          )}
        />
      </Box>
      {!props.isLoginForm && (
        <Box>
          <Controller
            name={"name"}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField onChange={onChange} value={value} label={"name"} />
            )}
          />
        </Box>
      )}
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
