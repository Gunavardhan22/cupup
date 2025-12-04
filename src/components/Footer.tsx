import { Coffee, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Coffee className="w-8 h-8" />
              <span className="text-2xl font-bold">Capup</span>
            </div>
            <p className="text-amber-200">
              Have a cup of coffee. Quality in every cup.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-amber-200">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Menu</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Locations</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Hours</h3>
            <ul className="space-y-2 text-amber-200">
              <li>Monday - Friday: 7am - 8pm</li>
              <li>Saturday: 8am - 9pm</li>
              <li>Sunday: 8am - 7pm</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="bg-amber-700 hover:bg-amber-600 p-3 rounded-full transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-amber-700 hover:bg-amber-600 p-3 rounded-full transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-amber-700 hover:bg-amber-600 p-3 rounded-full transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-amber-700 mt-8 pt-8 text-center text-amber-200">
          <p>&copy; 2024 Capup. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
