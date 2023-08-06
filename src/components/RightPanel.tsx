import React from "react";
import { RunsContainer } from "./RunsContainer";

export const RightPanel = () => {
  return (
    <div style={{ margin: 50, display: "flex", flexDirection: "column" }}>
      <RunsContainer />
    </div>
  );
};
