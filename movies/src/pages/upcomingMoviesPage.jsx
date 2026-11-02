import React, { useState, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import PlaylistAddIcon from "../components/cardIcons/addToList";

const UpcomingMoviesPage = (props) => {
  const { data, error, isPending, isError  } = useQuery({
      queryKey: ['upcoming'],
      queryFn: getUpcomingMovies,
    })
    
    if (isPending) {
      return <Spinner />
    }
  
    if (isError) {
      return <h1>{error.message}</h1>
    }  
    
    const upcoming = data.results;

  return (
    <PageTemplate
      title="Discover Movies"
      movies={upcoming}
      action={(upcoming) => <PlaylistAddIcon movie={upcoming} />}
    />
  );
};
export default UpcomingMoviesPage;
