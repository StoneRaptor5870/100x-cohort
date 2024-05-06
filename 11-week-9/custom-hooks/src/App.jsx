import './App.css'
// import AutoRefreshingHook from './hooks/AutoRefreshingHook'
import DataFetchingHook from './hooks/DataFetchingHook'
import UseIsOnlineHook from './hooks/UseIsOnlineHook'
import UseMousePointerHook from './hooks/UseMousePointerHook'

function App() {

  return (
    <div className='todos'>
      <DataFetchingHook />
      {/* <AutoRefreshingHook /> */}
      <UseIsOnlineHook />
      <UseMousePointerHook />
    </div>
  )
}

export default App
