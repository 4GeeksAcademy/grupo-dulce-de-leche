import React, { useContext } from "react";
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
import LogoutButton from './LogoutButton';
import { Context } from "../store/appContext";


const AlmaCenaSidebar = () => {
  const { store, actions } = useContext(Context);
  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#415e4c">
        <CDBSidebarHeader prefix={<i className="fa-solid fa-arrow-left text-white"/>}>
          <div className="container" style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={logo}
              alt=""
              style={{ width: '100%' }}
            />
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
            <LogoutButton actions={actions}/>
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