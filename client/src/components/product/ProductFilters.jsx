import { useEffect, useState } from "react";
import useProductStore from "../../store/useProductStore";

const ProductFilters = () => {
  const { filters, setFilter, resetFilters, fetchProducts } = useProductStore();

  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  useEffect(() => {
    const handler = setTimeout(() => {
      const hasChanged = Object.keys(localFilters).some(
        (key) => localFilters[key] !== filters[key],
      );

      if (hasChanged) {
        setFilter(localFilters);
      }
    }, 600);

    return () => clearTimeout(handler);
  }, [localFilters, filters, setFilter]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-5">
      <input
        type="text"
        name="title"
        value={localFilters.title}
        onChange={handleChange}
        placeholder="Search by name..."
        className="input input-bordered"
      />
      <input
        type="text"
        name="category"
        value={localFilters.category}
        onChange={handleChange}
        placeholder="Category..."
        className="input input-bordered"
      />
      <input
        type="text"
        name="brand"
        value={localFilters.brand}
        onChange={handleChange}
        placeholder="Brand..."
        className="input input-bordered"
      />
      <input
        type="number"
        name="minPrice"
        value={localFilters.minPrice}
        onChange={handleChange}
        placeholder="Min Price..."
        className="input input-bordered"
      />
      <input
        type="number"
        name="maxPrice"
        value={localFilters.maxPrice}
        onChange={handleChange}
        placeholder="Max Price..."
        className="input input-bordered"
      />

      <div className="col-span-2 flex justify-end gap-3 md:col-span-5">
        <button
          onClick={() => fetchProducts(false)}
          className="btn btn-primary px-6"
        >
          Apply
        </button>
        <button onClick={resetFilters} className="btn btn-outline px-6">
          Reset
        </button>
      </div>
    </div>
  );
};

export default ProductFilters;
