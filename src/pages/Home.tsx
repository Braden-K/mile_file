import React from "react";
import { useSelector } from "react-redux";
import { SignupLogin } from "../components/SignupLogin";
import { RootState } from "../redux/store";
import { RunsContainer } from "../components/RunsContainer";

const Home = () => {
  const user = useSelector((state: RootState) => state.user);
  console.log(user);

  return (
    <div>
      {user.id != -1 ? (
        <RunsContainer user={user} />
      ) : (
        <div>
          <SignupLogin />
        </div>
      )}
    </div>
  );
};

export default Home;
