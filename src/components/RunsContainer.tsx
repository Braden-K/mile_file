import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getApiRunsByUserId } from "../api/runs";
import { useDispatch } from "react-redux";
import { loadRuns } from "../redux/runsSlice";
import { useEffect } from "react";
import RunTable from "./RunTable";

export const RunsContainer = () => {
  const runs = useSelector((state: RootState) => state.runs);
  const user = useSelector((state: RootState) => state.user);

  return (
    <div style={{ marginLeft: 25, marginRight: 25 }}>
      <RunTable runs={runs} />
    </div>
  );
};
