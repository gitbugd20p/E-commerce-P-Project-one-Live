import { useEffect, useState } from "react";
import useProductStore from "./../../store/useProductStore";
import AdminProductForm from "./AdminProductForm";
import AdminProductEditForm from "./AdminProductEditForm";
import { toast } from "react-toastify";
import { deleteProductApi } from "../../api/product.api";
import { FaEdit, FaStar } from "react-icons/fa";
import { MdDeleteForever, MdOutlineInventory2 } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";

const AdminProducts = () => {
  const { products, fetchProducts, isLoading } = useProductStore();
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [fetchProducts, products.length]);

  const openEditModal = (product) => {
    setSelectedProduct(product);
    document.getElementById("edit_modal").showModal();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProductApi(id);
        toast.success("Product deleted successfully");
        fetchProducts();
      } catch (error) {
        toast.error("Failed to delete product");
        console.log("failed to delete: ", error);
      }
    }
  };

  return (
    <div className="container mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic">
            Inventory
          </h1>
          <p className="text-sm text-gray-500">
            Manage your product details, stock, and pricing
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="badge badge-info gap-2 py-3 font-medium">
            <MdOutlineInventory2 /> {products.length} Products
          </span>
          <button
            className="btn btn-primary btn-sm md:btn-md"
            onClick={() => document.getElementById("my_modal_5").showModal()}
          >
            <IoMdAddCircleOutline size={20} />
            Add Product
          </button>
        </div>
      </div>

      {/* Add Modal */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box w-11/12 max-w-5xl">
          <AdminProductForm
            onClose={() => document.getElementById("my_modal_5").close()}
          />
        </div>
      </dialog>

      {/* Edit Modal */}
      <dialog id="edit_modal" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          {selectedProduct && (
            <AdminProductEditForm
              product={selectedProduct}
              onClose={() => document.getElementById("edit_modal").close()}
            />
          )}
        </div>
      </dialog>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 animate-pulse font-medium text-gray-500">
            Synchronizing inventory...
          </p>
        </div>
      ) : products.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed bg-gray-50 py-20 text-center">
          <p className="text-lg text-gray-400">Your warehouse is empty.</p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-gray-200 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <table className="table-zebra table w-full">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="w-12 py-4 text-center">SL</th>
                <th className="py-4">Product Info</th>
                <th>Category & SKU</th>
                <th>Pricing</th>
                <th>Inventory</th>
                <th>Rating</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, index) => {
                const discountedPrice =
                  p.price * (1 - (p.discountPercentage || 0) / 100);

                return (
                  <tr key={p._id} className="hover">
                    {/* 0. SL Number */}
                    <td className="text-center font-mono text-xs text-gray-400">
                      {index + 1}
                    </td>
                    {/* 1. Product Info */}
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12 bg-gray-100">
                            <img
                              src={p.image || "https://via.placeholder.com/150"}
                              alt={p.title}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-gray-800">
                            {p.title}
                          </div>
                          <div className="text-xs text-gray-500 uppercase">
                            {p.brand}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* 2. Category & SKU */}
                    <td>
                      <div className="badge badge-ghost badge-sm mb-1">
                        {p.category}
                      </div>
                      <div className="font-mono text-[10px] text-gray-400">
                        SKU: {p.sku || "N/A"}
                      </div>
                    </td>

                    {/* 3. Pricing */}
                    <td>
                      <div className="font-bold text-gray-900">
                        ${discountedPrice.toLocaleString()}
                      </div>
                      {p.discountPercentage > 0 && (
                        <div className="flex items-center gap-1 text-[11px]">
                          <span className="text-gray-400 line-through">
                            ${p.price}
                          </span>
                          <span className="text-green-600">
                            -{p.discountPercentage}%
                          </span>
                        </div>
                      )}
                    </td>

                    {/* 4. Inventory */}
                    <td>
                      <div
                        className={`font-bold ${
                          p.stock < 5
                            ? "text-error"
                            : p.stock < 15
                              ? "text-warning"
                              : "text-success"
                        }`}
                      >
                        {p.stock}{" "}
                        <span className="text-[10px] font-normal text-gray-400 italic">
                          in stock
                        </span>
                      </div>
                      <div className="text-[10px] text-gray-400">
                        {p.weight ? `${p.weight}kg` : "No weight"}
                      </div>
                    </td>

                    {/* 5. Rating */}
                    <td>
                      <div className="flex items-center gap-1">
                        <FaStar className="text-warning" size={12} />
                        <span className="font-medium">{p.rating || "0.0"}</span>
                      </div>
                    </td>

                    {/* 6. Actions */}
                    <td className="text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEditModal(p)}
                          className="btn btn-ghost btn-xs text-blue-600 hover:bg-blue-50"
                        >
                          <FaEdit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(p._id)}
                          className="btn btn-ghost btn-xs text-error hover:bg-red-50"
                        >
                          <MdDeleteForever size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
