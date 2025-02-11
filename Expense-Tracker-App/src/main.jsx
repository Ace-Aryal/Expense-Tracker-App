import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./features/store";
import { MantineProvider } from "@mantine/core";
const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Provider store={store}>
      <MantineProvider> 
        <App />
      </MantineProvider>
    </Provider>
  </BrowserRouter>
);
