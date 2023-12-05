import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./components/pages/Login";
import { RSVPView } from "./components/pages/RSVPView";
import { store } from "./store/root";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/rsvp" element={<RSVPView />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
