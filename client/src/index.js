import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./context/authContext/AuthContext";
import { DocumentContextProvider } from "./context/documentContext/DocumentContext";
ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <DocumentContextProvider>
        <App/>
      </DocumentContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
