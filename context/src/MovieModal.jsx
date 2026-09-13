import { useMovies } from "./MovieContext";

export default function MovieModal() {
  const { selectedMovie, closeMovie, favorites, toggleFavorite } =
    useMovies();

  if (!selectedMovie) {
    return null;
  }

  const isFavorite = favorites.includes(selectedMovie.id);

  return (
    <div className="modal-overlay" onClick={closeMovie}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close"
          onClick={closeMovie}
          aria-label="Yopish"
        >
          ✕
        </button>

        <img
          className="modal-poster"
          src={selectedMovie.poster}
          alt={`${selectedMovie.title} plakati`}
        />

        <div className="modal-info">
          <div className="modal-genres">
            {selectedMovie.genres.map((genre) => (
              <span key={genre} className="genre-chip">
                {genre}
              </span>
            ))}
          </div>

          <h2>
            {selectedMovie.title}{" "}
            <span className="modal-year">({selectedMovie.year})</span>
          </h2>

          <p className="modal-rating">
            ⭐ {selectedMovie.rating} / 10 · {selectedMovie.duration} daqiqa ·{" "}
            {selectedMovie.country}
          </p>

          <p className="modal-desc">{selectedMovie.description}</p>

          <dl className="modal-meta">
            <div>
              <dt>Rejissyor</dt>
              <dd>{selectedMovie.director}</dd>
            </div>
            <div>
              <dt>Aktyorlar</dt>
              <dd>{selectedMovie.actors.join(", ")}</dd>
            </div>
          </dl>

          <button
            type="button"
            className={`favorite-btn-large ${isFavorite ? "active" : ""}`}
            onClick={() => toggleFavorite(selectedMovie.id)}
          >
            {isFavorite ? "★ Sevimlilarda" : "☆ Sevimlilarga qo'shish"}
          </button>
        </div>
      </div>
    </div>
  );
}
