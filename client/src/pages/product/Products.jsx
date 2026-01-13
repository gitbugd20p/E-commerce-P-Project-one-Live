import { useEffect } from "react";
import useProductStore from "../../store/useProductStore";
import ProductFilters from "./../../components/product/ProductFilters";
import Loader from "../../components/common/Loader";
import ProductCard from "./../../components/product/ProductCard";

const Products = () => {
  const { products, loading, fetchProducts } = useProductStore();

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [fetchProducts, products.length]);

  return (
    <>
      <section className="container mx-auto p-4">
        <h2 className="mb-3 font-medium uppercase">Products</h2>

        <ProductFilters />

        {!loading && products.length === 0 && (
          <div className="mt-10 text-center text-gray-500">
            No products found matching your filters.
          </div>
        )}

        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Products;
