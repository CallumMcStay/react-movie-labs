import React from "react";
import { useParams } from "react-router";
import ActorDetails from "../components/actorDetails/";
import PageTemplate from "../components/templateMoviePage";
import useMovie from "../hooks/useMovie";
import { getActor } from "../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";

const ActorPage = (props) => {
  const { id } = useParams();
  const {
    data: actor,
    error,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["actor", { id: id }],
    queryFn: getActor,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {actor ? (
        <>
          <PageTemplate actor={actor}>
            <MovieDetails actor={actor} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for actor details</p>
      )}
    </>
  );
};

export default ActorPage;
