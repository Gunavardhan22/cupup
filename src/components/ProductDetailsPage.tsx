import { ArrowLeft, Star, Plus, Minus, ShoppingCart, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase, AddOn } from '../lib/supabase';
import { useCart } from '../context/CartContext';

interface ProductDetailsPageProps {
  product: any;
  productType: string;
  onBack: () => void;
}

export default function ProductDetailsPage({ product, productType, onBack }: ProductDetailsPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const [allAddOns, setAllAddOns] = useState<AddOn[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchAddOns();
  }, []);

  async function fetchAddOns() {
    try {
      const { data, error } = await supabase
        .from('add_ons')
        .select('*');

      if (error) throw error;
      if (data) {
        setAllAddOns(data);
      }
    } catch (error) {
      console.error('Error fetching add-ons:', error);
    }
  }

  const getBackgroundColor = () => {
    switch (productType) {
      case 'coffee':
        return 'from-amber-50 via-orange-50 to-amber-50';
      case 'matcha':
        return 'from-green-50 via-emerald-50 to-green-50';
      case 'dessert':
        return 'from-rose-50 via-pink-50 to-rose-50';
      default:
        return 'from-gray-50 via-gray-50 to-gray-50';
    }
  };

  const getAccentColor = () => {
    switch (productType) {
      case 'coffee':
        return 'amber';
      case 'matcha':
        return 'green';
      case 'dessert':
        return 'rose';
      default:
        return 'gray';
    }
  };

  const accentColor = getAccentColor();
  const accentClasses = {
    button: `bg-${accentColor}-600 hover:bg-${accentColor}-700`,
    text: `text-${accentColor}-600`,
    bg: `bg-${accentColor}-100`,
  };

  const totalPrice = (product.price * quantity) + selectedAddOns.reduce((sum, addon) => sum + addon.price, 0);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    onBack();
  };

  const toggleAddOn = (addon: AddOn) => {
    setSelectedAddOns(prev =>
      prev.some(a => a.id === addon.id)
        ? prev.filter(a => a.id !== addon.id)
        : [...prev, addon]
    );
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBackgroundColor()}`}>
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className={`flex items-center space-x-2 text-${accentColor}-700 hover:text-${accentColor}-900 mb-8 transition-colors`}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Back</span>
        </button>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-sm">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full rounded-3xl shadow-2xl"
              />
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`absolute top-6 right-6 p-4 rounded-full transition-all duration-300 ${
                  isFavorite
                    ? `bg-${accentColor}-500 text-white shadow-lg`
                    : 'bg-white text-gray-400 hover:text-gray-600 shadow-md'
                }`}
              >
                <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="mb-6">
              <span className={`inline-block ${accentClasses.bg} text-${accentColor}-800 text-sm px-4 py-2 rounded-full font-semibold mb-3`}>
                {product.category}
              </span>
              <h1 className="text-5xl font-bold text-gray-900 mb-4">{product.name}</h1>

              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? `fill-${accentColor}-400 text-${accentColor}-400`
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-semibold text-gray-700">{product.rating}/5</span>
                </div>
              </div>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">{product.description}</p>

              <div className="bg-white rounded-2xl p-8 mb-8 shadow-md">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Quantity</h3>
                <div className="flex items-center space-x-6">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className={`p-3 rounded-lg bg-${accentColor}-100 text-${accentColor}-600 hover:bg-${accentColor}-200 transition-colors`}
                  >
                    <Minus className="w-6 h-6" />
                  </button>
                  <span className="text-4xl font-bold text-gray-800 w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className={`p-3 rounded-lg bg-${accentColor}-100 text-${accentColor}-600 hover:bg-${accentColor}-200 transition-colors`}
                  >
                    <Plus className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-md">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Add-ons (Optional)</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto mb-6">
                  {allAddOns.map(addon => (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddOn(addon)}
                      className={`w-full p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                        selectedAddOns.some(a => a.id === addon.id)
                          ? `border-${accentColor}-500 bg-${accentColor}-50`
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-gray-800">{addon.name}</p>
                          <p className="text-sm text-gray-500">{addon.type}</p>
                        </div>
                        <p className="font-bold text-gray-700">+${addon.price.toFixed(2)}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-2xl">
          <div className="container mx-auto px-4 py-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Price</p>
              <p className="text-3xl font-bold text-gray-900">${totalPrice.toFixed(2)}</p>
            </div>
            <button
              onClick={handleAddToCart}
              className={`flex items-center space-x-3 ${accentClasses.button} text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`}
            >
              <ShoppingCart className="w-6 h-6" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
