import React from 'react';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
            <CDBSidebar textColor="#fff" backgroundColor="#1A1A19">
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                    <a href="/" className="text-decoration-none" style={{ color: '#EED236' }}>
                        GR
                    </a>
                </CDBSidebarHeader>

                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        <NavLink exact to="/" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="home" >Dashboard</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/11" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="table">เตา 11</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/12" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="table">เตา 12</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/13" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="table">เตา 13</CDBSidebarMenuItem>
                        </NavLink>
                        {/* <NavLink exact to="/profile" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="user">Profile page</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/analytics" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="chart-line">Analytics</CDBSidebarMenuItem>
                        </NavLink>

                        <NavLink exact to="/hero404" target="_blank" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="exclamation-circle">404 page</CDBSidebarMenuItem>
                        </NavLink> */}
                    </CDBSidebarMenu>
                </CDBSidebarContent>

                <CDBSidebarFooter style={{ textAlign: 'center' }}>
                </CDBSidebarFooter>
            </CDBSidebar>
        </div>
    );
};
