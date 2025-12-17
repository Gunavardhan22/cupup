import { useEffect, useState } from 'react';
import { supabase, Dessert } from '../lib/supabase';
import { useCart } from '../context/CartContext';
import FilterBar from './FilterBar';
import { Loader2, ArrowLeft, Star, Plus } from 'lucide-react';

interface DessertsMenuPageProps {
  onBack: () => void;
  onSelectProduct: (product: Dessert, type: string) => void;
}

export default function DessertsMenuPage({ onBack, onSelectProduct }: DessertsMenuPageProps) {
  const [desserts, setDesserts] = useState<Dessert[]>([]);
  const [filteredDesserts, setFilteredDesserts] = useState<Dessert[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchDesserts();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredDesserts(desserts);
    } else {
      setFilteredDesserts(desserts.filter(dessert => dessert.category === selectedCategory));
    }
  }, [selectedCategory, desserts]);

  async function fetchDesserts() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('desserts')
        .select('*')
        .order('popular', { ascending: false });

      if (error) throw error;

      if (data) {
        setDesserts(data);
        setFilteredDesserts(data);
        const uniqueCategories = Array.from(new Set(data.map(dessert => dessert.category)));
        setCategories(uniqueCategories);
      }
    } catch (error) {
      console.error('Error fetching desserts:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleAddToCart = (dessert: Dessert) => {
    addToCart(dessert as any);
  };

  const handleViewDetails = (dessert: Dessert) => {
    onSelectProduct(dessert, 'dessert');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-50">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-rose-700 hover:text-rose-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Back to Home</span>
        </button>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Desserts Menu</h1>
          <p className="text-lg text-gray-600">Delicious pastries, cakes, and baked goods</p>
        </div>

        <FilterBar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-rose-600 animate-spin" />
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedCategory === 'All' ? 'All Desserts' : selectedCategory}
              </h2>
              <p className="text-gray-600 mt-2">
                {filteredDesserts.length} {filteredDesserts.length === 1 ? 'dessert' : 'desserts'} available
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {filteredDesserts.map((dessert) => (
                <div key={dessert.id} className="group">
                  <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={dessert.image_url}
                        alt={dessert.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {dessert.popular && (
                        <div className="absolute top-4 right-4 bg-rose-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                          Popular
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-1">{dessert.name}</h3>
                          <span className="inline-block bg-rose-100 text-rose-800 text-xs px-3 py-1 rounded-full font-medium">
                            {dessert.category}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-rose-600">${dessert.price.toFixed(2)}</p>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{dessert.description}</p>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-1">
                          <Star className="w-5 h-5 fill-rose-400 text-rose-400" />
                          <span className="text-gray-700 font-semibold">{dessert.rating}</span>
                          <span className="text-gray-400 text-sm">/5</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleAddToCart(dessert)}
                        className="w-full bg-rose-600 hover:bg-rose-700 text-white px-5 py-2 rounded-full font-semibold flex items-center justify-center space-x-2 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 mb-3"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add</span>
                      </button>

                      <button
                        onClick={() => handleViewDetails(dessert)}
                        className="w-full bg-white hover:bg-rose-50 border-2 border-rose-600 text-rose-600 font-semibold py-2 rounded-lg transition-all duration-300"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredDesserts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-500 text-xl">No desserts found in this category</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
