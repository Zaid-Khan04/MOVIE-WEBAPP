import React from 'react'
import { Link } from 'react-router-dom'
import { useFavorites } from '../../context/FavoritesContext'

const Moviecard = ({movie:{id,title,vote_average,original_language,poster_path,release_date}}) => {

  const { isFavorite, addFavorite, removeFavorite } = useFavorites()

  const handleFavoriteClick = (e) => {
    e.preventDefault() // stop the click from also triggering the Link navigation
    if (isFavorite(id)) {
      removeFavorite(id)
    } else {
      addFavorite({ id, title, poster_path, vote_average, original_language, release_date })
    }
  }

  return (
    <Link to={`/movie/${id}`}>
    <div className='movie-card'>
      <button onClick={handleFavoriteClick}> {isFavorite(id) ? '❤️' : '🤍'}</button>
      <img className='poster-image-all-movies' src={poster_path?`https://image.tmdb.org/t/p/w500/${poster_path}`:`./no_movie.png`} alt={title}/>
      <div className='movie-title'>
        <h2>{title}</h2>
      </div>
      <div className='movie-details'>
        <div className='rating'>
          <img src='./star.png' alt='star-icon'/>
          <p>{vote_average?`${vote_average.toFixed(1)}`:`N/A`}</p>
        </div>
        <span>•</span>
      <p>{original_language}</p>
      <span>•</span>
      <p>{release_date.split('-')[0]}</p>
      </div>
   </div>
    </Link>
  )
}

export default Moviecard
