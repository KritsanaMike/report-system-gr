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


export default function Listfile({ itemsPerPage }: DataTableProps) {
  const { fileid } = useParams();
  const [mydata, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(6666);
    const fetchData = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_ENDPOINT + 'list_pdf_file/' + fileid, {
          method: 'GET'
        });

        if(response){
          const jsonData = await response.json();
          setData(jsonData);
  
        }
      } catch (error) {
        setData([]);
        console.error('Error fetching data:');
      }
    };



    fetchData();
    console.log(mydata);


  }, [fileid]);

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


  const handleDownloadClick = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(import.meta.env.VITE_API_ENDPOINT + 'pdf/' + id);

      console.log(response.data);
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
            <p className="fn-40 GFG" style={{ color: "#EED236" }}>
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
                 const startIndex = value.filename.lastIndexOf('/') + 1; // Find the index of the last slash
                 const extractedFileName = value.filename.substring(startIndex); // Extract the file name

                 const thaiLocaleDatetime = {
                  year: 'numeric',
                  month: 'long', // 'long' for full month name, 'short' for abbreviated
                  day: 'numeric',
                  hour: '2-digit', // Include hours in 2-digit format (00-23)
                  minute: '2-digit', // Include minutes in 2-digit format (00-59)
                  hour12: false, // Use 24-hour format
                };
                const timeString = value.time_stamp;
                const parsedTime = new Date(timeString);
                parsedTime.setUTCHours(parsedTime.getUTCHours() - 7);
                const times = parsedTime.toLocaleString('th-TH', thaiLocaleDatetime);
               
                return (
                  <ListItem
                    alignItems="flex-start"
                    divider={index < mydata.length - 1}
                  >
                    <ListItemText
                      primary={value.carrierName}
                      secondary={
                        <React.Fragment>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div className="p-2">
                              <b className="fn-18">ไฟล์ที่ {index+1} :</b> <span className="fn-18">{extractedFileName} ({times})</span>
                            </div>
                            <div>
                              {/* <button type="button" className="btn btn-primary"> ดาวโหลด  <i className="fa fa-download" aria-hidden="true"></i></button> */}
                              <button onClick={() => handleDownloadClick(value.id)} disabled={isLoading} type="button" className="btn btn-primary text-black" style={{ backgroundColor: "#EED236", border: "none", }}> {isLoading ? 'กำลังดาวโหลด...' : 'ดาวโหลด '}</button>
                            </div>
                          </div>
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
