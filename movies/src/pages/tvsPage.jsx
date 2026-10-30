import { getTvs } from "../api/tmdb-api";
import PageTemplate from '../components/templateTvListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'

const TvsPage = (props) => {

  const { data, error, isPending, isError  } = useQuery({
    queryKey: ['discoverTvs'],
    queryFn: getTvs,
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
    <PageTemplate
      name='Discover Tv Shows'
      tvs={tvs}
      action={(tvs) => {
        return <AddToFavoritesIcon tvs={tvs} />
      }}
    />
  );
};
export default TvsPage;
