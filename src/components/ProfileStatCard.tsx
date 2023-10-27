import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import moment from "moment";

export const ProfileStatCard = () => {
  const user = useSelector((state: RootState) => state.user);
  const runs = useSelector((state: RootState) => state.runs);

  const calculateCurrentWeeksMiles = () => {
    let miles = 0;
    const today = moment();
    runs.forEach((run) => {
      const runDate = moment(run.date);
      if (today.diff(runDate, "days") <= 7) {
        miles += run.distance;
      }
    });
    return miles;
  };

  return (
    <Card sx={{ minWidth: 275, alignContent: "left", marginBottom: 10 }}>
      <CardContent style={{ alignContent: "left" }}>
        <Typography variant="h5" component="div">
          {user.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {user.email}
        </Typography>
        <Typography>Previous 7 days</Typography>
        <Typography variant="h6">
          {calculateCurrentWeeksMiles()} miles
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">View full profile</Button>
      </CardActions>
    </Card>
  );
};
