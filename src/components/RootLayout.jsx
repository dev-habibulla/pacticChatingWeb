import React from "react";
import Grid from "@mui/material/Grid";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <h1 className="Roottest">Ami Root</h1>
        </Grid>
        <Grid item xs={11}>
          <Outlet />
        </Grid>
      </Grid>
    </div>
  );
};

export default RootLayout;
