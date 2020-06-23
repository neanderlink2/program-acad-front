import React from "react";
import { useAuth } from "../../../contexts/AuthProvider";
import { AsideMenu } from "./AsideMenu/index";
import { Footer } from "./Footer";
import Header from "./Header";
import LoadingScreen from "./Loading";
import Main from "./Main";

export const Layout = () => {
  const { loading } = useAuth();

  if (loading) {
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
