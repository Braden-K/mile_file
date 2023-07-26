import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Input from "@material-ui/core/Input";
import { TextField, Button } from "@material-ui/core";
import { Box } from "@mui/material";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { getApiUsers } from "../api/users";
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
    console.log(data);
    const users = await getApiUsers();
    if (users) {
      const user = users.find((user) => user.username === data.username);
      if (user && user.password === data.password) {
        dispatch(
          loadUser({ id: user.id, name: user.name, username: user.username })
        );
        console.log("Login successful");
      } else if (user) {
        console.log("Wrong password");
      } else {
        console.log("User not found");
      }
    } else {
      throw new Error("No users found");
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
