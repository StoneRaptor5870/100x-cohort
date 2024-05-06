import './App.css'
// import AutoRefreshingHook from './hooks/AutoRefreshingHook'
import DataFetchingHook from './hooks/DataFetchingHook'

function App() {

  return (
    <div className='todos'>
      <DataFetchingHook />
      {/* <AutoRefreshingHook /> */}
    </div>
  )
}

export default App
