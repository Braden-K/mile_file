import { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../fbConfig.js";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { loadUser } from "../redux/userSlice.ts";
import { loadRuns } from "../redux/runsSlice.ts";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
    clearRedux();
    navigate("/");
  };

  const clearRedux = () => {
    dispatch(loadUser({ id: -1, email: "", name: "" }));
    dispatch(loadRuns([]));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // user is null if not logged in
      setCurrentUser(user);
      setLoading(false);
    });
    // unsubscribe from the listener when the component unmounts
    return unsubscribe();
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
