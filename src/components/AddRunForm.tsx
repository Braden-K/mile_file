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
  Slider,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { postApiRun } from "../api/runs";
import { RootState } from "../redux/store";
import { User } from "../models/User";
import { useNavigate } from "react-router-dom";

interface FormInput {
  username: string;
  password: string;
}

export const AddRunForm = () => {
  const user: User = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [durationHour, setDurationHour] = useState(0);
  const [durationMinute, setDurationMinute] = useState(30);
  const [durationSecond, setDurationSecond] = useState(30);

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

    const totalSeconds =
      durationHour * 3600 + durationMinute * 60 + durationSecond;

    if (user != null) {
      await postApiRun(user.id, { ...data, duration: totalSeconds });
      navigate("/");
    } else {
      throw Error("No user logged in");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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

      {errors.distance && <p>{errorMessages.distance.validate}</p>}

      <Controller
        name={"duration"}
        control={control}
        rules={{
          validate: validatePositiveNumber,
        }}
        render={({ field }) => (
          <>
            <h4>Duration</h4>
            <h6>Hours</h6>
            <Slider
              defaultValue={0}
              valueLabelDisplay="auto"
              min={0}
              max={10}
              onChange={(event, value) => setDurationHour(value as number)}
            />
            <h6>Minutes</h6>
            <Slider
              defaultValue={30}
              valueLabelDisplay="auto"
              color="secondary"
              min={0}
              max={59}
              onChange={(event, value) => setDurationMinute(value as number)}
            />
            <h6>Seconds</h6>
            <Slider
              defaultValue={30}
              valueLabelDisplay="auto"
              min={0}
              max={59}
              onChange={(event, value) => setDurationSecond(value as number)}
            />
          </>
        )}
      />

      {errors.duration && <p>{errorMessages.duration.validate}</p>}

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

      {errors.heartRate && <p>{errorMessages.heartRate.validate}</p>}

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

      <Button type="submit" style={{ margin: 20, color: "primary" }}>
        Add
      </Button>
    </form>
  );
};

export default AddRunForm;
