import React from "react";
import { useSelector } from "react-redux";
import { User } from "../models/User";

export const LeftPanel = () => {
  const user: User = useSelector((state) => state.user);

  return <div>Left panel</div>;
};
