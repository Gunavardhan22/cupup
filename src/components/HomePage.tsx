import { Coffee, Leaf, Cake, Sparkles, ArrowRight } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Welcome to <span className="text-amber-700">Capup</span>
          </h1>
          <p className="text-xl text-gray-600 mb-2">Your favorite coffee, matcha & dessert destination</p>
          <p className="text-gray-500">Premium quality, handcrafted drinks</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <div
            onClick={() => onNavigate('coffee')}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group transform hover:-translate-y-1"
          >
            <div className="h-48 bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
              <Coffee className="w-20 h-20 text-white group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Coffee</h2>
              <p className="text-gray-600 text-sm mb-4">Espresso, cappuccino, latte and more</p>
              <div className="flex items-center justify-between">
                <span className="text-amber-600 font-semibold">12 Items</span>
                <ArrowRight className="w-5 h-5 text-amber-600 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </div>

          <div
            onClick={() => onNavigate('matcha')}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group transform hover:-translate-y-1"
          >
            <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
              <Leaf className="w-20 h-20 text-white group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Matcha</h2>
              <p className="text-gray-600 text-sm mb-4">Premium green tea drinks</p>
              <div className="flex items-center justify-between">
                <span className="text-green-600 font-semibold">6 Items</span>
                <ArrowRight className="w-5 h-5 text-green-600 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </div>

          <div
            onClick={() => onNavigate('desserts')}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group transform hover:-translate-y-1"
          >
            <div className="h-48 bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center">
              <Cake className="w-20 h-20 text-white group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Desserts</h2>
              <p className="text-gray-600 text-sm mb-4">Pastries, cakes & baked goods</p>
              <div className="flex items-center justify-between">
                <span className="text-rose-600 font-semibold">8 Items</span>
                <ArrowRight className="w-5 h-5 text-rose-600 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </div>

          <div
            onClick={() => onNavigate('customization')}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group transform hover:-translate-y-1"
          >
            <div className="h-48 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-20 h-20 text-white group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Customize</h2>
              <p className="text-gray-600 text-sm mb-4">Add-ons & custom options</p>
              <div className="flex items-center justify-between">
                <span className="text-purple-600 font-semibold">10 Add-ons</span>
                <ArrowRight className="w-5 h-5 text-purple-600 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-12 mb-16">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-amber-600 mb-2">38</div>
              <p className="text-gray-600">Premium Products</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-600 mb-2">10</div>
              <p className="text-gray-600">Custom Add-ons</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-600 mb-2">4.8</div>
              <p className="text-gray-600">Average Rating</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">Why Choose Capup?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coffee className="w-6 h-6 text-amber-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Premium Quality</h4>
              <p className="text-gray-600">Sourced from the finest suppliers worldwide</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-amber-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Fully Customizable</h4>
              <p className="text-gray-600">Build your perfect drink with add-ons</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="w-6 h-6 text-amber-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Fast Delivery</h4>
              <p className="text-gray-600">Quick checkout and same-day delivery</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
