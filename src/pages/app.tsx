import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { ConnectedRouter } from "connected-react-router";
import { SnackbarProvider } from "notistack";
import React from "react";
import { Provider } from "react-redux";
import store, { history } from "../configs/middlewares";
import programAcadTheme from "../configs/theme";
import AuthProvider from "../contexts/AuthProvider";
import { Layout } from "./shared/layout";


const App = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ThemeProvider theme={programAcadTheme}>
          <SnackbarProvider>
            <AuthProvider>
              <CssBaseline />
              <Layout />
            </AuthProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  );
};

export default App;
