import React from "react";
import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes, useParams  } from "react-router-dom";

//pages
import Dashboard from "./pages/dashboard/dashboard";
import Listfile from "./pages/listfile/Listfile";


function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Dashboard />}></Route>
        <Route path="/kiln/:id" element={<Dashboard />}></Route>
        <Route path="/file/:fileid" element={<Listfile />}></Route>
        {/* <Route path="/blower/11" element={<Listfile />}></Route>
        <Route path="/blower/12" element={<Listfile />}></Route>
        <Route path="/blower/13" element={<Listfile />}></Route>
        <Route path="/blower/14" element={<Listfile />}></Route> */}
      </Routes>
    </BrowserRouter>
  );
}
export default App;
