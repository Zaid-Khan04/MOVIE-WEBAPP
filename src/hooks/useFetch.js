import { useState, useEffect } from 'react'

const useFetch = (url, options) => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setErrorMessage('')
      try {
        const response = await fetch(url, options)
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const result = await response.json()
        setData(result)
      }
      catch (error) {
        console.log(error)
        setErrorMessage('Something went wrong.')
      }
      finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { data, isLoading, errorMessage }
}

export default useFetch