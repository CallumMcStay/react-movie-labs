import React, { useState, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getNowPlayingMovies } from "../api/tmdb-api";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import PlaylistAddIcon from "../components/cardIcons/addToList";

const NowPlayingMoviesPage = (props) => {
  const { data, error, isPending, isError  } = useQuery({
      queryKey: ['nowPlaying'],
      queryFn: getNowPlayingMovies,
    })
    
    if (isPending) {
      return <Spinner />
    }
  
    if (isError) {
      return <h1>{error.message}</h1>
    }  
    
    const nowPlaying = data.results;

  return (
    <PageTemplate
      title="Discover Movies"
      movies={nowPlaying}
      action={(nowPlaying) => <PlaylistAddIcon movie={nowPlaying} />}
    />
  );
};
export default NowPlayingMoviesPage;
