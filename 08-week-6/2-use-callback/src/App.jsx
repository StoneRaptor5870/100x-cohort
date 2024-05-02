import Assignment1 from "./components/Assignment1"
import Assignment1_useRef from "./components/Assignment1_useRef"
import Assignment2_useRef from "./components/Assignment2_useRef"
import Assignment2 from "./components/Assignment2"

function App() {

  return (
    <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: "200px", padding: "100px", margin: "250px"}}>
      <Assignment1 />
      <Assignment2 />
      <Assignment1_useRef />
      <Assignment2_useRef />
    </div>
  )
}

export default App
