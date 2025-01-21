import { SidePanel } from "./components/SidePanel";
import "./styles/app.sass";
import "./styles/_global.sass";
import { Outlet } from "react-router-dom";
import { Content } from "./components/Content";
import { UserBanner } from "./components/UserBanner";
import axios from "axios";
import React from "react";
export const App = () => {
  return (
    <div className="app">
      <SidePanel />
      <Content>
        <Outlet />
        <div className="right">
          <UserBanner />
          <div className="right-bottom"></div>
        </div>
      </Content>
    </div>
  );
};
