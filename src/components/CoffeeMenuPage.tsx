import { useEffect, useState } from 'react';
import { supabase, Coffee } from '../lib/supabase';
import { useCart } from '../context/CartContext';
import FilterBar from './FilterBar';
import CoffeeCard from './CoffeeCard';
import { Loader2, ArrowLeft } from 'lucide-react';

interface CoffeeMenuPageProps {
  onBack: () => void;
  onSelectProduct: (product: Coffee, type: string) => void;
}

export default function CoffeeMenuPage({ onBack, onSelectProduct }: CoffeeMenuPageProps) {
  const [coffees, setCoffees] = useState<Coffee[]>([]);
  const [filteredCoffees, setFilteredCoffees] = useState<Coffee[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchCoffees();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredCoffees(coffees);
    } else {
      setFilteredCoffees(coffees.filter(coffee => coffee.category === selectedCategory));
    }
  }, [selectedCategory, coffees]);

  async function fetchCoffees() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('coffees')
        .select('*')
        .order('popular', { ascending: false });

      if (error) throw error;

      if (data) {
        setCoffees(data);
        setFilteredCoffees(data);
        const uniqueCategories = Array.from(new Set(data.map(coffee => coffee.category)));
        setCategories(uniqueCategories);
      }
    } catch (error) {
      console.error('Error fetching coffees:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleAddToCart = (coffee: Coffee) => {
    addToCart(coffee);
  };

  const handleViewDetails = (coffee: Coffee) => {
    onSelectProduct(coffee, 'coffee');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-amber-700 hover:text-amber-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Back to Home</span>
        </button>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Coffee Menu</h1>
          <p className="text-lg text-gray-600">Explore our premium selection of coffees, from classic espresso to specialty blends</p>
        </div>

        <FilterBar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-amber-600 animate-spin" />
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedCategory === 'All' ? 'All Coffees' : selectedCategory}
              </h2>
              <p className="text-gray-600 mt-2">
                {filteredCoffees.length} {filteredCoffees.length === 1 ? 'coffee' : 'coffees'} available
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {filteredCoffees.map((coffee) => (
                <div key={coffee.id} className="group">
                  <CoffeeCard
                    coffee={coffee}
                    onAddToCart={handleAddToCart}
                  />
                  <button
                    onClick={() => handleViewDetails(coffee)}
                    className="w-full mt-3 bg-white hover:bg-amber-50 border-2 border-amber-600 text-amber-600 font-semibold py-2 rounded-lg transition-all duration-300"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>

            {filteredCoffees.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-500 text-xl">No coffees found in this category</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
