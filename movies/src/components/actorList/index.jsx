import React from "react";
import Actor from "../actorCard/";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router";
import { getMovieCredits } from "../../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../spinner";

const ActorList = (props) => {
  const { id } = useParams();
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["credits", { id: id }],
    queryFn: getMovieCredits,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <Grid container>
      {data.cast.slice(0, 6).map((a) => (
        <Grid
          key={a.id}
          size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
          sx={{ padding: "20px" }}
        >
          <Actor actor={a} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ActorList;
