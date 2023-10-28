import React, { useState } from "react";
import { useForm, Controller, SubmitHandler, Form } from "react-hook-form";
import Input from "@material-ui/core/Input";
import { TextField, Button, Select, MenuItem, Slider } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { User } from "../models/User";
import { useNavigate } from "react-router-dom";
import { postApiShoe } from "../api/shoe";

interface FormInput {
  name: string;
}

export const AddShoeForm = () => {
  const user: User = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
    },
  });

  const onSubmit: any = async (data: SubmitHandler<FormInput>) => {
    console.log(data);

    if (user != null) {
      await postApiShoe(user.id, { ...data, miles: "0" });
      navigate("/shoes");
    } else {
      throw Error("Error adding shoe");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name={"name"}
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            <TextField
              onChange={onChange}
              value={value}
              id="filled-basic"
              label="Type shoe name"
              variant="filled"
            />
          </>
        )}
      />
      <Button
        type="submit"
        style={{ margin: 20, color: "primary", border: "1px solid black" }}
      >
        Add
      </Button>
    </form>
  );
};

export default AddShoeForm;
