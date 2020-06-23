import { CircularProgress } from "@material-ui/core";
import React from "react";

export default function LoadingScreen() {
  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "95vh",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <CircularProgress color="secondary" />
      <span style={{ fontSize: 20 }}>Aguarde um instante...</span>
    </div>
  );
}
