import "./App.css";

// Components
import Navbar from "./components/Navbar/Navbar.js";
import MoviesList from "./components/MoviesList/MoviesList";
import Footer from "./components/Footer/Footer.js";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <MoviesList />
      <Footer />
    </div>
  );
};

export default App;
