import React from "react";
import { useLocation } from "react-router";
import PageTemplate from "../components/templateTvPage";
import TvReview from "../components/tvReview";

const TvReviewPage = (props) => {
  let location = useLocation();
  const {tv, review} = location.state;
  
  return (
    <PageTemplate tv={tv}>
      <TvReview review={review} />
    </PageTemplate>
  );
};

export default TvReviewPage;
