import React from "react";
import { AddRunForm } from "../components/AddRunForm";
import { Paper, makeStyles } from "@material-ui/core";

export const AddRun = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "100px",
        marginBottom: "100px",
      }}
    >
      <Paper elevation={4} style={{ padding: "30px" }}>
        <h1 style={{ marginTop: 10 }}>Add a Run</h1>
        <AddRunForm />
      </Paper>
    </div>
  );
};
