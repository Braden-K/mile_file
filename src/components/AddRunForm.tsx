import React, { useState } from "react";
import { useForm, Controller, SubmitHandler, Form } from "react-hook-form";
import Input from "@material-ui/core/Input";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Box,
  makeStyles,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { postApiRun } from "../api/runs";
import { RootState } from "../redux/store";
import { User } from "../models/User";
import { ErrorMessage } from "@hookform/error-message";

interface FormInput {
  username: string;
  password: string;
}

export const AddRunForm = () => {
  const user: User = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      distance: "",
      duration: "",
      heartRate: "",
      description: "",
      type: "easy",
      intensity: "1",
    },
  });

  const validatePositiveNumber = (value: string) => {
    return (Number(value) && Number(value) > 0) || value === "";
  };

  const errorMessages = {
    distance: {
      validate: "Invalid distance",
    },
    duration: {
      validate: "Invalid duration",
    },
    heartRate: {
      validate: "Invalid heart rate",
    },
  };

  const onSubmit: any = async (data: SubmitHandler<FormInput>) => {
    console.log(data);
    if (user != null) {
      await postApiRun(user.id, data);
    } else {
      throw Error("No user logged in");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box style={{ marginTop: 30 }}>
        <Controller
          name={"distance"}
          control={control}
          rules={{
            validate: validatePositiveNumber,
          }}
          render={({ field: { onChange, value } }) => (
            <>
              <h4>Distance</h4>
              <TextField onChange={onChange} value={value} />
            </>
          )}
        />
      </Box>
      <Box>{errors.distance && <p>{errorMessages.distance.validate}</p>}</Box>

      <Box style={{ marginTop: 30 }}>
        <Controller
          name={"duration"}
          control={control}
          rules={{
            validate: validatePositiveNumber,
          }}
          render={({ field: { onChange, value } }) => (
            <>
              <h4>Duration</h4>
              <TextField onChange={onChange} value={value} />
            </>
          )}
        />
      </Box>
      <Box>{errors.duration && <p>{errorMessages.duration.validate}</p>}</Box>

      <Box style={{ marginTop: 30 }}>
        <Controller
          name={"heartRate"}
          control={control}
          rules={{
            validate: validatePositiveNumber,
          }}
          render={({ field: { onChange, value } }) => (
            <>
              <h4>Heart Rate</h4>
              <TextField onChange={onChange} value={value} />
            </>
          )}
        />
      </Box>
      <Box>{errors.heartRate && <p>{errorMessages.heartRate.validate}</p>}</Box>

      <Box style={{ marginTop: 30 }}>
        <Controller
          name={"description"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              <h4>Description</h4>
              <TextField onChange={onChange} value={value} />
            </>
          )}
        />
      </Box>
      <Box style={{ marginTop: 30 }}>
        <Controller
          name={"type"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              <h4>Run Type</h4>
              <Select onChange={onChange} value={value}>
                <MenuItem value={"easy"}>easy</MenuItem>
                <MenuItem value={"tempo"}>tempo</MenuItem>
                <MenuItem value={"intervals"}>intervals</MenuItem>
                <MenuItem value={"long"}>long</MenuItem>
              </Select>
            </>
          )}
        />
      </Box>
      <Box style={{ marginTop: 30 }}>
        <Controller
          name={"intensity"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              <h4>Intensity</h4>
              <Select onChange={onChange} value={value}>
                <MenuItem value={"1"}>1</MenuItem>
                <MenuItem value={"2"}>2</MenuItem>
                <MenuItem value={"3"}>3</MenuItem>
                <MenuItem value={"4"}>4</MenuItem>
                <MenuItem value={"5"}>5</MenuItem>
                <MenuItem value={"6"}>6</MenuItem>
                <MenuItem value={"7"}>7</MenuItem>
                <MenuItem value={"8"}>8</MenuItem>
                <MenuItem value={"9"}>9</MenuItem>
                <MenuItem value={"10"}>10</MenuItem>
              </Select>
            </>
          )}
        />
      </Box>
      <Button type="submit" style={{ margin: 20, color: "primary" }}>
        Add
      </Button>
    </form>
  );
};

export default AddRunForm;
