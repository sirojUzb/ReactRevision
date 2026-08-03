import { useState } from "react";
import { MOVIES } from "./movies";
import MovieList from "./MovieList";
import Filters from "./Filters";
import "./MovieCatalog.css";

const GENRES = [...new Set(MOVIES.map((movie) => movie.genre))];

export default function MovieCatalog() {
  const [movies, setMovies] = useState(MOVIES);
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("All");
  const [sortBy, setSortBy] = useState("title");
  const [watchlistOnly, setWatchlistOnly] = useState(false);

  function toggleWatchlist(id) {
    setMovies((movies) =>
      movies.map((movie) =>
        movie.id === id ? { ...movie, inWatchlist: !movie.inWatchlist } : movie,
      ),
    );
  }

  const visibleMovies = movies
    .filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase()))
    .filter((movie) => genre === "All" || movie.genre === genre)
    .filter((movie) => !watchlistOnly || movie.inWatchlist)
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "year") return b.year - a.year;
      return a.title.localeCompare(b.title);
    });

  const watchlistCount = movies.filter((movie) => movie.inWatchlist).length;
  const averageRating = visibleMovies.length
    ? (
        visibleMovies.reduce((sum, movie) => sum + movie.rating, 0) /
        visibleMovies.length
      ).toFixed(1)
    : "—";

  return (
    <div className="movie-catalog">
      <header className="movie-catalog-header">
        <h1>🎬 Movie Catalog</h1>
        <p>Qidiring, janr bo'yicha filtrlang, saralang va Watchlist yarating</p>
      </header>

      <Filters
        query={query}
        onQueryChange={setQuery}
        genres={GENRES}
        genre={genre}
        onGenreChange={setGenre}
        sortBy={sortBy}
        onSortChange={setSortBy}
        watchlistOnly={watchlistOnly}
        onWatchlistOnlyChange={setWatchlistOnly}
        watchlistCount={watchlistCount}
      />

      <p className="results-summary">
        {visibleMovies.length} ta film topildi · O'rtacha reyting:{" "}
        {averageRating}
      </p>

      <MovieList movies={visibleMovies} onToggleWatchlist={toggleWatchlist} />
    </div>
  );
}
