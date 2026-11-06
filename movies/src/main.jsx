import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import SiteHeader from "./components/siteHeader";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from "./pages/addMovieReviewPage";
import WatchListPage from "./pages/watchListPage";
import TopRateMoviesPage from "./pages/topRatedMoviesPage";
import TvsPage from "./pages/tvsPage";
import TvsContextProvider from "./contexts/tvsContext";
import TvPage from "./pages/tvDetailsPage";
import TvReviewPage from "./pages/tvReviewPage";
import NowPlayingMoviesPage from "./pages/nowPlayingMoviesPage";
import ActorDetailsPage from "./pages/actorDetailsPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});
const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#E50914",
      },
      secondary: {
        main: "#F5C518",
      },
      background: {
        default: "#141414",
        paper: "#1F1F1F",
      },
      text: {
        primary: "#FFFFFF",
      },
    },
  });

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <SiteHeader />
          <MoviesContextProvider>
            <TvsContextProvider>
              <Routes>
                <Route path="/reviews/:id" element={<MovieReviewPage />} />
                <Route path="/tvreviews/:id" element={<TvReviewPage />} />
                <Route
                  path="/movies/favorites"
                  element={<FavoriteMoviesPage />}
                />
                <Route
                  path="/movies/upcoming"
                  element={<UpcomingMoviesPage />}
                />
                <Route
                  path="/movies/nowplaying"
                  element={<NowPlayingMoviesPage />}
                />
                <Route
                  path="/movies/toprated"
                  element={<TopRateMoviesPage />}
                />
                <Route path="/movies/watchlist" element={<WatchListPage />} />
                <Route path="/reviews/form" element={<AddMovieReviewPage />} />
                <Route path="/tvs/:id" element={<TvPage />} />
                <Route path="/actors/:id" element={<ActorDetailsPage />} />
                <Route path="/movies/:id" element={<MoviePage />} />
                <Route path="/tvs" element={<TvsPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </TvsContextProvider>
          </MoviesContextProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);
