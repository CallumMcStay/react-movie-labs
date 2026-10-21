import React, { useState, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
import PlaylistAddIcon from "../components/cardIcons/addToList";

const UpcomingMoviesPage = (props) => {
  const [movies, setMovies] = useState([]);
  const favorites = movies.filter((m) => m.favorite);
  localStorage.setItem("favorites", JSON.stringify(favorites));

  const addToList = (movieId) => {
    const updatedMovies = movies.map((m) =>
      m.id === movieId ? { ...m, favorite: true } : m,
    );
    setMovies(updatedMovies);
  };

   useEffect(() => {
    getUpcomingMovies().then(movies => {
      setMovies(movies);
    });
  }, []);

  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => <PlaylistAddIcon movie={movie} />}
    />
  );
};
export default UpcomingMoviesPage;
