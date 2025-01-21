import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Tasks } from "./pages/Tasks";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
