import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Run } from "../models/Run";
import { RunNotes } from "../components/runNotes";
import { formatDate } from "../utils/date";
import { colorMap } from "../utils/colorMap";

export const RunDetails = () => {
  const { id } = useParams();
  const runs = useSelector((state: RootState) => state.runs);
  const run: Run | undefined = runs.find((run) => run.id === Number(id));

  return (
    <>
      <Grid
        container
        spacing={2}
        margin={4}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Grid item lg={4}>
          <Card
            sx={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CardContent
              sx={{ alignItems: "center", justifyContent: "center" }}
            >
              <Typography variant="h4" component="div">
                {run ? formatDate(run.date, true) : ""}
              </Typography>
              <Grid
                container
                spacing={2}
                sx={{ alignItems: "center", justifyContent: "center" }}
              >
                <Grid item m={4}>
                  <Typography variant="h5" component="div">
                    {run?.distance} miles
                  </Typography>
                </Grid>
                <Grid item m={4}>
                  {run?.type && (
                    <Box
                      sx={{
                        width: "100px",
                        height: "30px",
                        backgroundColor: colorMap[run.type],
                        borderRadius: "3px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        variant="h5"
                        fontWeight={"bold"}
                        component="div"
                      >
                        {run?.type}
                      </Typography>
                    </Box>
                  )}
                </Grid>
                <Grid item m={4}>
                  <Typography variant="h5" component="div">
                    {run?.avg_hr} bpm
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        margin={4}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Grid item xs={12} lg={8}>
          <Typography variant="h4" margin={5}>
            <RunNotes id={Number(id)} description={run?.description || ""} />
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};
