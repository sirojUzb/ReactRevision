import { createContext, useContext, useMemo, useState } from "react";
import { MOVIES } from "./movies";

const MovieContext = createContext(null);

export function MovieProvider({ children }) {
  const [movies] = useState(MOVIES);
  const [query, setQuery] = useState("");
  const [activeGenre, setActiveGenre] = useState("Barchasi");
  const [favorites, setFavorites] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const genres = useMemo(() => {
    const allGenres = movies.flatMap((movie) => movie.genres);
    return ["Barchasi", ...new Set(allGenres)];
  }, [movies]);

  const visibleMovies = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return movies
      .filter((movie) => movie.title.toLowerCase().includes(normalizedQuery))
      .filter(
        (movie) =>
          activeGenre === "Barchasi" || movie.genres.includes(activeGenre),
      );
  }, [movies, query, activeGenre]);

  function toggleFavorite(id) {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id],
    );
  }

  const selectedMovie =
    movies.find((movie) => movie.id === selectedMovieId) ?? null;

  const value = {
    movies: visibleMovies,
    totalCount: movies.length,
    genres,
    query,
    setQuery,
    activeGenre,
    setActiveGenre,
    favorites,
    toggleFavorite,
    selectedMovie,
    openMovie: setSelectedMovieId,
    closeMovie: () => setSelectedMovieId(null),
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
}

export function useMovies() {
  const ctx = useContext(MovieContext);
  if (!ctx) {
    throw new Error("useMovies() faqat <MovieProvider> ichida ishlatiladi");
  }
  return ctx;
}
