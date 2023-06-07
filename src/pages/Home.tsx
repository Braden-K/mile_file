import React from "react";
import { useSelector } from "react-redux";
import { Login } from "../components/Login";
import { RootState } from "../redux/store";
import { RunsContainer } from "../components/RunsContainer";

const Home = () => {
  const user = useSelector((state: RootState) => state.user);
  console.log(user);

  return (
    <div>
      {user ? (
        <RunsContainer user={user} />
      ) : (
        <div>
          <Login />
        </div>
      )}
    </div>
  );
};

export default Home;
