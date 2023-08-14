import React from "react";
import { useState, useEffect } from "react";

import Sidebar from "../../components/sidebar/sidebar";
import Headers from "../../components/header/Headers";
import { useParams } from "react-router-dom";
import './listfile.css'
// import ReactPaginate from "react-paginate";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";

function paginator(items, current_page, per_page_items) {
  let page = current_page || 1,
    per_page = per_page_items,
    offset = (page - 1) * per_page,
    paginatedItems = items.slice(offset).slice(0, per_page_items),
    total_pages = Math.ceil(items.length / per_page);
  // console.log("Anzahl: " + items.lgenth);

  return {
    page: page,
    per_page: per_page,
    pre_page: page - 1 ? page - 1 : null,
    next_page: total_pages > page ? page + 1 : null,
    total: items.length,
    total_pages: total_pages,
    data: paginatedItems,
  };
}

// export const Listfile = ({ itemsPerPage }: DataTableProps) =>{
// 

// interface SensorData {
//   startoven: number;
//   oven: number;
//   cycle: number;
//   humanity: number;
//   roomtemp: number;
//   oventemp?: number;
//   blower?: number;
//   time_stamp: number;
// }

export default function Listfile({ itemsPerPage }: DataTableProps) {




  const { fileid } = useParams();
  const [mydata, setData] = useState([])
  // const [ovenData, setOvenData] = useState<SensorData[]>([]);
  // const [selectedOven, setSelectedOven] = useState<number | null>(null);
  console.log(fileid);



  useEffect(() => {
    console.log(6666);
    const fetchData = async () => {
      const token = 'O8sVbUAiTUN6ohq3EzTPEbdy2_6CrUSwzVt1_vXnu9c';

      try {
        const response = await fetch(import.meta.env.VITE_API_ENDPOINT+'?oven='+fileid, {
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
   
    

    fetchData();
    console.log(mydata);
    
    
  }, [fileid]);

  const carrierDetails = [
    {
      name: "วันที่ 26 มกราคม 2566",
    },
    {
      name: "วันที่ 26 มกราคม 2566",
    },
    {
      name: "วันที่ 26 มกราคม 2566",
    },
    {
      name: "วันที่ 26 มกราคม 2566",
    },
    {
      name: "วันที่ 26 มกราคม 2566",
    },
    {
      name: "วันที่ 26 มกราคม 2566",
    },
    {
      name: "วันที่ 26 มกราคม 2566",
    },
    {
      name: "วันที่ 26 มกราคม 2566",
    },
    {
      name: "วันที่ 26 มกราคม 2566",
    },

  ];

  const count = Math.ceil(mydata.length / 3);
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(paginator(mydata, value, 3).page);
  };
  const [checked, setChecked] = React.useState([]);
  const handleOnChange = (e, index) => {
    let prev = checked;
    let itemIndex = prev.indexOf(index);
    if (itemIndex !== -1) {
      prev.splice(itemIndex, 1);
    } else {
      prev.push(index);
    }
    setChecked([...prev]);
  };
  console.log(checked);

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
        <div className="p-4 overflow-auto">
          <div>
            {" "}
            {/* content */}
            <p className="fn-40" style={{ color: "#EED236" }}>
              ไฟล์ เตา {fileid}
            </p>
          </div>
          {/* table */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <List
              sx={{
                width: "100%",
                maxWidth: "100rem",
                bgcolor: "#DFDFD9",
              }}
            >
              {paginator(mydata, page, 3).data.map((value, index) => {
                return (
                  <ListItem
                    alignItems="flex-start"
                    divider={index < mydata.length - 1}
                  >
                    <ListItemText
                      primary={value.carrierName}
                      secondary={
                        <React.Fragment>
                          <Stack direction="column" spacing={1}>
                            <div className="p-2">
                              <b>Name</b> {value.humanity + " : " + index}
                            </div>
                          </Stack>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                );
              })}
            </List>
            <div style={{ display: "flex", justifyContent: "right" }}>
              <Pagination
                count={count}
                page={page}
                onChange={handleChange}
              // color="success"
              />
            </div>
          </div>
          {/* </Container> */}
        </div>
      </div>
    </div>
  );
}
