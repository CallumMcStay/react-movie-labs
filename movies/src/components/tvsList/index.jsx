import React from "react";
import Tvs from "../tvsCard";
import Grid from "@mui/material/Grid";

const TvsList = (props) => {
  let tvsCards = props.tvs.map((t) => (
    <Grid
      key={t.id}
      size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
      sx={{ padding: "20px" }}
    >
      <Tvs key={t.id} movie={t} action={props.action} />
    </Grid>
  ));
  return tvsCards;
};

export default TvsList;
