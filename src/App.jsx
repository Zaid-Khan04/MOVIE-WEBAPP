import './App.css'
import Home from './Home';
import { Routes, Route } from 'react-router-dom';
import MovieDetails from './MovieDetails'
import { FavoritesProvider } from './context/FavoritesContext';

const App = () => {
  return (
    <FavoritesProvider>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
    </Routes>
    </FavoritesProvider>
  )
}

export default App