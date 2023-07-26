import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { RunComponent } from "./RunComponent";
import { getApiRunsByUserId } from "../api/runs";
import { User } from "../models/User";
import { useDispatch } from "react-redux";
import { loadRuns } from "../redux/runsSlice";
import { useEffect } from "react";
import { Box, Button, Paper } from "@material-ui/core";

export const RunsContainer = (p: { user: User }) => {
  const runGroup = useSelector((state: RootState) => state.runs);
  const dispatch = useDispatch();

  console.log("runGroup", runGroup);

  const fetchAndLoadRuns = async () => {
    const runs = await getApiRunsByUserId(p.user.id);
    console.log("runs", runs);
    dispatch(loadRuns(runs));
  };

  useEffect(() => {
    fetchAndLoadRuns();
  }, []);

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minWidth: "100%",
        width: "90%",
      }}
    >
      <table style={{ borderCollapse: "collapse" }}>
        <tbody>
          <tr>
            <th>Distance</th>
            <th>Duration</th>
            <th>Average Heart Rate</th>
          </tr>
          <Paper elevation={3} style={{ marginTop: 20 }}>
            {runGroup.runs.map((run) => {
              console.log(run);
              return <RunComponent run={run} />;
            })}
          </Paper>
        </tbody>
      </table>
    </Box>
  );
};
