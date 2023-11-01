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
import { Shoe } from "../models/Shoe";
import { getApiShoesByUserId, putApiShoe } from "../api/shoe";
import { loadShoes } from "../redux/shoeSlice";

interface FormInput {
  distance: string;
  duration: string;
  heartRate: string;
  description: string;
  type: string;
  shoe_id: string;
}

export const AddRunForm = () => {
  const user: User = useSelector((state: RootState) => state.user);
  const shoes: Shoe[] = useSelector((state: RootState) => state.shoes);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [durationHour, setDurationHour] = useState(0);
  const [durationMinute, setDurationMinute] = useState(30);
  const [durationSecond, setDurationSecond] = useState(30);

  const updateShoeMileage = async (data: any) => {
    const userShoes = await getApiShoesByUserId(user.id);
    const chosenShoe = userShoes.find((shoe) => shoe.id === data.shoe_id);
    console.log("chosenShoe", chosenShoe);
    const updatedMileage = (chosenShoe?.miles || 0) + Number(data.distance);
    console.log("data.shoeid", data.shoe_id);
    await putApiShoe(data.shoe_id, { miles: updatedMileage });
    const updatedShoes = await getApiShoesByUserId(user.id);
    dispatch(loadShoes(updatedShoes));
  };

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
      shoe_id: "",
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
    console.log("add run form data", data);

    const totalSeconds =
      durationHour * 3600 + durationMinute * 60 + durationSecond;

    if (user != null) {
      try {
        await postApiRun(user.id, { ...data, duration: totalSeconds });

        try {
          updateShoeMileage({ ...data });
        } catch (err) {
          console.log("error updating shoe mileage", err);
        }
      } catch (err) {
        console.log("error uploading run", err);
      }

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
        name={"shoe_id"}
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            <h4>Shoe</h4>
            <Select onChange={onChange} value={value}>
              {shoes.map((shoe) => {
                return <MenuItem value={shoe.id}>{shoe.shoe_name}</MenuItem>;
              })}
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
