import React from "react";
import { Run } from "../models/Run";
import { Typography } from "@material-ui/core";

export const RunComponent = (p: { run: Run }) => {
  return (
    <tr style={{ textAlign: "left" }}>
      <td>
        <Typography variant="h1">{p.run.distance}</Typography>
      </td>
      <td>
        <Typography variant="h1">{p.run.duration}</Typography>
      </td>
      <td>
        <Typography variant="h1">{p.run.avg_hr}</Typography>
      </td>
    </tr>
  );
};
