import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getApiRunsByUserId } from "../api/runs";
import { User } from "../models/User";
import { useDispatch } from "react-redux";
import { loadRuns } from "../redux/runsSlice";
import { useEffect } from "react";
import RunTable from "./RunTable";

export const RunsContainer = () => {
  const runGroups = useSelector((state: RootState) => state.runs);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  console.log("runGroup", runGroups);

  const fetchAndLoadRuns = async () => {
    const runs = await getApiRunsByUserId(user.id);
    console.log("runs", runs);
    dispatch(loadRuns(runs));
  };

  useEffect(() => {
    fetchAndLoadRuns();
  }, []);

  return (
    <div style={{ marginTop: 30, marginLeft: 75, marginRight: 75 }}>
      {runGroups.map((runGroup) => {
        return (
          <RunTable runGroup={runGroup} fetchAndLoadRuns={fetchAndLoadRuns} />
        );
      })}
    </div>
  );
};
