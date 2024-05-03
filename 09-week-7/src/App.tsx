import { RecoilRoot } from "recoil";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import ColorChanger from "./pages/ColorChanger";
import ProfileCard from "./pages/ProfileCard";
import ParaGenerator from "./pages/ParaGenerator";
import GithubProfile from "./pages/githubProfile/GithubProfile";
import OtpLogin from "./pages/otp/OtpLogin";
import BirthdayWish from "./pages/birthday/BirthdayWish";

function App() {

  return (
    <RecoilRoot>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile-card" element={<ProfileCard />} />
          <Route path="/color-changer" element={<ColorChanger />} />
          <Route path="/paragraph-gen" element={<ParaGenerator />} />
          <Route path="/github-profile" element={<GithubProfile />} />
          <Route path="/otp" element={<OtpLogin />} />
          <Route path="/birthday-card" element={<BirthdayWish />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App
