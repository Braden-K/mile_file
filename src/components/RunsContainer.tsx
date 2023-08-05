import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getApiRunsByUserId } from "../api/runs";
import { User } from "../models/User";
import { useDispatch } from "react-redux";
import { loadRuns } from "../redux/runsSlice";
import { useEffect } from "react";
import { Box, Button, Paper } from "@material-ui/core";
import RunTable from "./RunTable";

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
    <div style={{ marginTop: 30, marginLeft: 75, marginRight: 75 }}>
      <RunTable runGroup={runGroup} fetchAndLoadRuns={fetchAndLoadRuns} />
      <RunTable runGroup={runGroup} fetchAndLoadRuns={fetchAndLoadRuns} />
    </div>
  );
};
