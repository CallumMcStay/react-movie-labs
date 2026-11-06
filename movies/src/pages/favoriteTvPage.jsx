import { useContext } from "react";
import PageTemplate from "../components/templateTvListPage";
import { TvsContext } from "../contexts/tvsContext";
import { useQueries } from "@tanstack/react-query";
import { getTv } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromTvFavorites from "../components/cardIcons/removeFromTvFavorites";

const FavoriteTvsPage = () => {
  const { favorites: tvsIds } = useContext(TvsContext);

  // Create an array of queries and run in parallel.
  const favoriteTvQueries = useQueries({
    queries: tvsIds.map((tvId) => {
      return {
        queryKey: ["tvs", { id: tvId }],
        queryFn: getTv,
      };
    }),
  });

  // Check if any of the parallel queries is still loading.
  const isPending = favoriteTvQueries.find((m) => m.isPending === true);

  if (isPending) {
    return <Spinner />;
  }

  const tvs = favoriteTvQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map((g) => g.id);
    return q.data;
  });

  const toDo = () => true;

  return (
    <PageTemplate
      title="Favourite Tv Shows"
      tvs={tvs}
      action={(tvs) => {
        return (
          <>
            <RemoveFromTvFavorites tvs={tvs} />
          </>
        );
      }}
    />
  );
};

export default FavoriteTvsPage;
