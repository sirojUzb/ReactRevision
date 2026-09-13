import { useMovies } from "./MovieContext";

export default function Header() {
  const { totalCount, favorites } = useMovies();

  return (
    <header className="site-header">
      <h1>🎬 CinemaHub</h1>
      <p>
        {totalCount} ta film · useContext orqali filtr va sevimlilar
        boshqariladi
      </p>
      <span className="favorites-badge">★ Sevimlilar: {favorites.length}</span>
    </header>
  );
}
