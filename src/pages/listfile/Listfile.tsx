import React from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Headers from "../../components/header/Headers";

function Listfile() {
  return (
    <div className="d-flex">
      <div>
        <Sidebar />
      </div>
      <div
        style={{
          flex: "1 1 auto",
          display: "flex",
          flexFlow: "column",
          height: "100vh",
          overflowY: "hidden",
          backgroundColor: "#DFDFD9",
        }}
      >
        <Headers />

        <div> {/* content */}
          
          เตา 11 
        </div>
      </div>
    </div>
  );
}

export default Listfile;
