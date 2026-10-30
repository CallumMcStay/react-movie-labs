import React, { useState } from "react";

export const TvsContext = React.createContext(null);

const TvsContextProvider = (props) => {
  const [favorites, setFavorites] = useState( [] )
  const [myReviews, setMyReviews] = useState( {} )
  const [watchList, setWatchList] = useState( [] )

  const addToFavorites = (tvs) => {
    let newFavorites = [];
    if (!favorites.includes(tvs.id)){
      newFavorites = [...favorites, tvs.id];
    }
    else{
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites)
  };

  const addReview = (tvs, review) => {
    setMyReviews( {...myReviews, [tvs.id]: review} )
    };
  
  // We will use this function in the next step
  const removeFromFavorites = (tvs) => {
    setFavorites( favorites.filter(
      (mId) => mId !== tvs.id
    ) )
  };

  const addToWatchList = (tvs) => {
    let newWatchList = [];
    if (!watchList.includes(tvs.id)){
      newWatchList = [...watchList, tvs.id];
    }
    else{
      newWatchList = [...watchList];
    }
    setWatchList(newWatchList)
  };

  const removeFromWatchList = (tvs) => {
    setWatchList( watchList.filter(
      (mId) => mId !== tvs.id
    ) )
  }

  return (
    <TvsContext.Provider
      value={{
        favorites,
        watchList,
        addToFavorites,
        removeFromFavorites,
        addToWatchList,
        removeFromWatchList,
        addReview
      }}
    >
      {props.children}
    </TvsContext.Provider>
  );
};

export default TvsContextProvider;
