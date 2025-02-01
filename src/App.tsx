import { SidePanel } from "./components/SidePanel";
import "./styles/app.sass";
import "./styles/_global.sass";
import { Outlet } from "react-router-dom";
import { Content } from "./components/Content";
import { UserBanner } from "./components/UserBanner";
import axios from "axios";
import React from "react";
import { Popup } from "./components/Popup";
import { PopupProvider } from "./contexts/PopupContext";
export const App = () => {
  return (
    <div className="app">
      <PopupProvider>
        <Popup />
        <SidePanel />
        <Content>
          <Outlet />
          <div className="right">
            <UserBanner />
            <div className="right-bottom"></div>
          </div>
        </Content>
      </PopupProvider>
    </div>
  );
};
