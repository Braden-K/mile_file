import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Home from "./pages/Home";
import { Navbar } from "./components/Navbar";
import theme from "./theme";
import { ThemeProvider } from "@material-ui/core/styles";
import { AddRun } from "./pages/AddRun";
import { AuthProvider } from "./context/AuthContext";
import { RunDetails } from "./pages/RunDetails";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <AuthProvider>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/addRun" element={<AddRun />} />
                <Route path="/runs/:id" element={<RunDetails />} />
              </Routes>
            </AuthProvider>
          </Router>
        </Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
