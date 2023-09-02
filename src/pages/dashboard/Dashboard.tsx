import React, { useState, useEffect, useRef } from "react";
import Sidebars from "../../components/sidebar/sidebar";
import Headers from "../../components/header/Headers";
import Card from "react-bootstrap/Card";
import "./Dashboard.css";
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useParams } from 'react-router-dom';

interface MyDataItem {
  blower: number,
  cycle: number,
  humanity: number,
  id: number,
  oven: number,
  oventemp: number,
  roomtemp: number,
  startoven: number,
  status_pdf: number,
  time_stamp: string
}
interface MyDataStatusItem {
  cycle: number,
  id: number,
  oven: number,
  oven_state: number,
  time_stamp: string
}

export default function Dashboard(props: HighchartsReact.Props) {

  const [currentLocalTime, setCurrentLocalTime] = useState(new Date());
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const { id } = useParams();
  const [mydata, setData] = useState<MyDataItem[]>([]);
  const [mydataStatus, setDataStatus] = useState<MyDataStatusItem[]>([]);
  // const [mylastCycle, setlastCycle] = useState(0)
  const [isLoading, setIsLoading] = useState(false);

  interface mydata {
    startoven: number;
    oven: number;
    cycle: number;
    humanity: number;
    roomtemp: number;
    oventemp?: number;
    blower?: number;
    time_stamp: number;
  }

  useEffect(() => {
    const fetchData = async () => {
      const token = 'O8sVbUAiTUN6ohq3EzTPEbdy2_6CrUSwzVt1_vXnu9c';

      try {
        const response = await fetch(import.meta.env.VITE_API_ENDPOINT + '?oven=' + id, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const jsonData = await response.json();
        setData(jsonData);


      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchStatus = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_ENDPOINT + 'status?oven=' + id, {
          method: 'GET'
        });

        const jsonData = await response.json();
        setDataStatus(jsonData);


      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // console.log(mydataStatus);

    fetchData();
    fetchStatus();
    setCurrentLocalTime(new Date());
  }, [id]);


  const handleDownloadClick = async () => {
    try {
      setIsLoading(true);
      // const response = await axios.get('YOUR_BACKEND_API_URL/download-pdf', {
      //   responseType: 'blob', // This indicates that the response should be treated as a binary blob
      // });
      console.log(typeof (mydata[mydata.length - 1]));


      // const lst = mydata[mydata.length - 1].cycle;
      const lst = mydata[mydata.length - 1].cycle;
      const lsCycle = lst.toString()
      // const currentDate = new Date();

      const response = await fetch(import.meta.env.VITE_API_ENDPOINT + 'pdf?oven=' + id + '&cycle=' + lsCycle);

      // console.log(response.data);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;

      a.setAttribute('download', 'download.pdf');
      document.body.appendChild(a);
      a.click();

      setIsLoading(false);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      setIsLoading(false);
    }
  };

  // Format options for Thai locale
  const thaiLocaleOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long', // 'long' for full month name, 'short' for abbreviated
    day: 'numeric',
    weekday: 'long', // Display the full day name
    hour12: false // Use 24-hour format
  };

  const thaiLocaleDatetime: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long', // 'long' for full month name, 'short' for abbreviated
    day: 'numeric',
    hour: '2-digit', // Include hours in 2-digit format (00-23)
    minute: '2-digit', // Include minutes in 2-digit format (00-59)
    hour12: false, // Use 24-hour format
  };

  const thaiTime: Intl.DateTimeFormatOptions = {
    hour: '2-digit', // Include hours in 2-digit format (00-23)
    minute: '2-digit', // Include minutes in 2-digit format (00-59)
    hour12: false, // Use 24-hour format
  };

  const thaiFormattedDateTime = currentLocalTime.toLocaleString('th-TH', thaiLocaleOptions);

  let chartDataRoomTemp: { x: number; y: number; }[] = []
  let chartDataHumanity: { x: number; y: number; }[] = []
  let chartDatablower: { x: number; y: number; }[] = []
  let chartDataOvenTemp: { x: number; y: number; }[] = []

  let statTime = '-';
  let stopTime = '-';
  let lastUpdateTime = '-';
  let lastUpdateDate = '-';
  let klinstate = 0;


  if (mydataStatus.length) {

    klinstate = mydataStatus[0].oven_state;
    if (klinstate === 0) {
      const timeString = mydataStatus[mydataStatus.length - 1].time_stamp;
      const parsedTime = new Date(timeString);
      parsedTime.setUTCHours(parsedTime.getUTCHours() - 7);
      stopTime = parsedTime.toLocaleString('th-TH', thaiLocaleDatetime);
      // console.log(stopTime);
    }
  }


  if (mydata.length > 0) {
    const lastCycle = mydata[mydata.length - 1].cycle;
    // const lastCycleData = mydata.filter(item => item.cycle === lastCycle);
    const lastCycleData: MyDataItem[] = mydata.filter((item: MyDataItem) => item.cycle === lastCycle);

    // Start Time 
    const timeString = mydata[0].time_stamp;
    const parsedTime = new Date(timeString);
    parsedTime.setUTCHours(parsedTime.getUTCHours() - 7);
    statTime = parsedTime.toLocaleString('th-TH', thaiLocaleDatetime);

    // last Updat Time 
    const timeString2 = mydata[mydata.length - 1].time_stamp;
    const parsedTime2 = new Date(timeString2);
    parsedTime2.setUTCHours(parsedTime2.getUTCHours() - 7);
    lastUpdateTime = parsedTime2.toLocaleString('th-TH', thaiTime);
    lastUpdateTime = lastUpdateTime + ' น.'
    lastUpdateDate = parsedTime2.toLocaleString('th-TH', thaiLocaleOptions);

    // Map lastCycleData to chartDataRoomTemp
    chartDataRoomTemp = lastCycleData.map(entry => ({
      x: new Date(entry.time_stamp).getTime(),
      y: entry.roomtemp
    }));

    chartDataHumanity = lastCycleData.map(entry => ({
      x: new Date(entry.time_stamp).getTime(),
      y: entry.humanity
    }));

    chartDatablower = lastCycleData.map(entry => ({
      x: new Date(entry.time_stamp).getTime(),
      y: entry.blower
    }));

    chartDataOvenTemp = lastCycleData.map(entry => ({
      x: new Date(entry.time_stamp).getTime(),
      y: entry.oventemp
    }));


  }

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
          // If this.value is a string, convert it to a number
          const valueAsNumber = typeof this.value === 'string' ? parseInt(this.value) : this.value;

          // Format x-axis labels as per your requirement
          return Highcharts.dateFormat('%H:%M', valueAsNumber);
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
            value: 50,
            color: 'red', // Change the color as per your preference
            dashStyle: 'Dot',
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
        data: chartDataRoomTemp,
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
        data: chartDataHumanity,
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
          const valueAsNumber = typeof this.value === 'string' ? parseInt(this.value) : this.value;

          return Highcharts.dateFormat('%H:%M', valueAsNumber);
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
          text: 'อุณหภูมิในเตาเผา (°C) </br> และ อุณหภูมิใน Blower (°C)',
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
        data: chartDataOvenTemp,
        yAxis: 0,
        type: 'spline', // You can use 'line' for simple lines
        color: 'red',
        marker: {
          symbol: 'circle',
          enabled: true,
          radius: 3, // Adjust the size of the circle data points
          fillColor: 'red', // Set custom color for temperature data points
        },
      },
      {
        name: 'อุณหภูมิใน Blower',
        data: chartDatablower,
        yAxis: 0,
        type: 'spline',
        color: 'yellow',
        marker: {
          symbol: 'circle',
          enabled: true,
          radius: 3, // Adjust the size of the circle data points
          fillColor: 'yellow', // Set custom color for temperature data points
        },
      },
    ],
  };

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
                    <span className="fn-20 p-2 float-start " >{thaiFormattedDateTime}</span>
                    <span className="fn-20 p-2 float-end" >หมายเลขเตา : {id}</span>
                  </div>
                  <div className="tm-onoff">
                    <span className="fn-20 p-2 align-baseline" >เวลาเปิดเตา : </span><span className="fn-20 text-yellow tm-onoff-bg align-baseline " >{statTime}</span>
                  </div>
                  <div className="tm-onoff">
                    <span className="fn-20 p-2 align-baseline" >เวลาปิดเตา : </span><span className="fn-20 text-yellow tm-onoff-bg align-baseline " >{stopTime}</span>
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
                        <span className="float-start ms-4 " >{lastUpdateTime}</span>
                        <span className="float-end me-4 " >{lastUpdateDate}</span>
                      </div>
                    </div>

                    <div className="col-md-12 mt-4">
                      <div className="fn-20 ">
                        <span className="float-start ms-4 align-baseline" >สถานะเตา</span>
                        <span className="float-end me-4 align-baseline" ><button type="button" className={klinstate === 1 ? 'btn btn-primary text-black stateklinYello' : 'btn btn-primary text-black stateklinRed'} >{klinstate === 1 ? 'เปิด' : 'ปิด'}</button></span>
                      </div>
                    </div>

                    <div className="col-md-12 mt-4">
                      <div className="fn-20 ms-4 me-4 d-grid align-baseline" >
                        <button onClick={handleDownloadClick} disabled={isLoading} type="button" className="btn btn-primary text-black" style={{ backgroundColor: "#EED236", border: "none", }} > {isLoading ? 'กำลังดาวโหลด...' : 'ดาวโหลดตอนนี้ '}</button>
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
          {/* <div className="row">
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

          </div> */}
          {/* data 2*/}

        </div>

      </div>
    </div>
  );
}
