import React from 'react'

const Search = ({searchTerm,setSearchTerm}) => {
  return (
    <>
    <div className='search-section'>
         <img src='./search_icon.png' alt='Search Icon'/>
         <input className='input-box' type='text' placeholder='Search through 1000+ movies...' value={searchTerm} onChange={(event)=>setSearchTerm(event.target.value)}/>
    </div>
    </>
  )
}

export default Search
