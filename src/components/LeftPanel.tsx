import React from "react";
import { useSelector } from "react-redux";
import { User } from "../models/User";
import { RootState } from "../redux/store";
import { ProfileStatCard } from "./ProfileStatCard";
import { MultiButtonComponent } from "./MultiButtonComponent";
import { useNavigate } from "react-router-dom";
import { VerboseStatCard } from "./VerboseStatCard";

export const LeftPanel = () => {
  const user: User = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  return (
    <div style={{ margin: 50, display: "flex", flexDirection: "column" }}>
      <ProfileStatCard />
      <VerboseStatCard />
    </div>
  );
};
