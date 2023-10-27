import { Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Run } from "../models/Run";
import { RunNotes } from "../components/runNotes";
import { formatDate } from "../utils/date";

export const RunDetails = () => {
  const { id } = useParams();
  const runs = useSelector((state: RootState) => state.runs);
  const run: Run | undefined = runs.find((run) => run.id === Number(id));

  return (
    <div>
      <Grid container spacing={2} margin={4}>
        <Grid item lg={4}>
          <Card sx={{ minWidth: 275, alignContent: "left", marginBottom: 10 }}>
            <CardContent style={{ alignContent: "left" }}>
              <Typography variant="h5" component="div">
                {run ? formatDate(run.date, true) : ""}
              </Typography>
              <Typography variant="h5" component="div">
                {run?.distance} miles
              </Typography>
              <Typography>poop</Typography>
              <Typography variant="h6">miles</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Typography variant="h4" margin={5}>
            <RunNotes id={Number(id)} description={run?.description || ""} />
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};
