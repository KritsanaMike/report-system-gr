import React from "react";
import './Headers.css'

export default function Headers(){
  return (
    <div
      className="input-nav"
      style={{
        background: "#fff",
        color: "#333",
        boxShadow: "-40px -25px 25px 14px",
        height: "4.6rem",
      }}
    >
      <div
        className="justify-content-start pt-3"
        style={{ height: "4.6rem" }}
      >
        <span className="ms-5 mt-3 top-text">รายงานเช็คอุณหภูมิเตา (Smoking Temperature Control Report)</span>
      </div> 
    </div>
  );
}
