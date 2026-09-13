import { useMovies } from "./MovieContext";
import MovieCard from "./MovieCard";

export default function MovieGrid() {
  const { movies } = useMovies();

  if (movies.length === 0) {
    return (
      <p className="empty-state">
        Hech qanday film topilmadi. Qidiruv yoki janrni o'zgartiring.
      </p>
    );
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
