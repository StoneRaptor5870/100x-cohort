import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import { Suspense } from "react";
import { Toaster } from "sonner";

function App() {

  return (
    <>
      <Toaster position="bottom-right" />
      <Header />
      <Suspense fallback={<>Loading...</>}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
