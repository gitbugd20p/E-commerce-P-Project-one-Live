import { Link } from "react-router-dom";
import { useEffect } from "react";
import useCategoryStore from "../../store/useCategoryStore";

const Categories = () => {
  const { categories, loading, fetchAllCategory } = useCategoryStore();

  useEffect(() => {
    if (categories.length === 0) {
      fetchAllCategory();
    }
  }, [fetchAllCategory, categories.length]);

  if (loading) {
    return (
      <div className="container mx-auto animate-pulse px-4 py-12 text-center font-bold">
        LOADING CATEGORIES...
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="border-l-4 border-black pl-4 text-2xl font-black tracking-tighter uppercase">
          Browse Categories
        </h2>
        <Link
          to="/products"
          className="text-sm font-bold uppercase decoration-2 underline-offset-4 hover:underline"
        >
          View All Products
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-0 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((category, index) => (
          <Link
            key={index}
            to={`/category/${category}`}
            className="group relative flex aspect-[16/9] flex-col items-center justify-center border border-gray-200 bg-white p-6 transition-all duration-300 hover:bg-black hover:text-white"
          >
            <span className="text-center text-lg font-black tracking-widest uppercase italic transition-transform duration-300 group-hover:scale-110">
              {category}
            </span>

            <p className="mt-2 text-[10px] font-medium tracking-[0.2em] uppercase opacity-50 group-hover:opacity-100">
              Explore Collection
            </p>

            <div className="group-hover:bg-accent absolute bottom-0 left-0 h-1 w-0 bg-black transition-all duration-300 group-hover:w-full"></div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
