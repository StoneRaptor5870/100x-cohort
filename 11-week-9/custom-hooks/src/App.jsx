import './App.css'
import AutoRefreshingHook from './hooks/AutoRefreshingHook'
import DataFetchingHook from './hooks/DataFetchingHook'
import SearchBarUseDebounceHook from './hooks/SearchBarUseDebunceHook'
import UseIntervalHook from './hooks/UseIntervalHook'
import UseIsOnlineHook from './hooks/UseIsOnlineHook'
import UseMousePointerHook from './hooks/UseMousePointerHook'

function App() {

  return (
    <div className='todos'>
      <div><DataFetchingHook /></div>
      <div><AutoRefreshingHook /></div>
      <div><UseIsOnlineHook /></div>
      <div><UseMousePointerHook /></div>
      <div><UseIntervalHook /></div>
      <div><SearchBarUseDebounceHook /></div>
    </div>
  )
}

export default App
