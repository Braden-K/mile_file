import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SignupLogin } from "../components/SignupLogin";
import { RootState } from "../redux/store";
import { RunsContainer } from "../components/RunsContainer";
import { Grid } from "@material-ui/core";
import { LeftPanel } from "../components/LeftPanel";
import { RightPanel } from "../components/RightPanel";
import { useDispatch } from "react-redux";
import { loadRuns } from "../redux/runsSlice";
import { getApiRunsByUserId } from "../api/runs";

const Home = () => {
  const user = useSelector((state: RootState) => state.user);
  const [isLogin, setIsLogin] = useState(true);
  const [showLeftPanel, setShowLeftPanel] = useState(true);
  const dispatch = useDispatch();

  const fetchAndLoadRuns = async () => {
    const runs = await getApiRunsByUserId(user.id);
    dispatch(loadRuns(runs));
  };

  useEffect(() => {
    const handleResize = () => {
      setShowLeftPanel(window.innerWidth > 1200);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchAndLoadRuns();
  }, [fetchAndLoadRuns]);

  return (
    <div>
      {user.id != -1 ? (
        <Grid container spacing={2}>
          <Grid item lg={4}>
            {showLeftPanel && <LeftPanel />}
          </Grid>
          <Grid item xs={12} lg={8}>
            <RightPanel />
          </Grid>
        </Grid>
      ) : (
        <div>
          <SignupLogin isLogin={isLogin} setIsLogin={setIsLogin} />
        </div>
      )}
    </div>
  );
};

export default Home;
