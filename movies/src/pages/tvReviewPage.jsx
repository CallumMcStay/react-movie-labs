import React from "react";
import { useLocation } from "react-router";
import PageTemplate from "../components/templateMoviePage";
import TvReview from "../components/tvReview";

const TvReviewPage = (props) => {
  let location = useLocation();
  const {movie, review} = location.state;
  
  return (
    <PageTemplate movie={movie}>
      <TvReview review={review} />
    </PageTemplate>
  );
};

export default TvReviewPage;
