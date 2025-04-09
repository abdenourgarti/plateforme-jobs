import { useState } from "react";
import { navigationLinks } from "@/config/navigation";
import { Link } from "@inertiajs/react";
import { Menu, X } from "lucide-react";
import Logo from "../../../public/images/logos/canva.png"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md relative"> {/* Added relative positioning */}
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="flex items-center ml-4">
          <Link href="/">
            <img 
              src={Logo}
              alt="Logo" 
              className="h-10 w-auto"
            />
            {/* <span className="text-xl font-bold">Logo</span> */}
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          {navigationLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-red-500 font-medium"
            >
              {link.name}
            </Link>
          ))}
          <span className="w-1 h-5 bg-gray-300 rounded-2xl mx-4"></span>
          <Link
            href="/register"
            className="bg-red-500 text-white px-4 py-2 shadow hover:bg-red-600"
          >
            Sign Up
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden z-50" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden absolute w-full bg-white shadow-lg transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 top-full' : 'opacity-0 -top-full'}`}>
        <nav className="container mx-auto p-4">
          <ul className="flex flex-col items-center space-y-4">
            {navigationLinks.map((link) => (
              <li key={link.name} className="w-full text-center">
                <Link
                  href={link.href}
                  className="block py-2 text-gray-700 hover:text-red-500 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="w-full text-center">
              <Link
                href="/signup"
                className="inline-block bg-red-500 text-white px-6 py-2 shadow hover:bg-red-600 mt-2"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;