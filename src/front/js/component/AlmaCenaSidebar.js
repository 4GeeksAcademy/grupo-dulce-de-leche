import React from 'react';
import "../../styles/sidebar.css";
import logo from "../../img/logoalmacena.png";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';


const AlmaCenaSidebar = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#415e4c">
      <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
          <div className="container" style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={logo}
              alt=""
              style={{ width: '100%' }}
            />
            <h6 className="ms-2">BABYCARE ™</h6>
          </div>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/dashboard" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table-columns fa-xl"> Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/dashboard/ingredients" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="wheat-awn fa-xl">My Ingredients</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/dashboard/recipes" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="book fa-xl">My Recipes</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/dashboard/products" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="cake-candles fa-xl" >My Products</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>

            
          <div
            style={{
              padding: '20px 5px',
            }}
          >
<Button>
Donate
                
</Button>
            
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default AlmaCenaSidebar;