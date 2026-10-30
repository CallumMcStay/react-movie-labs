import React from "react";
import { useParams } from "react-router";
import TvDetails from "../components/tvDetails/";
import PageTemplate from "../components/templateTvPage";
import useTv from "../hooks/useTv";
import { getTv } from "../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";

const TvPage = (props) => {
  const { id } = useParams();
  const {
    data: tv,
    error,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["tv", { id: id }],
    queryFn: getTv,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {tv ? (
        <>
          <PageTemplate tv={tv}>
            <TvDetails tv={tv} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for tv details</p>
      )}
    </>
  );
};

export default TvPage;
