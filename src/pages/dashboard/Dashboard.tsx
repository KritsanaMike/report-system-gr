import React , { useRef } from "react";
import { render } from 'react-dom'
import Sidebars from "../../components/sidebar/sidebar";
import Headers from "../../components/header/Headers";
import Card from "react-bootstrap/Card";
import "./Dashboard.css";
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const options: Highcharts.Options = {
  title: {
    text: 'My chart'
  },
  series: [{
    type: 'line',
    data: [1, 2, 3]
  }]
};


export default function Dashboard(props: HighchartsReact.Props) {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);


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
                    <span className="fn-20 p-2 float-end" >หมายเลขเตา : 11</span>
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
                        <span className="float-start ms-4 " >เวลา 08:00 น.</span>
                        <span className="float-end me-4 " >วันที่ 30 มิ.ย. 2566</span>
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
                    options={options}
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
                    options={options}
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
                    <p className="fn-30 mb-none" style={{color:"#24AF0D"}}>45.2</p>
                  </div>
                </Card.Body>
              </Card>
            </div>

            <div className="col-md-3">
              <Card className="mb-3">
                <Card.Body className="">
                  <div>
                    <span className="fn-18">ความชื้นในห้องอบ  (องศา)</span>
                    <p className="fn-30 mb-none" style={{color:"#004EDA"}}>45.2</p>
                  </div>
                </Card.Body>
              </Card>
            </div>

            <div className="col-md-3">
              <Card className="mb-3">
                <Card.Body className="">
                  <div>
                    <span className="fn-18">อุณหภูมิในเตาเผา  (องศา)</span>
                    <p className="fn-30 mb-none" style={{color:"#DA1A00"}}>45.2</p>
                  </div>
                </Card.Body>
              </Card>
            </div>

            <div className="col-md-3">
              <Card className="mb-3">
                <Card.Body className="">
                  <div>
                    <span className="fn-18">อุณหภูมิใน Blower  (องศา)</span>
                    <p className="fn-30 mb-none" style={{color:"#EED236"}}>45.2</p>
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
                  <span className="fn-18">อุณหภูมิในห้องอบ  (องศา)</span>
                    <p className="fn-30 mb-none" style={{color:"#EED236"}}>45.2</p>
                  </div>
                </Card.Body>
              </Card>
            </div>

            <div className="col-md-3">
              <Card className="mb-3">
                <Card.Body className="">
                  <div>
                    <span className="fn-18">ความชื้นในห้องอบ  (องศา)</span>
                    <p className="fn-30 mb-none" style={{color:"#EED236"}}>45.2</p>
                  </div>
                </Card.Body>
              </Card>
            </div>

            <div className="col-md-3">
              <Card className="mb-3">
                <Card.Body className="">
                  <div>
                    <span className="fn-18">อุณหภูมิในเตาเผา  (องศา)</span>
                    <p className="fn-30 mb-none" style={{color:"#EED236"}}>45.2</p>
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
