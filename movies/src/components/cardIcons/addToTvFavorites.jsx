import { useContext } from "react";
import { TvsContext } from "../../contexts/tvsContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

const AddToTvFavoritesIcon = ({ tvs }) => {
  const context = useContext(TvsContext);

  const handleAddToFavorites = (e) => {
    e.preventDefault();
    context.addToFavorites(tvs);
  };

  return (
    <IconButton aria-label="add to favorites" onClick={handleAddToFavorites}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToTvFavoritesIcon;
