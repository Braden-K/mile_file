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
import { loadShoes } from "../redux/shoeSlice";
import { getApiRunsByUserId } from "../api/runs";
import { getApiShoesByUserId } from "../api/shoe";

const Home = () => {
  const user = useSelector((state: RootState) => state.user);
  const [isLogin, setIsLogin] = useState(true);
  const [showLeftPanel, setShowLeftPanel] = useState(true);
  const dispatch = useDispatch();

  const fetchAndLoadRuns = async () => {
    const runs = await getApiRunsByUserId(user.id);
    dispatch(loadRuns(runs));
  };

  const fetchAndLoadShoes = async () => {
    const shoes = await getApiShoesByUserId(user.id);
    dispatch(loadShoes(shoes));
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
    fetchAndLoadShoes();
  }, [fetchAndLoadRuns, fetchAndLoadShoes]);

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
