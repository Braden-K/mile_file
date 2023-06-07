import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { RunComponent } from "./RunComponent";
import { getApiRunsByUserId } from "../api/runs";
import { User } from "../models/User";
import { useDispatch } from "react-redux";
import { loadRuns } from "../redux/runsSlice";
import { useEffect } from "react";

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
    <table style={{ marginLeft: "auto", marginRight: "auto", marginTop: 10 }}>
      <thead>
        <h1>Runs</h1>
      </thead>
      <tbody>
        {runGroup.runs.map((run) => {
          console.log(run);
          return <RunComponent run={run} />;
        })}
      </tbody>
    </table>
  );
};
