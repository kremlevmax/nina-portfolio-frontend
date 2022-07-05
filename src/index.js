import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { HashRouter } from "react-router-dom";
import "normalize.css";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <HashRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </HashRouter>
  </React.StrictMode>
);
