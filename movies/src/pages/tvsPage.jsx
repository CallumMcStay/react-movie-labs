import { getTvs } from "../api/tmdb-api";
import PageTemplate from '../components/templateTvListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToTvFavoritesIcon from '../components/cardIcons/addToTvFavorites'
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Box from '@mui/material/Box';
import { Link, useLocation } from "react-router";

const TvsPage = (props) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);

  const { data, error, isPending, isError  } = useQuery({
    queryKey: ['discoverTvs', {page}],
    queryFn: () => getTvs(page),
  })
  
  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  
  const tvs = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = tvs.filter(t => t.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const addToFavorites = (tvsId) => true 

  return (
    <>
    <PageTemplate
      name='Discover Tv Shows'
      tvs={tvs}
      action={(tvs) => {
        return <AddToTvFavoritesIcon tvs={tvs} />
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
export default TvsPage;
