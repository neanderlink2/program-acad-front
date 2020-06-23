import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../configs/middlewares";
import { AsideMenu } from "./AsideMenu/index";
import { Footer } from "./Footer";
import Header from "./Header";
import LoadingScreen from "./Loading";
import Main from "./Main";

export const Layout = () => {
  const carregandoLogin = useSelector(
    (states: RootState) => states.login.carregando
  );

  if (carregandoLogin) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Header />
      <Main />
      <Footer />
      <AsideMenu />
    </>
  );
};
