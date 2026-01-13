import { Link } from "react-router-dom";
import { Star, ShoppingCart } from "lucide-react";
import useCartStore from "../../store/useCartStore"; // Adjust path as needed
import placeHolder from "/placeholder.png";

const ProductCard = ({ product }) => {
  const { addToCart } = useCartStore();

  // Discounted price
  const discount = product.discountPercentage || 20;
  const discountedPrice = (product.price * (1 - discount / 100)).toFixed(2);

  return (
    <div className="group border border-slate-200 bg-white hover:shadow-xl">
      {/* Image Section */}
      <Link
        to={`/products/${product._id}`}
        className="block overflow-hidden border-b border-slate-200"
      >
        <img
          src={
            product.image && product.image !== "" ? product.image : placeHolder
          }
          alt={product.title}
          className="h-64 w-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
        />
      </Link>

      {/* Content Section */}
      <div className="space-y-2 p-4">
        {/* Brand */}
        <p className="text-xs font-bold tracking-widest text-indigo-600 uppercase">
          {product.brand}
        </p>

        {/* Title */}
        <Link
          to={`/products/${product._id}`}
          className="line-clamp-1 block text-lg font-semibold text-slate-900 transition-colors hover:text-indigo-600"
        >
          {product.title}
        </Link>

        {/* Price Section */}
        <div className="flex items-end gap-2">
          <span className="text-xl font-bold text-blue-600">
            ${discountedPrice}
          </span>
          <span className="text-sm text-slate-400 line-through">
            ${product.price}
          </span>
          <span className="text-xs font-medium text-red-500">-{discount}%</span>
        </div>

        {/* Rating & Cart Section */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1">
            <div className="flex text-orange-400">
              {/* Simple 5-star display */}
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  fill={
                    i < Math.floor(product.rating || 4)
                      ? "currentColor"
                      : "none"
                  }
                />
              ))}
            </div>
            <span className="text-xs text-slate-500">
              ({product.rating || "4.5"})
            </span>
          </div>

          {/* Add to Cart Icon Button */}
          <button
            disabled={product.stock < 1}
            onClick={() =>
              addToCart({
                _id: product._id,
                title: product.title,
                price: product.price,
                image: product.image,
              })
            }
            className="cursor-pointer bg-slate-900 p-2 text-white transition-colors hover:bg-indigo-600 disabled:bg-slate-300"
            title="Add to Cart"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
