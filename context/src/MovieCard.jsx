import { useMovies } from "./MovieContext";

const GENRE_COLOR = {
  Fantastika: "#3b82f6",
  Komediya: "#f59e0b",
  Drama: "#8b5cf6",
  Jangari: "#ef4444",
  "Qo'rqinchli": "#111827",
  Sarguzasht: "#16a34a",
  Triller: "#0f766e",
  Jinoiy: "#0ea5e9",
  Romantik: "#ec4899",
  Hujjatli: "#6b7280",
  Animatsiya: "#eab308",
};

export default function MovieCard({ movie }) {
  const { favorites, toggleFavorite, openMovie } = useMovies();
  const isFavorite = favorites.includes(movie.id);
  const primaryGenre = movie.genres[0];

  return (
    <article className="movie-card">
      <div className="movie-poster">
        <img
          className="movie-poster-img"
          src={movie.poster}
          alt={`${movie.title} plakati`}
          loading="lazy"
        />
        <span
          className="genre-badge"
          style={{ background: GENRE_COLOR[primaryGenre] ?? "#64748b" }}
        >
          {primaryGenre}
        </span>
        <button
          type="button"
          className={`favorite-btn ${isFavorite ? "active" : ""}`}
          onClick={() => toggleFavorite(movie.id)}
          aria-label={
            isFavorite
              ? "Sevimlilardan olib tashlash"
              : "Sevimlilarga qo'shish"
          }
        >
          {isFavorite ? "★" : "☆"}
        </button>
      </div>

      <div className="movie-body">
        <div className="movie-top">
          <h3>{movie.title}</h3>
          <span className="movie-rating">⭐ {movie.rating}</span>
        </div>
        <p className="movie-meta">
          {movie.year} · {movie.director}
        </p>
        <button
          type="button"
          className="details-btn"
          onClick={() => openMovie(movie.id)}
        >
          Batafsil →
        </button>
      </div>
    </article>
  );
}
