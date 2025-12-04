export default function Hero() {
  return (
    <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 py-16 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
          Crafted with <span className="text-amber-600">Passion</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Experience the finest selection of artisan coffees, expertly roasted and brewed to perfection
        </p>
        <div className="flex flex-wrap justify-center gap-8 text-center">
          <div className="bg-white rounded-xl p-6 shadow-md min-w-[160px]">
            <p className="text-4xl font-bold text-amber-600 mb-2">100+</p>
            <p className="text-gray-600 font-medium">Coffee Blends</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md min-w-[160px]">
            <p className="text-4xl font-bold text-amber-600 mb-2">4.8★</p>
            <p className="text-gray-600 font-medium">Average Rating</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md min-w-[160px]">
            <p className="text-4xl font-bold text-amber-600 mb-2">10K+</p>
            <p className="text-gray-600 font-medium">Happy Customers</p>
          </div>
        </div>
      </div>
    </div>
  );
}
