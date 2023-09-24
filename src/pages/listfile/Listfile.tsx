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
// import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";

// interface PaginatorResult<T> {
//   page: number;
//   per_page: number;
//   pre_page: number | null;
//   next_page: number | null;
//   total: number;
//   total_pages: number;
//   data: T[];
// }

interface DataItem {
  // Define the structure of your data here
  id: number;
  filename: string;
  oven_name: string;
  time_stamp: string;
  // Other properties...
}

// function paginator(items: string | unknown[], current_page: number, per_page_items: number) {
//   // eslint-disable-next-line prefer-const
//   let page = current_page || 1,
//     // eslint-disable-next-line prefer-const
//     per_page = per_page_items,
//      // eslint-disable-next-line prefer-const
//     offset = (page - 1) * per_page,
//      // eslint-disable-next-line prefer-const
//     paginatedItems = items.slice(offset).slice(0, per_page_items),
//      // eslint-disable-next-line prefer-const
//     total_pages = Math.ceil(items.length / per_page);
//   // console.log("Anzahl: " + items.lgenth);

//   return {
//     page: page,
//     per_page: per_page,
//     pre_page: page - 1 ? page - 1 : null,
//     next_page: total_pages > page ? page + 1 : null,
//     total: items.length,
//     total_pages: total_pages,
//     data: paginatedItems,
//   };
// }


// eslint-disable-next-line no-empty-pattern
// export default function Listfile({}: DataTableProps) {
  export default function Listfile() {
  const { fileid } = useParams();
  const [mydata, setData] = useState<DataItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
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
  }, [fileid]);

  const count = Math.ceil(mydata.length / 10);
  const [page, setPage] = React.useState(1);
  const handleChange = (_event: unknown, value: number) => {
    setPage(paginator(mydata, value, 10).page);
  };

  function paginator(items: DataItem[], current_page: number, per_page_items: number) {
  const page = current_page || 1;
  const per_page = per_page_items;
  const offset = (page - 1) * per_page;
  const paginatedItems = items.slice(offset, offset + per_page);
  const total_pages = Math.ceil(items.length / per_page);

  return {
    page: page,
    per_page: per_page,
    pre_page: page > 1 ? page - 1 : null,
    next_page: total_pages > page ? page + 1 : null,
    total: items.length,
    total_pages: total_pages,
    data: paginatedItems,
  };
}


  const handleDownloadClick = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(import.meta.env.VITE_API_ENDPOINT + 'pdf/' + id);
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
              {paginator(mydata, page, 10).data.map((value, index) => {
                 const startIndex = value.filename.lastIndexOf('/') + 1; // Find the index of the last slash
                 const extractedFileName = value.filename.substring(startIndex); // Extract the file name

                 const thaiLocaleDatetime: Intl.DateTimeFormatOptions = {
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

                const pdf_id = value.id.toString();

                return (
                  <ListItem
                    alignItems="flex-start"
                    divider={index < mydata.length - 1}
                  >
                    <ListItemText
                      // primary={value.carrierName}
                      secondary={
                        <React.Fragment>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div className="p-2">
                              <b className="fn-18">ไฟล์ที่ {index+1} :</b> <span className="fn-18">{extractedFileName} ({times})</span>
                            </div>
                            <div>
                              {/* <button type="button" className="btn btn-primary"> ดาวโหลด  <i className="fa fa-download" aria-hidden="true"></i></button> */}
                              <button onClick={() => handleDownloadClick(pdf_id)} disabled={isLoading} type="button" className="btn btn-primary text-black" style={{ backgroundColor: "#EED236", border: "none", }}> {isLoading ? 'กำลังดาวโหลด...' : 'ดาวโหลด '}</button>
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

