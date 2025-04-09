import { Link } from "@inertiajs/react";
import Logo from "../../../public/images/logos/canva.png"

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-8 sm:px-12 lg:px-16">
      {/* Barre grise en haut du footer */}
      <div className="container mx-auto mb-8">
        <div className="w-full h-[2px] bg-gray-600"></div>
      </div>
      
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Logo Column - 30% du footer */}
        <div className="md:col-span-4 flex flex-col p-4">
          <div className="border border-white w-64 h-32 mb-6 flex items-center justify-center">
          <img src={Logo} alt="logo" className="w-full h-full" />
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-4">Newsletter</h3>
            <div className="flex flex-row">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-2 bg-white text-gray-800"
              />
              <button className="bg-red-600 text-white py-2 px-4">
                Subscribe
              </button>
            </div>
          </div>
          <p className="text-sm mt-2">
            Be aware of the latest job news,<br />
            articles, sent to your inbox weekly.
          </p>
        </div>

        {/* Services Column */}
        <div className="md:col-span-2 p-4">
          <h3 className="text-lg font-medium mb-4">Services</h3>
          <ul className="space-y-2">
            <li><Link href="#" className="hover:text-gray-300">Companies</Link></li>
            <li><Link href="#" className="hover:text-gray-300">CVTech</Link></li>
            <li><Link href="#" className="hover:text-gray-300">Freelance</Link></li>
            <li><Link href="#" className="hover:text-gray-300">Coaching</Link></li>
            <li><Link href="#" className="hover:text-gray-300">Pricing</Link></li>
          </ul>
        </div>

        {/* About/Contact Column */}
        <div className="md:col-span-3 p-4">
          <h3 className="text-lg font-medium mb-4">Compliance</h3>
          <ul className="space-y-2">
            <li><Link href="#" className="hover:text-gray-300">About us</Link></li>
            <li><Link href="#" className="hover:text-gray-300">Contact Us</Link></li>
            <li><Link href="#" className="hover:text-gray-300">Terms</Link></li>
            <li><Link href="#" className="hover:text-gray-300">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-gray-300">FAQ</Link></li>
          </ul>
        </div>

        {/* Social Media Column */}
        <div className="md:col-span-3 p-4">
          <h3 className="text-lg font-medium mb-4">Social Media</h3>
          <ul className="space-y-2">
            <li><Link href="#" className="hover:text-gray-300">LinkedIn</Link></li>
            <li><Link href="#" className="hover:text-gray-300">Facebook</Link></li>
            <li><Link href="#" className="hover:text-gray-300">Instagram</Link></li>
            <li><Link href="#" className="hover:text-gray-300">Twitter</Link></li>
            <li><Link href="#" className="hover:text-gray-300">Telegram</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;