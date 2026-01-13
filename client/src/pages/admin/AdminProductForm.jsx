import { useState } from "react";
import { createProductApi } from "../../api/product.api";
import useProductStore from "../../store/useProductStore";

const initialState = {
  title: "",
  description: "",
  price: "",
  discountPercentage: 0,
  rating: 0,
  stock: "",
  brand: "",
  category: "",
  sku: "",
  weight: "",
  warrantyInfo: "",
  shippingInfo: "",
  returnPolicy: "",
  image: "",
};

const AdminProductForm = ({ onClose }) => {
  const { fetchProducts } = useProductStore();
  const [form, setForm] = useState(initialState);

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

      await createProductApi(submissionData);
      await fetchProducts();
      setForm(initialState);
      onClose();
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
    >
      <h2 className="text-xl font-bold md:col-span-2 lg:col-span-3">
        Add New Product
      </h2>

      {/* --- General Information --- */}
      <div className="border-b pb-1 font-semibold md:col-span-2 lg:col-span-3">
        General Info
      </div>

      <input
        name="title"
        placeholder="Product Title (e.g. Samsung Galaxy S24 Ultra)"
        value={form.title}
        onChange={handleChange}
        className="input input-bordered w-full md:col-span-2"
        required
      />

      <input
        name="sku"
        placeholder="SKU (e.g. SAM-S24U-512B)"
        value={form.sku}
        onChange={handleChange}
        className="input input-bordered w-full"
        required
      />

      <input
        name="brand"
        placeholder="Brand (e.g. Samsung)"
        value={form.brand}
        onChange={handleChange}
        className="input input-bordered w-full"
      />

      <input
        name="category"
        placeholder="Category (e.g. Smartphones)"
        value={form.category}
        onChange={handleChange}
        className="input input-bordered w-full"
      />

      <input
        name="image"
        placeholder="Image URL"
        value={form.image}
        onChange={handleChange}
        className="input input-bordered w-full"
      />

      {/* --- Pricing & Inventory --- */}
      <div className="mt-2 border-b pb-1 font-semibold md:col-span-2 lg:col-span-3">
        Pricing & Inventory
      </div>

      <input
        name="price"
        placeholder="Price"
        type="number"
        value={form.price}
        onChange={handleChange}
        className="input input-bordered w-full"
        required
      />

      <input
        name="discountPercentage"
        placeholder="Discount %"
        type="number"
        value={form.discountPercentage}
        onChange={handleChange}
        className="input input-bordered w-full"
      />

      <input
        name="stock"
        placeholder="Stock Quantity"
        type="number"
        value={form.stock}
        onChange={handleChange}
        className="input input-bordered w-full"
        required
      />

      <input
        name="rating"
        placeholder="Initial Rating (0-5)"
        type="number"
        step="0.1"
        value={form.rating}
        onChange={handleChange}
        className="input input-bordered w-full"
      />

      <input
        name="weight"
        placeholder="Weight (e.g. 0.23kg)"
        value={form.weight}
        onChange={handleChange}
        className="input input-bordered w-full"
      />

      {/* --- Policies & Shipping --- */}
      <div className="mt-2 border-b pb-1 font-semibold md:col-span-2 lg:col-span-3">
        Policies & Shipping
      </div>

      <input
        name="warrantyInfo"
        placeholder="Warranty Info"
        value={form.warrantyInfo}
        onChange={handleChange}
        className="input input-bordered w-full"
      />

      <input
        name="shippingInfo"
        placeholder="Shipping Info"
        value={form.shippingInfo}
        onChange={handleChange}
        className="input input-bordered w-full"
      />

      <input
        name="returnPolicy"
        placeholder="Return Policy"
        value={form.returnPolicy}
        onChange={handleChange}
        className="input input-bordered w-full"
      />

      {/* Description */}
      <textarea
        name="description"
        placeholder="Product Description"
        value={form.description}
        onChange={handleChange}
        className="textarea textarea-bordered h-36 w-full md:col-span-2 lg:col-span-3"
      />

      {/* Action Buttons */}
      <div className="mt-4 flex gap-3 md:col-span-2 lg:col-span-3">
        <button type="button" className="btn flex-1" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary flex-1">
          Save Product
        </button>
      </div>
    </form>
  );
};

export default AdminProductForm;
