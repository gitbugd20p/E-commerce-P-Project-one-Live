import { useState, useEffect } from "react";
import { updateProductApi } from "../../api/product.api";
import useProductStore from "../../store/useProductStore";
import { toast } from "react-toastify";

const AdminProductEditForm = ({ product, onClose }) => {
  const { fetchProducts } = useProductStore();
  const [form, setForm] = useState(product);

  useEffect(() => {
    setForm(product);
  }, [product]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submissionData = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        discountPercentage: Number(form.discountPercentage),
        rating: Number(form.rating),
      };

      await updateProductApi(product._id, submissionData);
      await fetchProducts();
      toast.success("Product updated successfully!");
      onClose();
    } catch (error) {
      toast.error("Update failed");
      console.error("Update failed: ", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
    >
      <h2 className="text-xl font-bold md:col-span-2 lg:col-span-3">
        Edit Product: <span className="text-primary">{product.title}</span>
      </h2>

      {/* --- General Information --- */}
      <div className="border-b pb-1 font-semibold md:col-span-2 lg:col-span-3">
        General Info
      </div>

      <div className="flex flex-col gap-1 md:col-span-2">
        <label className="px-1 text-xs font-bold">Product Title</label>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="px-1 text-xs font-bold">SKU</label>
        <input
          name="sku"
          placeholder="SKU"
          value={form.sku}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="px-1 text-xs font-bold">Brand</label>
        <input
          name="brand"
          placeholder="Brand"
          value={form.brand}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="px-1 text-xs font-bold">Category</label>
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="px-1 text-xs font-bold">Image URL</label>
        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
      </div>

      {/* --- Pricing & Inventory --- */}
      <div className="mt-2 border-b pb-1 font-semibold md:col-span-2 lg:col-span-3">
        Pricing & Inventory
      </div>

      <div className="flex flex-col gap-1">
        <label className="px-1 text-xs font-bold">Price</label>
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="px-1 text-xs font-bold">Discount %</label>
        <input
          name="discountPercentage"
          type="number"
          value={form.discountPercentage}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="px-1 text-xs font-bold">Stock</label>
        <input
          name="stock"
          type="number"
          value={form.stock}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="px-1 text-xs font-bold">Rating</label>
        <input
          name="rating"
          type="number"
          step="0.1"
          value={form.rating}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="px-1 text-xs font-bold">Weight</label>
        <input
          name="weight"
          placeholder="Weight"
          value={form.weight}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
      </div>

      {/* --- Policies & Shipping --- */}
      <div className="mt-2 border-b pb-1 font-semibold md:col-span-2 lg:col-span-3">
        Policies & Shipping
      </div>

      <div className="flex flex-col gap-1">
        <label className="px-1 text-xs font-bold">Warranty</label>
        <input
          name="warrantyInfo"
          value={form.warrantyInfo}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="px-1 text-xs font-bold">Shipping</label>
        <input
          name="shippingInfo"
          value={form.shippingInfo}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="px-1 text-xs font-bold">Return Policy</label>
        <input
          name="returnPolicy"
          value={form.returnPolicy}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1 md:col-span-2 lg:col-span-3">
        <label className="px-1 text-xs font-bold">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="textarea textarea-bordered h-36 w-full"
        />
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex gap-3 md:col-span-2 lg:col-span-3">
        <button type="button" className="btn flex-1" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary flex-1">
          Update Product
        </button>
      </div>
    </form>
  );
};

export default AdminProductEditForm;
