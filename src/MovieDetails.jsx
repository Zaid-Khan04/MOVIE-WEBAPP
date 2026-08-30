import React from 'react'
import { useParams } from 'react-router-dom';
import Spinner from './assets/Components/Spinner';
import useFetch from './hooks/useFetch';


const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const MovieDetails = () => {
  const { id } = useParams()
  const { data: movie, isLoading, errorMessage } = useFetch(`${API_BASE_URL}/movie/${id}`, API_OPTIONS)
  
  if (isLoading) return <><div className='bg-image'/><Spinner /></>
  if (errorMessage) return <><div className='bg-image'/><p className='text-red-500 text-center mt-10'>{errorMessage}</p></>
  if (!movie) return null


  return (
    <>
      <div className='bg-image'/>

      <div className='movie-details-container'>
        <img
          className='movie-details-poster'
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '/no_movie.png'}
          alt={movie.title}
        />

        <div className='movie-details-info'>
          <h1 className='movie-details-title'>{movie.title}</h1>

          {movie.tagline && <p className='movie-details-tagline'>{movie.tagline}</p>}

          <div className='movie-details-meta'>
            <div className='rating'>
              <img src='/star.png' alt='star-icon'/>
              <p>{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</p>
            </div>
            <span>•</span>
            <p>{movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</p>
            <span>•</span>
            <p>{movie.runtime ? `${movie.runtime} min` : 'N/A'}</p>
          </div>

          <div className='movie-details-genres'>
            {movie.genres.map((genre) => (
              <span key={genre.id} className='genre-badge'>{genre.name}</span>
            ))}
          </div>

          <p className='movie-details-overview'>{movie.overview}</p>
        </div>
      </div>
    </>
  )
}

export default MovieDetails