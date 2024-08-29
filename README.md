# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

# Pendlaren

##

- information not accessible at start

```tsx
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
```

```tsx
function App() {
  const [data, setData] = useState<null | any[]>()
    const [error, setError] = useState<string | null>(null)
```

- browser api

```tsx
const [location, setLocation] = useState<{
  lat: number | null
  long: number | null
}>({ lat: null, long: null }) //care input value
const [stops, setStops] = useState<any[]>([])
const [selectedStop, setSelectedStop] = useState<string | null>(null)

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
```

```tsx
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
        ...
      }...
    }
  }

```

```tsx
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
```
