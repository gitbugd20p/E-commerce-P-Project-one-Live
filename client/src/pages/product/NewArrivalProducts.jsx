import React, { useEffect } from "react";
import useProductStore from "../../store/useProductStore";
import Loader from "../../components/common/Loader";
import ProductCard from "../../components/product/ProductCard";
import { Link } from "react-router-dom";

const NewArrivalProducts = () => {
  const { products, loading, fetchProducts } = useProductStore();
  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [fetchProducts, products.length]);

  return (
    <section className="container mx-auto p-4">
      <div>
        {products.slice(8, 16).length !== 0 && (
          <h1 className="mb-8 text-4xl font-medium">New Arrival Products</h1>
        )}

        {!loading && products.length === 0 && (
          <div className="mt-10 text-center text-gray-500">
            No products found matching your filters.
          </div>
        )}

        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {products.slice(8, 16).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <Link to="/products" className="btn btn-primary btn-outline px-10">
            View All Products
          </Link>
        </div>
      </div>
      <div className="divider mt-8"></div>
    </section>
  );
};

export default NewArrivalProducts;
