import { getMovies } from "../api/tmdb-api";
import { Link, MemoryRouter, Route, Routes, useLocation } from "react-router";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

const HomePage = (props) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["discover", {page}],
    queryFn: () => getMovies(page),
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter((m) => m.favorite);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  const addToFavorites = (movieId) => true;

  return (
    <>
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />;
      }}
    />
    <Pagination
      page={page}
      count={Math.min(data.total_pages,500)}
      color="primary"
      renderItem={(item) => (
        <PaginationItem
        component={Link}
        to={`${location.pathname}${item.page === 1 ? "" : `?page=${item.page}`}`}
        {...item}
      />
      )}
      />
      </>
  );
};
      
export default HomePage;
