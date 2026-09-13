import { MovieProvider } from "./MovieContext";
import Header from "./Header";
import Filters from "./Filters";
import MovieGrid from "./MovieGrid";
import MovieModal from "./MovieModal";
import "./App.css";

function App() {
  return (
    <MovieProvider>
      <Header />
      <main className="movie-app">
        <Filters />
        <MovieGrid />
      </main>
      <MovieModal />
    </MovieProvider>
  );
}

export default App;
