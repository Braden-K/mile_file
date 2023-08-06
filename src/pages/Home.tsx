import React, { useState } from "react";
import { useSelector } from "react-redux";
import { SignupLogin } from "../components/SignupLogin";
import { RootState } from "../redux/store";
import { RunsContainer } from "../components/RunsContainer";
import { Grid } from "@material-ui/core";
import { LeftPanel } from "../components/LeftPanel";

const Home = () => {
  const user = useSelector((state: RootState) => state.user);
  const [isLogin, setIsLogin] = useState(true);
  console.log(user);

  return (
    <div>
      {user.id != -1 ? (
        <Grid container spacing={2}>
          <Grid item lg={4}>
            <LeftPanel />
          </Grid>
          <Grid item xs={12} lg={8}>
            <RunsContainer />
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
