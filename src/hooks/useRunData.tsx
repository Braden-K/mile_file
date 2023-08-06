import { useEffect, useState } from "react";
import { getApiRunsByUserId } from "../api/runs";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { loadRuns } from "../redux/runsSlice";
import { User } from "../models/User";

export const useRunData = () => {
  const user: User = useSelector((state: RootState) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const fetchAndLoadRuns = async () => {
    setIsLoading(true);
    const runs = await getApiRunsByUserId(user.id);
    dispatch(loadRuns(runs));
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAndLoadRuns();
  }, []);
};
