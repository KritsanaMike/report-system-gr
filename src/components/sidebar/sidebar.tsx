import React from "react";
// import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import "./sidebar.css";
const activeClassName = "activeClicked";


export default function Sidebars() {
  const items = Array.from({ length: 16 }, (_, index) => `/${index + 11}`);
  return (
    <div
      style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#1A1A19" className={""} breakpoint={0} toggled={false} minWidth={"5rem"} maxWidth={"17rem"}>
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large "></i>}>
          <span
            className="text-decoration-none logo fn-30"
            style={{ color: "#EED236" }}
          >
            GR
          </span>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu className="nv">
            {items.map((item, index) => (
              <NavLink
                key={item}
                to={"/kiln" + item}
                className={({ isActive }) =>
                  isActive? activeClassName: undefined
                }
              >
                <CDBSidebarMenuItem icon="table" className="pd-menu">
                  <span className="me-5">เตา {index + 11}</span>
                  <NavLink to={"/file" + String(item)}>
                    <button type="button" className="btn btn-dark btn-file">
                      <i className="fa fa-file me-2"></i>
                      File
                    </button>
                  </NavLink>
                </CDBSidebarMenuItem>
              </NavLink>
            ))}
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter className="mt-3 mb-3 center" > COPYRIGHT © 2023 GRAND RUBBER CO., LTD </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
}
