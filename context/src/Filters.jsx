import { useMovies } from "./MovieContext";

export default function Filters() {
  const { query, setQuery, genres, activeGenre, setActiveGenre } =
    useMovies();

  return (
    <div className="filters">
      <input
        type="search"
        className="search-input"
        placeholder="Film nomini qidirish..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="genre-buttons">
        {genres.map((genre) => (
          <button
            key={genre}
            type="button"
            className={`genre-btn ${activeGenre === genre ? "active" : ""}`}
            onClick={() => setActiveGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
}
