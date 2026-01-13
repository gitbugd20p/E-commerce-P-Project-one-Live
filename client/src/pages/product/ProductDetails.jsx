import { useEffect, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import useProductStore from "../../store/useProductStore";
import Loader from "../../components/common/Loader";
import {
  FaArrowLeft,
  FaShoppingCart,
  FaTruck,
  FaShieldAlt,
  FaStar,
  FaUndoAlt,
  FaBoxOpen,
  FaInfoCircle,
} from "react-icons/fa";
import useCartStore from "../../store/useCartStore";
import useCategoryStore from "../../store/useCategoryStore";
import ProductCard from "../../components/product/ProductCard";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading, fetchSingleProduct } = useProductStore();
  const { addToCart } = useCartStore();
  // Get category data
  const { categoryProducts, fetchProductByCategory } = useCategoryStore();

  useEffect(() => {
    fetchSingleProduct(id);
  }, [id, fetchSingleProduct]);

  useEffect(() => {
    if (product?.category) {
      fetchProductByCategory(product?.category);
    }
  }, [fetchProductByCategory, product?.category]);

  const similarProducts = useMemo(() => {
    return categoryProducts.filter((item) => item._id !== id).slice(0, 4);
  }, [categoryProducts, id]);

  if (loading) return <Loader />;

  if (!product) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-error text-2xl font-bold">Product not found</h2>
        <button onClick={() => navigate("/")} className="btn btn-ghost mt-4">
          Return to Shop
        </button>
      </div>
    );
  }

  // Calculate discounted price
  const hasDiscount = product.discountPercentage > 0;
  const sellingPrice = hasDiscount
    ? product.price * (1 - product.discountPercentage / 100)
    : product.price;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navigation */}
      <button
        onClick={() => navigate(-1)}
        className="btn btn-ghost btn-sm mb-6 gap-2"
      >
        <FaArrowLeft /> Back to Gallery
      </button>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* --- Image Section --- */}
        <div className="border-base-200 flex items-center justify-center overflow-hidden rounded-lg border bg-white p-6 shadow-sm">
          <img
            src={product.image || "/placeholder.png"}
            alt={product.title}
            className="max-h-[500px] w-full object-contain transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* --- Info Section --- */}
        <div className="flex flex-col">
          {/* Brand & Category */}
          <div className="mb-3 flex items-center gap-2">
            <span className="badge badge-primary badge-outline font-bold tracking-wider uppercase">
              {product.brand}
            </span>
            <span className="text-sm tracking-tighter text-gray-500 uppercase">
              {product.category}
            </span>
          </div>

          <h1 className="mb-2 text-3xl font-black text-gray-800 md:text-4xl">
            {product.title}
          </h1>

          {/* Rating & SKU */}
          <div className="mb-6 flex items-center gap-4">
            <div className="text-warning flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={
                    i < Math.floor(product.rating || 0)
                      ? "fill-current"
                      : "opacity-30"
                  }
                />
              ))}
              <span className="ml-2 font-bold text-gray-700">
                {product.rating || "0.0"}
              </span>
            </div>
            <div className="divider divider-horizontal mx-0"></div>
            <span className="font-mono text-xs text-gray-400 uppercase">
              SKU: {product.sku}
            </span>
          </div>

          {/* Pricing */}
          <div className="bg-base-100 border-primary/30 mb-6 rounded-xl border border-dashed p-4">
            <div className="flex items-baseline gap-3">
              <span className="text-primary text-4xl font-black">
                ${sellingPrice.toLocaleString()}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-xl text-gray-400 line-through">
                    ${product.price.toLocaleString()}
                  </span>
                  <span className="badge badge-success font-bold text-white">
                    SAVE {product.discountPercentage}%
                  </span>
                </>
              )}
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Tax included. Shipping calculated at checkout.
            </p>
          </div>

          {/* Inventory Status */}
          <div className="mb-6">
            {product.stock > 0 ? (
              <div className="text-success flex items-center gap-2 font-bold">
                <div className="bg-success h-2 w-2 animate-pulse rounded-full"></div>
                Only {product.stock} units left in stock!
              </div>
            ) : (
              <div className="badge badge-error gap-1 py-3 text-white">
                Out of Stock
              </div>
            )}
          </div>

          <p className="mb-8 text-lg leading-relaxed text-gray-600">
            {product.description}
          </p>

          {/* --- Technical Specs Grid --- */}
          <div className="bg-base-200/50 mb-8 grid grid-cols-2 gap-4 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <FaBoxOpen className="text-primary" />
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase">
                  Weight
                </p>
                <p className="text-sm font-semibold">
                  {product.weight || "N/A"} kg
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FaInfoCircle className="text-primary" />
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase">
                  Category
                </p>
                <p className="text-sm font-semibold">{product.category}</p>
              </div>
            </div>
          </div>

          {/* --- Action Buttons --- */}
          <div className="mb-10 flex flex-col gap-4 sm:flex-row">
            <button
              className="btn btn-primary btn-lg shadow-primary/20 flex-1 gap-3 shadow-lg"
              disabled={product.stock < 1}
              onClick={() =>
                addToCart({
                  _id: product._id,
                  title: product.title,
                  price: sellingPrice, // Ensure we add the discounted price
                  image: product.image,
                })
              }
            >
              <FaShoppingCart /> Add to Cart
            </button>
            <button
              className="btn btn-outline btn-lg flex-1"
              disabled={product.stock < 1}
            >
              Buy It Now
            </button>
          </div>

          {/* --- Policies Section --- */}
          <div className="grid grid-cols-1 gap-6 border-t pt-8 md:grid-cols-3">
            <div className="flex flex-col items-center gap-2 text-center">
              <FaTruck className="text-primary text-2xl" />
              <h4 className="text-sm font-bold">Shipping</h4>
              <p className="text-xs text-gray-500">
                {product.shippingInfo || "Fast Delivery Available"}
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 border-x px-4 text-center">
              <FaShieldAlt className="text-primary text-2xl" />
              <h4 className="text-sm font-bold">Warranty</h4>
              <p className="text-xs text-gray-500">
                {product.warrantyInfo || "Standard Warranty"}
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <FaUndoAlt className="text-primary text-2xl" />
              <h4 className="text-sm font-bold">Return Policy</h4>
              <p className="text-xs text-gray-500">
                {product.returnPolicy || "30 Days Return"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Similar Products Section --- */}
      {similarProducts.length > 0 && (
        <div className="mt-20">
          <div className="mb-8 flex items-center justify-between border-b-2 border-black pb-4">
            <h2 className="text-2xl font-black tracking-tighter uppercase">
              Similar Products
            </h2>
            <Link
              to={`/category/${product.category}`}
              className="hover:text-primary text-xs font-bold uppercase underline underline-offset-4"
            >
              View All {product.category}
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {similarProducts.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
