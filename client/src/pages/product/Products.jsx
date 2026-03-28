import { useEffect } from "react";
import useProductStore from "../../store/useProductStore";
import ProductFilters from "./../../components/product/ProductFilters";
import Loader from "../../components/common/Loader";
import ProductCard from "./../../components/product/ProductCard";

const Products = () => {
  const { products, loading, fetchProducts, hasMore, resetFilters } =
    useProductStore();

  useEffect(() => {
    fetchProducts(false);
  }, []);

  return (
    <>
      <section className="container mx-auto p-4">
        <h2 className="mb-3 font-medium uppercase">Products</h2>

        <ProductFilters />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {loading && <Loader />}

        {!loading && products.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-lg text-gray-500">
              No products match your current filters.
            </p>
            <button onClick={resetFilters} className="btn btn-outline px-6">
              Reset
            </button>
          </div>
        )}

        {/* Load More Button */}
        {hasMore && !loading && products.length > 0 && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => fetchProducts(true)}
              className="rounded bg-black px-6 py-2 text-white transition-colors hover:bg-gray-800"
            >
              Load More
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default Products;
