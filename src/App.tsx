import { useEffect, useState } from 'react';
import { supabase, Coffee } from './lib/supabase';
import { CartProvider, useCart } from './context/CartContext';
import Header from './components/Header';
import Hero from './components/Hero';
import FilterBar from './components/FilterBar';
import CoffeeCard from './components/CoffeeCard';
import Footer from './components/Footer';
import Checkout from './components/Checkout';
import { Loader2 } from 'lucide-react';

function AppContent() {
  const [coffees, setCoffees] = useState<Coffee[]>([]);
  const [filteredCoffees, setFilteredCoffees] = useState<Coffee[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);
  const { addToCart, getTotalItems } = useCart();

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

  if (showCheckout) {
    return <Checkout onBack={() => setShowCheckout(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50">
      <Header cartCount={getTotalItems()} onCartClick={() => setShowCheckout(true)} />
      <Hero />

      <main className="container mx-auto px-4 py-12">
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
              <h2 className="text-3xl font-bold text-gray-800">
                {selectedCategory === 'All' ? 'All Coffees' : selectedCategory}
              </h2>
              <p className="text-gray-600 mt-2">
                {filteredCoffees.length} {filteredCoffees.length === 1 ? 'coffee' : 'coffees'} available
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCoffees.map((coffee) => (
                <CoffeeCard
                  key={coffee.id}
                  coffee={coffee}
                  onAddToCart={addToCart}
                />
              ))}
            </div>

            {filteredCoffees.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-500 text-xl">No coffees found in this category</p>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
