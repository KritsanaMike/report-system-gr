import React from "react";
import Sidebars from "../../components/sidebar/sidebar";
import Headers from "../../components/header/Headers";
import Card from "react-bootstrap/Card";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="d-flex">
      <div>
        <Sidebars />
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

        <div className="p-4">
          <div className="row">
            <div className="col-md-8">
              <Card>
                <Card.Body className="card-body-h">
                  {/* <Card.Title>Special title treatment</Card.Title> */}
                  <Card.Text>วันที่ : 30 มิ.ย. 2566</Card.Text>
                </Card.Body>
              </Card>
            </div>

            <div className="col-md-4">
              <Card>
                <Card.Body className="card-body-h card-black">
                  {/* <Card.Title>Special title treatment</Card.Title> */}
                  <Card.Text>อัพเดทล่าสุด</Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
