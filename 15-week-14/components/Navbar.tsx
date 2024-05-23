import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex justify-center my-20 gap-20">
      <Link className="border-2 border-gray-400 px-8 py-4 rounded-xl flex justify-center items-center" href="/">Home</Link>
      <Link className="border-2 border-gray-400 px-8 py-4 rounded-xl flex justify-center items-center" href="static-page">Server Page</Link>
      <Link className="border-2 border-gray-400 px-8 py-4 rounded-xl flex justify-center items-center" href="interactive-page">Client Page</Link>
    </div>
  )
}

export default Navbar