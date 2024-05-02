import Assignment1 from "./components/Assignment1"
import Assignment1_useRef from "./components/Assignment1_useRef"
import Assignment2 from "./components/Assignment2"

function App() {

  return (
    <div style={{display: "flex", justifyContent: "space-around", padding: "25px"}}>
      <Assignment1 />
      <Assignment2 />
      <Assignment1_useRef />
    </div>
  )
}

export default App
