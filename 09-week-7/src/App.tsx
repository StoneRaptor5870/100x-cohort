// import { RecoilRoot } from "recoil";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import ColorChanger from "./pages/ColorChanger";
import ProfileCard from "./pages/ProfileCard";

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile-card" element={<ProfileCard />} />
        <Route path="/color-changer" element={<ColorChanger />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
