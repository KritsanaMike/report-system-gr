import React from "react";
import { useState } from "react";
import "../listfile/Listfile"
import Sidebar from "../../components/sidebar/sidebar";
import Headers from "../../components/header/Headers";
import { useParams } from 'react-router-dom';
import { Table, Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';


// const data = [
//   { id: 1, name: 'Product A', price: 100 },
//   { id: 2, name: 'Product B', price: 150 },
//   { id: 3, name: 'Product C', price: 200 },
//   { id: 4, name: 'Product D', price: 120 },
//   { id: 5, name: 'Product E', price: 80 },
//   { id: 6, name: 'Product F', price: 300 },
//   // Add more data as needed
// ];

export default function Listfile() {
  const { fileid } = useParams();

  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };


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
          <div> {/* content */}
            <p className="fn-40" style={{ color: "#EED236", }}>ไฟล์ เตา {fileid}</p>
            {/* <TableContainer component={Paper} className="my-table" style={{ background: "#DFDFD9" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>${item.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer> */}

          </div>
        </div>
      </div>
    </div>
  );
}
