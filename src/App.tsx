import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes} from "react-router-dom";
//pages
import Dashboard from "./pages/dashboard/Dashboard";
import Listfile from "./pages/listfile/Listfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/kiln/:id" element={<Dashboard />}></Route>
        <Route path="/file/:fileid" element={<Listfile />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
