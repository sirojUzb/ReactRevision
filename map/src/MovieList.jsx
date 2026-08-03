import MovieCard from "./MovieCard";

export default function MovieList({ movies, onToggleWatchlist }) {
  if (movies.length === 0) {
    return (
      <p className="empty-state">
        Hech qanday film topilmadi. Filterlarni o'zgartirib ko'ring.
      </p>
    );
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onToggleWatchlist={onToggleWatchlist}
        />
      ))}
    </div>
  );
}
