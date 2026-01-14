import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import useCategoryStore from "../../store/useCategoryStore";
import ProductCard from "../../components/product/ProductCard";
import Loader from "../../components/common/Loader";
import { ChartBarStacked, House, PackageSearch } from "lucide-react";

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const { categoryProducts, loading, fetchProductByCategory } =
    useCategoryStore();

  useEffect(() => {
    fetchProductByCategory(categoryName);
  }, [categoryName, fetchProductByCategory]);

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="breadcrumbs mb-6 text-sm">
        <ul>
          <li>
            <Link to="/">
              <House size={18} />
              Home
            </Link>
          </li>
          <li>
            <Link to="/categories">
              <ChartBarStacked size={18} />
              Categories
            </Link>
          </li>
          <li>
            <span className="inline-flex items-center gap-2 font-bold text-black uppercase italic">
              <PackageSearch size={16} />
              {categoryName}
            </span>
          </li>
        </ul>
      </div>
      {/* Header */}
      <div className="mb-10">
        <div className="flex flex-col justify-between border-b-4 border-black pb-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-5xl font-black tracking-tighter text-gray-900 uppercase">
              {categoryName}
            </h1>
            <p className="mt-2 font-medium tracking-wide text-gray-500">
              Showing all items in {categoryName} Collection
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="badge badge-lg rounded-none font-bold">
              {categoryProducts.length} PRODUCTS FOUND
            </span>
          </div>
        </div>
      </div>

      {/* Grid Display */}
      {categoryProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center border-2 border-dashed bg-gray-50 py-20">
          <p className="text-xl font-bold text-gray-400 uppercase">
            No products found in this category.
          </p>
          <Link to="/products" className="btn btn-primary mt-6 rounded-none">
            Browse All Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categoryProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;
