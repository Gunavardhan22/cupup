interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function FilterBar({ categories, selectedCategory, onCategoryChange }: FilterBarProps) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 mb-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Filter by Category</h2>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => onCategoryChange('All')}
          className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
            selectedCategory === 'All'
              ? 'bg-amber-600 text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Coffees
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-amber-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
