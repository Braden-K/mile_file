import React from "react";
import { useSelector } from "react-redux";
import { User } from "../models/User";
import { RootState } from "../redux/store";
import { StatCard } from "./StatCard";
import { MultiButtonComponent } from "./MultiButtonComponent";
import { useNavigate } from "react-router-dom";

export const LeftPanel = () => {
  const user: User = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const handleClickViewAllStats = () => {
    navigate("/stats");
  };

  const handleClickWeightTraining = () => {
    navigate("/weighttraining");
  };

  const buttonTextList = ["View all stats", "Weight training"];
  const clickHanlderList = [handleClickViewAllStats, handleClickWeightTraining];

  return (
    <div style={{ margin: 50, display: "flex", flexDirection: "column" }}>
      <StatCard />
      <MultiButtonComponent
        quantity={2}
        buttonTextList={buttonTextList}
        clickHanlderList={clickHanlderList}
      />
    </div>
  );
};
