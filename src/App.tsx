import './App.css'
import { useEffect, useState } from 'react'
function App() {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const API_KEY =
    import.meta.env.VITE_STOPS || '18c11407b6bc46b9b30cb41f5c4d0dbb'

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response =
          await fetch(`https://api.resrobot.se/v2.1/location.nearbystops?originCoordLat=57.708895&originCoordLong=11.973479&format=json&accessId=${API_KEY}
`)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const result = await response.json()
        setData(result)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])
  return (
    <>
      <input
        type='search'
        label='search stops'
        name='search'
        defaultValue={search}
      />
    </>
  )
}

export default App
