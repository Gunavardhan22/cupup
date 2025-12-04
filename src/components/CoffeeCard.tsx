import { Star, Plus, TrendingUp } from 'lucide-react';
import { Coffee } from '../lib/supabase';

interface CoffeeCardProps {
  coffee: Coffee;
  onAddToCart: (coffee: Coffee) => void;
}

export default function CoffeeCard({ coffee, onAddToCart }: CoffeeCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group">
      <div className="relative h-56 overflow-hidden">
        <img
          src={coffee.image_url}
          alt={coffee.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {coffee.popular && (
          <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1 shadow-lg">
            <TrendingUp className="w-4 h-4" />
            <span>Popular</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">{coffee.name}</h3>
            <span className="inline-block bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full font-medium">
              {coffee.category}
            </span>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-amber-600">${coffee.price.toFixed(2)}</p>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{coffee.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            <span className="text-gray-700 font-semibold">{coffee.rating}</span>
            <span className="text-gray-400 text-sm">/5</span>
          </div>

          <button
            onClick={() => onAddToCart(coffee)}
            className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2 rounded-full font-semibold flex items-center space-x-2 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
