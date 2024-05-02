import { ImParagraphRight, ImProfile } from "react-icons/im";
import { IoIosColorPalette } from "react-icons/io";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full h-16 flex justify-between items-center p-3 border-b border-gray-500">
      <h1 className="font-bold">Assignment Solutions</h1>
      <nav className="flex gap-1">
        <NavLink
          className="p-2 rounded flex justify-center items-center"
          to="/profile-card"
        >
          <ImProfile />
        </NavLink>
        <NavLink
          className="p-2 rounded flex justify-center items-center"
          to="/color-changer"
        >
          <IoIosColorPalette />
        </NavLink>
        <NavLink
          className="p-2 rounded flex justify-center items-center"
          to="/anchor"
        >
          <ImParagraphRight />
        </NavLink>
        <NavLink
          className="p-2 rounded flex justify-center items-center"
          to="/paragraph-gen"
        >
          <ImParagraphRight />
        </NavLink>
        <NavLink
          className="p-2 rounded flex justify-center items-center"
          to="/github-profile"
        >
          <ImParagraphRight />
        </NavLink>
        <NavLink
          className="p-2 rounded flex justify-center items-center"
          to="/otp"
        >
          <ImParagraphRight />
        </NavLink>
        <NavLink
          className="p-2 rounded flex justify-center items-center"
          to="/birthday-card"
        >
          <ImParagraphRight />
        </NavLink>
      </nav>
    </header>
  );
}