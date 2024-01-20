import CssBaseline from "@mui/material/CssBaseline";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import "./index.css";

import { store } from "./redux/store";
import MainRouters from "./routers";
import theme from "./theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <MainRouters />
        </ErrorBoundary>
      </CssVarsProvider>
    </Provider>
  </React.StrictMode>
);
