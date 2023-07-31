import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Input from "@material-ui/core/Input";
import { TextField, Button } from "@material-ui/core";
import { Box } from "@mui/material";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { postApiLogin } from "../api/users";
import { useDispatch } from "react-redux";
import { loadUser } from "../redux/userSlice";

interface FormInput {
  username: string;
  password: string;
}

export const LoginForm = () => {
  const dispatch = useDispatch();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    console.log("data", data);
    const user = await postApiLogin({
      username: data.username,
      password: data.password,
    });
    if (user) {
      dispatch(loadUser(user));
    } else {
      console.log("login failed");
    }
  };

  return (
    <>
      <Box sx={{ m: 2 }}>
        <Controller
          name={"username"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              color={"primary"}
              onChange={onChange}
              value={value}
              label={"username"}
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
      <Button
        onClick={handleSubmit(onSubmit)}
        variant="contained"
        style={{ marginTop: "30px" }}
      >
        Login
      </Button>
    </>
  );
};
