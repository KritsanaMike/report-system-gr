import React from "react";
import { CDBNavbar, CDBInput } from "cdbreact";
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
      <CDBNavbar
        dark
        expand="md"
        scrolling
        className="justify-content-start"
        style={{ height: "4.6rem" }}
      >
        <span className="ms-5 top-text">รายงานเช็คอุณหภูมิเตา (Smoking Temperature Control Report)</span>
      </CDBNavbar> 
    </div>
  );
};
