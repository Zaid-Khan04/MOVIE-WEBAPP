import React, { useState, useEffect } from 'react'
import Search from './assets/Components/Search';
import Spinner from './assets/Components/Spinner';
import Moviecard from './assets/Components/Moviecard';
import { useDebounce } from 'react-use';
import { getTrendingMovies, updateSearchCount } from './appwrite';
import { useFavorites } from './context/FavoritesContext';
import useFetch from './hooks/useFetch';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY} `
  }
}

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [trendingMovies, setTrendingMovies] = useState([])
  const { favorites } = useFavorites()

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 1000, [searchTerm])

  const endpoint = debouncedSearchTerm
    ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(debouncedSearchTerm)}`
    : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const { data, isLoading, errorMessage } = useFetch(endpoint, API_OPTIONS)
  const moviesList = data?.results || []

  useEffect(() => {
    if (debouncedSearchTerm && moviesList.length > 0) {
      updateSearchCount(debouncedSearchTerm, moviesList[0])
    }
  }, [data])

  const loadTrendingMovies = async () => {
    try {
      const result = await getTrendingMovies()
      setTrendingMovies(result)
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadTrendingMovies()
  }, [])

  return (
    <>
      <div className='bg-image'/>

      <section className='header'>
        <img src='/hero_poster.png' alt='hero-poster'/>
        <h1 className='heading'>Find Movies Without Hassle</h1>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      </section>

      <section className='trending-section'>
        <h1 className='mb-1 ml-4 text-white text-2xl'>Trending-Movies</h1>
        <ul className="trending">
          {trendingMovies.map((movie, index) => (
            <li key={movie.$id}>
              <p className='rank-no'>{index + 1}</p>
              <img style={{ height: '17rem' }} className='poster-image-trending' src={`https://image.tmdb.org/t/p/w500/${movie.poster_url}`} alt="movie-poster" />
            </li>
          ))}
        </ul>
      </section>

      <section className='all-movies'>
        <h1 className='mb-1 ml-4 text-white text-2xl'>All-Movies</h1>
        <h1 className='mb-1 ml-4 text-white text-2xl'>You have {favorites.length} Favourite movies</h1>

        {isLoading ? (<Spinner/>) :
          errorMessage ? (<p className='text-red-500'>{errorMessage}</p>) :
          (
            <ul className='all-movies-ul'>
              {moviesList.map((movie) => (
                <Moviecard movie={movie} key={movie.id}/>
              ))}
            </ul>
          )}
      </section>
    </>
  )
}

export default Home