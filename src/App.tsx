import './App.css'
import { useEffect, useState } from 'react'
function App() {
  const [data, setData] = useState<null | any[]>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const API_KEY =
    import.meta.env.VITE_STOPS || '18c11407b6bc46b9b30cb41f5c4d0dbb'

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       setLoading(true)
  //       try {
  //         const response =
  //           await fetch(`https://api.resrobot.se/v2.1/location.nearbystops?originCoordLat=57.708895&originCoordLong=11.973479&format=json&accessId=${API_KEY}
  // `)
  //         if (!response.ok) {
  //           throw new Error('Network response was not ok')
  //         }
  //         const result = await response.json()
  //         setData(result)
  //         console.log(data)
  //       } catch (error) {
  //         console.error('Failed to fetch data:', error)
  //       } finally {
  //         setLoading(false)
  //       }
  //     }

  //     fetchData()
  //   }, [])

  const [location, setLocation] = useState<{
    lat: number | null
    long: number | null
  }>({ lat: null, long: null })
  const [stops, setStops] = useState<any[]>([])
  const [selectedStop, setSelectedStop] = useState<string | null>(null)

  //entry point into api https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API#extensions_to_other_interfaces

  // Get user's current location (browser compatible )
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            long: position.coords.longitude,
          })
        },
        (error) => {
          console.error('Error fetching location:', error)
          setError('Unable to retrieve location.')
        }
      )
    } else {
      setError('Geolocation is not supported by your browser.')
    }
  }, [])

  const [search, setSearch] = useState<string>('')

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault() // Prevent the form from refreshing the page
    console.log(location.lat && location.long)
    if (location.lat && location.long) {
      const url = `https://api.resrobot.se/v2.1/location.nearbystops?search=${search}&originCoordLat=${location.lat}&originCoordLong=${location.long}&format=json&accessId=${API_KEY}`

      console.log('Constructed URL: ', url)

      // Optionally, make the API request here
      setLoading(true)
      try {
        const response = await fetch(url, {
          method: 'GET', // or 'POST' if you are sending data
          headers: {
            'Content-Type': 'application/json', // Adjust if needed
          },
        })
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const result = await response.json()
        setData(result)
        console.log(data)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setLoading(false)
      }
    } else {
      console.error('Location is not set properly.')
    }
  }

  if (!data)
    return (
      <>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor='search'>Search Stops</label>
          <input
            type='search'
            name='search'
            value={search} // controlled component approach
            onChange={(e) => setSearch(e.target.value)} // handle changes
          />

          <input
            type='text'
            name='originCoordLat'
            value={location.lat !== null ? location.lat : ''}
            hidden
            readOnly
          />
          <input
            hidden
            type='text'
            name='originCoordLong'
            value={location.long !== null ? location.long : ''}
            readOnly
          />
          <button type='submit'>Find Stops</button>
        </form>
      </>
    )

  return <p>{JSON.stringify(data)}</p>
}

export default App
