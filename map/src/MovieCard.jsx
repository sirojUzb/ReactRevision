const GENRE_COLOR = {
  "Sci-Fi": "#3b82f6",
  Comedy: "#f59e0b",
  Drama: "#8b5cf6",
  Action: "#ef4444",
  Horror: "#111827",
  Romance: "#ec4899",
  Thriller: "#0f766e",
  Fantasy: "#16a34a",
  Documentary: "#6b7280",
  Animation: "#eab308",
};

export default function MovieCard({ movie, onToggleWatchlist }) {
  const genreColor = GENRE_COLOR[movie.genre] ?? "#64748b";

  return (
    <article className="movie-card">
      <div className="movie-poster">
        <img
          className="movie-poster-img"
          src={`https://picsum.photos/seed/movie-catalog-${movie.id}/400/600`}
          alt={`${movie.title} poster`}
          loading="lazy"
        />
        <span className="genre-badge" style={{ background: genreColor }}>
          {movie.genre}
        </span>
        <button
          type="button"
          className={`watchlist-btn ${movie.inWatchlist ? "active" : ""}`}
          onClick={() => onToggleWatchlist(movie.id)}
          aria-label={
            movie.inWatchlist
              ? "Watchlistdan olib tashlash"
              : "Watchlistga qo'shish"
          }
        >
          {movie.inWatchlist ? "★" : "☆"}
        </button>
      </div>

      <div className="movie-body">
        <div className="movie-top">
          <h3>{movie.title}</h3>
          <span className="movie-rating">⭐ {movie.rating}</span>
        </div>
        <p className="movie-meta">
          {movie.genre} · {movie.year} · {movie.director}
        </p>
        <p className="movie-desc">{movie.description}</p>
      </div>
    </article>
  );
}
