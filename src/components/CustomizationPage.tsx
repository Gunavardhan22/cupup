import { useEffect, useState } from 'react';
import { supabase, AddOn } from '../lib/supabase';
import { ArrowLeft, Loader2, Plus, Droplet, Wind, Star } from 'lucide-react';

interface CustomizationPageProps {
  onBack: () => void;
}

export default function CustomizationPage({ onBack }: CustomizationPageProps) {
  const [addOns, setAddOns] = useState<AddOn[]>([]);
  const [filteredAddOns, setFilteredAddOns] = useState<AddOn[]>([]);
  const [selectedType, setSelectedType] = useState('All');
  const [types, setTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  useEffect(() => {
    fetchAddOns();
  }, []);

  useEffect(() => {
    if (selectedType === 'All') {
      setFilteredAddOns(addOns);
    } else {
      setFilteredAddOns(addOns.filter(addon => addon.type === selectedType));
    }
  }, [selectedType, addOns]);

  async function fetchAddOns() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('add_ons')
        .select('*')
        .order('type', { ascending: true });

      if (error) throw error;

      if (data) {
        setAddOns(data);
        setFilteredAddOns(data);
        const uniqueTypes = Array.from(new Set(data.map(addon => addon.type)));
        setTypes(uniqueTypes);
      }
    } catch (error) {
      console.error('Error fetching add-ons:', error);
    } finally {
      setLoading(false);
    }
  }

  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns(prev =>
      prev.includes(addOnId)
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Syrup':
        return <Droplet className="w-6 h-6" />;
      case 'Topping':
        return <Star className="w-6 h-6" />;
      case 'Milk':
        return <Wind className="w-6 h-6" />;
      default:
        return <Plus className="w-6 h-6" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Syrup':
        return 'from-yellow-400 to-yellow-600';
      case 'Topping':
        return 'from-pink-400 to-pink-600';
      case 'Milk':
        return 'from-blue-400 to-blue-600';
      case 'Sweetener':
        return 'from-amber-400 to-amber-600';
      case 'Coffee':
        return 'from-amber-800 to-amber-900';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-purple-700 hover:text-purple-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Back to Home</span>
        </button>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Customize Your Drink</h1>
          <p className="text-lg text-gray-600">Add extra flavors, toppings, and preferences to make your drink unique</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
          </div>
        ) : (
          <>
            <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
              <button
                onClick={() => setSelectedType('All')}
                className={`px-6 py-3 rounded-full font-semibold whitespace-nowrap transition-all duration-300 ${
                  selectedType === 'All'
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border-2 border-purple-200 hover:border-purple-400'
                }`}
              >
                All Add-ons
              </button>
              {types.map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-6 py-3 rounded-full font-semibold whitespace-nowrap transition-all duration-300 ${
                    selectedType === type
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 border-2 border-purple-200 hover:border-purple-400'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredAddOns.map((addon) => (
                <div
                  key={addon.id}
                  onClick={() => toggleAddOn(addon.id)}
                  className={`rounded-2xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    selectedAddOns.includes(addon.id)
                      ? 'ring-4 ring-purple-500 shadow-xl'
                      : 'bg-white shadow-md hover:shadow-lg'
                  }`}
                >
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getTypeColor(addon.type)} flex items-center justify-center text-white mb-4`}>
                    {getTypeIcon(addon.type)}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{addon.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{addon.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="inline-block bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full font-medium">
                      {addon.type}
                    </span>
                    <p className="text-2xl font-bold text-purple-600">+${addon.price.toFixed(2)}</p>
                  </div>

                  {selectedAddOns.includes(addon.id) && (
                    <div className="mt-4 pt-4 border-t border-purple-200 flex items-center space-x-2 text-purple-600 font-semibold">
                      <Plus className="w-5 h-5" />
                      <span>Added to selection</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredAddOns.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-500 text-xl">No add-ons found in this category</p>
              </div>
            )}

            {selectedAddOns.length > 0 && (
              <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-purple-200 shadow-2xl">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Selected add-ons</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {selectedAddOns.length} item{selectedAddOns.length !== 1 ? 's' : ''} selected
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedAddOns([])}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
