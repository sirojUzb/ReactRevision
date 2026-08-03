import { useState } from "react";
import Menu from "./Menu";
import MovieCatalog from "./MovieCatalog";
import "./App.css";

function App() {
  const [view, setView] = useState("menu");

  return (
    <>
      <nav className="view-switcher">
        <button
          type="button"
          className={view === "menu" ? "active" : ""}
          onClick={() => setView("menu")}
        >
          🍕 Pizza Menu
        </button>
        <button 
          type="button"
          className={view === "movies" ? "active" : ""}
          onClick={() => setView("movies")}
        >
          🎬 Movie Catalog
        </button>
      </nav>

      {view === "menu" ? <Menu /> : <MovieCatalog />}
    </>
  );
}

export default App;
