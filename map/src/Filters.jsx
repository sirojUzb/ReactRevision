export default function Filters({
  query,
  onQueryChange,
  genres,
  genre,
  onGenreChange,
  sortBy,
  onSortChange,
  watchlistOnly,
  onWatchlistOnlyChange,
  watchlistCount,
}) {
  return (
    <div className="filters">
      <input
        type="search"
        className="search-input"
        placeholder="Film nomini qidirish..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />

      <div className="genre-buttons">
        {["All", ...genres].map((g) => (
          <button
            key={g}
            type="button"
            className={`genre-btn ${genre === g ? "active" : ""}`}
            onClick={() => onGenreChange(g)}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="filters-right">
        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="title">Nomi bo'yicha (A-Z)</option>
          <option value="rating">Reyting bo'yicha</option>
          <option value="year">Yil bo'yicha (yangi)</option>
        </select>

        <label className="watchlist-toggle">
          <input
            type="checkbox"
            checked={watchlistOnly}
            onChange={(e) => onWatchlistOnlyChange(e.target.checked)}
          />
          Faqat Watchlist ({watchlistCount})
        </label>
      </div>
    </div>
  );
}
