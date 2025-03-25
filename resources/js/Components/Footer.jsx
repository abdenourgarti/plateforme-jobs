import { navigationLinks } from "@/config/navigation";
import { footerServices, footerCompliance, footerSocialMedia } from "../config/footerLinks";
import { Link } from "@inertiajs/react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-4 sm:px-6 lg:px-8">
      {/* Divider line */}
      <div className="container mx-auto mb-8">
        <div className="w-full h-px bg-gray-300/20"></div>
      </div>

      {/* Main content grid */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 lg:gap-20">
        {/* First column */}
        <div className="flex items-center text-center md:text-left">
          <h2 className="text-lg font-light mb-4 md:mb-0">
            The #1 Job Board for IT specialists in Switzerland
          </h2>
        </div>

        {/* Services */}
        <div className="text-center md:text-left">
          <h3 className="font-bold mb-3">Services</h3>
          <ul className="space-y-2">
            {footerServices.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="text-gray-300 hover:text-red-500 font-light">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Compliance */}
        <div className="text-center md:text-left">
          <h3 className="font-bold mb-3">Compliance</h3>
          <ul className="space-y-2">
            {footerCompliance.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="text-gray-300 hover:text-red-500 font-light">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div className="text-center md:text-left">
          <h3 className="font-bold mb-3">Social Media</h3>
          <ul className="space-y-2">
            {footerSocialMedia.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="text-gray-300 hover:text-red-500 font-light">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Newsletter section */}
      <div className="container mx-auto md:mt-20">
        <div className="max-w-2xl mx-auto">
          <label className="block text-center">
            <span className="text-lg font-light">Newsletter</span>
            <div className="mt-4 flex flex-col md:flex-row gap-4">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-3 rounded-lg md:rounded-l md:rounded-r-none bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button className="w-full md:w-auto bg-red-500 px-6 py-3 rounded-lg md:rounded-r text-white hover:bg-red-600 transition-colors">
                Subscribe
              </button>
            </div>
          </label>
          <p className="mt-4 text-center font-light text-sm text-gray-400">
            Be aware of the latest job news, articles, sent to your inbox weekly.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;