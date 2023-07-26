import React from "react";
import { Run } from "../models/Run";
import { Box, Paper, Typography } from "@material-ui/core";
import "../css/runs.css";

export const RunComponent = (p: { run: Run }) => {
  return (
    <tr
      style={{
        textAlign: "left",
        width: "100%",
      }}
    >
      <td className="table-data-first">
        <Typography variant="h1">{p.run.distance} miles</Typography>
      </td>
      <td className="table-data">
        <Typography variant="h1">{p.run.duration} minutes</Typography>
      </td>
      <td className="table-data">
        <Typography variant="h1">{p.run.avg_hr} bpm</Typography>
      </td>
    </tr>
  );
};
