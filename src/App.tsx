import React from "react";
import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//pages
import Dashboard from "./pages/dashboard/dashboard";
import Listfile from "./pages/listfile/Listfile";


function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/10" element={<Listfile />}></Route>
        <Route path="/11" element={<Listfile />}></Route>
        <Route path="/12" element={<Listfile />}></Route>
        <Route path="/13" element={<Listfile />}></Route>
        <Route path="/14" element={<Listfile />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
