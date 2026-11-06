import React, { useState, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getNowPlayingMovies } from "../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import PlaylistAddIcon from "../components/cardIcons/addToList";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Box from '@mui/material/Box';
import { Link, useLocation } from "react-router";

const NowPlayingMoviesPage = (props) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["nowPlaying", {page}],
    queryFn: () => getNowPlayingMovies(page),
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const nowPlaying = data.results;

  return (
    <>
    <PageTemplate
      title="Discover Movies"
      movies={nowPlaying}
      action={(nowPlaying) => {
      return <PlaylistAddIcon movie={nowPlaying} />
      }}
    />
      <Box sx={{ display: "flex", justifyContent: "center", padding: 3 }}>
        <Pagination
          page={page}
          count={Math.min(data.total_pages, 500)}
          color="primary"
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={`${location.pathname}${item.page === 1 ? "" : `?page=${item.page}`}`}
              {...item}
            />
          )}
        />
      </Box>
    </>
  );
};
export default NowPlayingMoviesPage;
