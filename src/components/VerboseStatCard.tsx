import { Card, CardContent } from "@material-ui/core";
import React from "react";

export const VerboseStatCard = () => {
  const metricMap = new Map();
  metricMap.set("Total runs", "runs");
  metricMap.set("Total distance", "miles");
  metricMap.set("Total time", "hours");

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <table>
          <th>
            <h3>All Time Stats</h3>
          </th>
          {Array.from(metricMap.keys()).map((key) => (
            <tr>
              <td>{key}</td>
              <td>{metricMap.get(key)}</td>
            </tr>
          ))}
        </table>
      </CardContent>
    </Card>
  );
};
