import React, { useRef } from "react";
import Sidebars from "../../components/sidebar/sidebar";
import Headers from "../../components/header/Headers";
import Card from "react-bootstrap/Card";
import "./Dashboard.css";
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useParams } from 'react-router-dom';

const generateRandomData = (days: number, intervalInMinutes: number) => {
  const data = [];
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0); // Start at midnight
  const millisecondsInMinute = 60000;

  for (let i = 0; i < days * 24 * 60 / intervalInMinutes; i++) {
    const timestamp = startDate.getTime() + i * intervalInMinutes * millisecondsInMinute;
    const temperature = getRandomNumber(30, 45); // Replace with your temperature data source
    const humidity = getRandomNumber(70, 80); // Replace with your humidity data source

    data.push({
      timestamp,
      temperature,
      humidity,
    });
  }

  return data;
};

const getRandomNumber = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

// Usage: Generate 3 days of data with a 30-minute interval
const data = generateRandomData(3, 30);

const gp1: Highcharts.Options = {
  chart: {
    style: {
      fontFamily: 'Prompt, sans-serif', // Set the font family for the chart
    },
  },
  title: {
    text: 'อุณหภูมิและความชื้นในห้องอบ',
  },
  xAxis: {
    type: 'datetime',
    labels: {
      formatter: function () {
        // Format x-axis labels as per your requirement
        return Highcharts.dateFormat('%H:%M', this.value);
      },
    },
    // Add the following to create grid lines at midnight
    gridLineWidth: 1,
    gridLineColor: 'rgba(0, 0, 0, 0.1)',
    tickInterval: 24 * 3600 * 1000, // One day in milliseconds
  },
  yAxis: [
    {
      title: {
        text: 'อุณหภูมิ (°C) และ ความชื้น (%)',
      },
      plotLines: [
        {
          value: 45,
          color: 'red', // Change the color as per your preference
          dashStyle: 'dot',
          width: 2,
          label: {
            text: 'Danger', // Label for the line
            align: 'left',
            x: 5,
            style: {
              color: 'red', // Change the color as per your preference
            },
          },
        },
      ],

    },
    {
      title: {
        text: '',
      },
      opposite: true,
    },
  ],
  series: [
    {
      name: 'อุณหภูมิในห้องอบ',
      data: data.map((point) => [point.timestamp, point.temperature]),
      yAxis: 0,
      type: 'spline', // You can use 'line' for simple lines
      color: 'green',
      marker: {
        symbol: 'circle',
        enabled: true,
        radius: 3, // Adjust the size of the circle data points
        fillColor: 'green', // Set custom color for temperature data points
      },
    },
    {
      name: 'ความชื้นในห้องอบ',
      data: data.map((point) => [point.timestamp, point.humidity]),
      yAxis: 0,
      type: 'spline',
      color: 'blue',
      marker: {
        symbol: 'circle',
        enabled: true,
        radius: 3, // Adjust the size of the circle data points
        fillColor: 'blue', // Set custom color for temperature data points
      },
    },
  ],
};

const gp2: Highcharts.Options = {
  chart: {
    style: {
      fontFamily: 'Prompt, sans-serif', // Set the font family for the chart
    },
  },
  title: {
    text: 'อุณหภูมิในเตาเผา และ Blower',
  },
  xAxis: {
    type: 'datetime',
    labels: {
      formatter: function () {
        // Format x-axis labels as per your requirement
        return Highcharts.dateFormat('%H:%M', this.value);
      },
    },
    // Add the following to create grid lines at midnight
    gridLineWidth: 1,
    gridLineColor: 'rgba(0, 0, 0, 0.1)',
    tickInterval: 24 * 3600 * 1000, // One day in milliseconds
  },
  yAxis: [
    {
      title: {
        text: 'อุณหภูมิ (°C) และ ความชื้น (%)',
      },
    },
    {
      title: {
        text: '',
      },
      opposite: true,
    },
  ],
  series: [
    {
      name: 'อุณหภูมิในเตาเผา',
      data: data.map((point) => [point.timestamp, point.temperature]),
      yAxis: 0,
      type: 'spline', // You can use 'line' for simple lines
      color: 'yellow',
      marker: {
        symbol: 'circle',
        enabled: true,
        radius: 3, // Adjust the size of the circle data points
        fillColor: 'yellow', // Set custom color for temperature data points
      },
    },
    {
      name: 'อุณหภูมิใน Blower',
      data: data.map((point) => [point.timestamp, point.humidity]),
      yAxis: 0,
      type: 'spline',
      color: 'red',
      marker: {
        symbol: 'circle',
        enabled: true,
        radius: 3, // Adjust the size of the circle data points
        fillColor: 'red', // Set custom color for temperature data points
      },
    },
  ],
};

export default function Dashboard(props: HighchartsReact.Props) {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const { id } = useParams();
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

        <div className="p-4 overflow-auto">
          {/* header information */}
          <div className="row">
            <div className="col-md-8">
              <Card className="mb-3">
                <Card.Body className="card-body-h">
                  <div className="dt-blower">
                    <span className="fn-20 p-2 float-start " >วันที่  : 30 มิ.ย. 2566</span>
                    <span className="fn-20 p-2 float-end" >หมายเลขเตา : {id}</span>
                  </div>
                  <div className="tm-onoff">
                    <span className="fn-20 p-2 align-baseline" >เวลาเปิดเตา : </span><span className="fn-20 text-yellow tm-onoff-bg align-baseline " >08:00 น. / 30 มิ.ย. 2566</span>
                  </div>
                  <div className="tm-onoff">
                    <span className="fn-20 p-2 align-baseline" >เวลาปิดเตา : </span><span className="fn-20 text-yellow tm-onoff-bg align-baseline " >08:00 น. / 30 มิ.ย. 2566</span>
                  </div>
                </Card.Body>
              </Card>
            </div>

            <div className="col-md-4">
              <Card>
                <Card.Body className="card-body-h card-black">


                  <div className="center fn-20">อัพเดทล่าสุด</div>
                  <div className="row">
                    <div className="col-md-12 mt-4">
                      <div className="center fn-20">
                        <span className="float-start ms-4 " >08:00 น.</span>
                        <span className="float-end me-4 " >30 มิ.ย. 2566</span>
                      </div>
                    </div>

                    <div className="col-md-12 mt-4">
                      <div className="fn-20 ">
                        <span className="float-start ms-4 align-baseline" >สถานะเตา</span>
                        <span className="float-end me-4 align-baseline" ><button type="button" className="btn btn-primary text-black" style={{ backgroundColor: "#EED236", border: "none", width: "8rem" }} >เปิด</button></span>
                      </div>
                    </div>

                    <div className="col-md-12 mt-4">
                      <div className="fn-20 ms-4 me-4 d-grid align-baseline" >
                        <button type="button" className="btn btn-primary text-black" style={{ backgroundColor: "#EED236", border: "none", }} >Dowload now</button>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
          {/* header information */}


          {/* graph 1*/}
          <div className="row">
            <div className="col-md-12">
              <Card className="mb-3">
                <Card.Body className="">
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={gp1}
                    ref={chartComponentRef}
                    {...props}
                  />
                </Card.Body>
              </Card>
            </div>
          </div>
          {/* graph 1*/}

          {/* graph 2*/}
          <div className="row">
            <div className="col-md-12">
              <Card className="mb-3">
                <Card.Body className="">
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={gp2}
                    ref={chartComponentRef}
                    {...props}
                  />
                </Card.Body>
              </Card>
            </div>
          </div>
          {/* graph 2*/}



          {/* data 1*/}
          <div className="row">
            <div className="col-md-3">
              <Card className="mb-3">
                <Card.Body className="">
                  <div>
                    <span className="fn-18">อุณหภูมิในห้องอบ  (องศา)</span>
                    <p className="fn-30 mb-none" style={{ color: "#24AF0D" }}>45.2</p>
                  </div>
                </Card.Body>
              </Card>
            </div>

            <div className="col-md-3">
              <Card className="mb-3">
                <Card.Body className="">
                  <div>
                    <span className="fn-18">ความชื้นในห้องอบ  (องศา)</span>
                    <p className="fn-30 mb-none" style={{ color: "#004EDA" }}>45.2</p>
                  </div>
                </Card.Body>
              </Card>
            </div>

            <div className="col-md-3">
              <Card className="mb-3">
                <Card.Body className="">
                  <div>
                    <span className="fn-18">อุณหภูมิในเตาเผา  (องศา)</span>
                    <p className="fn-30 mb-none" style={{ color: "#DA1A00" }}>45.2</p>
                  </div>
                </Card.Body>
              </Card>
            </div>

            <div className="col-md-3">
              <Card className="mb-3">
                <Card.Body className="">
                  <div>
                    <span className="fn-18">อุณหภูมิในเตาเผา  (องศา)</span>
                    <p className="fn-30 mb-none" style={{ color: "#EED236" }}>45.2</p>
                  </div>
                </Card.Body>
              </Card>
            </div>

          </div>
          {/* data 1*/}

          {/* data 2*/}
          <div className="row">
            <div className="col-md-3">
              <Card className="mb-3">
                <Card.Body className="">
                  <div>
                    <span className="fn-18">AB</span>
                    <p className="fn-30 mb-none" style={{ color: "#EED236" }}>45.2</p>
                  </div>
                </Card.Body>
              </Card>
            </div>

            <div className="col-md-3">
              <Card className="mb-3">
                <Card.Body className="">
                  <div>
                    <span className="fn-18">BC</span>
                    <p className="fn-30 mb-none" style={{ color: "#EED236" }}>45.2</p>
                  </div>
                </Card.Body>
              </Card>
            </div>

            <div className="col-md-3">
              <Card className="mb-3">
                <Card.Body className="">
                  <div>
                    <span className="fn-18">CD</span>
                    <p className="fn-30 mb-none" style={{ color: "#EED236" }}>45.2</p>
                  </div>
                </Card.Body>
              </Card>
            </div>

          </div>
          {/* data 2*/}

        </div>

      </div>
    </div>
  );
}
