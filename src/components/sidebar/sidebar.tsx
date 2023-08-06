import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
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
let activeClassName = "activeClicked";


export default function Sidebars() {
  const items = Array.from({ length: 5 }, (_, index) => `/${index + 10}`);
  return (
    <div
      style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#1A1A19">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large "></i>}>
          <a
            href="/"
            className="text-decoration-none logo fn-30"
            style={{ color: "#EED236" }}
          >
            GR
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <CDBSidebarMenuItem icon="home">Dashboard</CDBSidebarMenuItem>

            {items.map((item, index) => (
              <NavLink
                to={"/blower" + item}
                className={({ isActive }) =>
                  isActive ? activeClassName : undefined
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

        <CDBSidebarFooter style={{ textAlign: "center" }}></CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
}
