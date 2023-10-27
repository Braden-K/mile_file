import { Card, CardContent } from "@material-ui/core";
import React from "react";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { Run } from "../models/Run";

const calculateTotalRuns = (runs: Run[]) => {
  return runs.length > 1 ? `${runs.length} runs` : `${runs.length} run`;
};

const calculateTotalDistance = (runs: Run[]) => {
  let totalDistance = 0;
  runs.forEach((run: Run) => {
    totalDistance += run.distance;
  });
  return `${totalDistance} miles`;
};

const calculateTotalTime = (runs: Run[]) => {
  let totalSeconds = 0;
  runs.forEach((run: Run) => {
    totalSeconds += run.duration;
  });
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  if (hours > 0) {
    return `${hours} hours ${minutes} minutes`;
  }
  return `${minutes} minutes`;
};

export const VerboseStatCard = () => {
  const runs = useSelector((state: RootState) => state.runs);
  const metricMap = new Map();
  metricMap.set("Total runs", calculateTotalRuns(runs));
  metricMap.set("Total distance", calculateTotalDistance(runs));
  metricMap.set("Total time", calculateTotalTime(runs));

  return (
    <Card>
      <CardContent>
        <table>
          <th>
            <h4>All Time Stats</h4>
          </th>
          {Array.from(metricMap.keys()).map((key) => (
            <tr>
              <td style={{ textAlign: "left" }}>{key}</td>
              <td style={{ textAlign: "right", width: "70%" }}>
                {metricMap.get(key)}
              </td>
            </tr>
          ))}
        </table>
      </CardContent>
    </Card>
  );
};
