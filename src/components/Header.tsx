import { Coffee, ShoppingCart } from 'lucide-react';

interface HeaderProps {
  cartCount?: number;
}

export default function Header({ cartCount = 0 }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Coffee className="w-10 h-10" />
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Capup</h1>
              <p className="text-amber-200 text-sm">Have a Cup of Coffee</p>
            </div>
          </div>
          <button className="flex items-center space-x-2 bg-amber-700 hover:bg-amber-600 px-6 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg">
            <ShoppingCart className="w-5 h-5" />
            <span className="font-semibold">Cart ({cartCount})</span>
          </button>
        </div>
      </div>
    </header>
  );
}
