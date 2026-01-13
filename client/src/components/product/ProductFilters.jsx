import useProductStore from "../../store/useProductStore";

const ProductFilters = () => {
  const { filters, setFilter, resetFilters, fetchProducts } = useProductStore();

  const handleChange = (e) => {
    setFilter(e.target.name, e.target.value);
  };
  return (
    <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-5">
      <input
        type="text"
        name="search"
        value={filters.search}
        onChange={handleChange}
        placeholder="Search..."
        className="input input-bordered"
      />
      <input
        type="text"
        name="category"
        value={filters.category}
        onChange={handleChange}
        placeholder="Category..."
        className="input input-bordered"
      />
      <input
        type="text"
        name="brand"
        value={filters.brand}
        onChange={handleChange}
        placeholder="Brand..."
        className="input input-bordered"
      />
      <input
        type="text"
        name="minPrice"
        value={filters.minPrice}
        onChange={handleChange}
        placeholder="Min Price..."
        className="input input-bordered"
      />
      <input
        type="text"
        name="maxPrice"
        value={filters.MaxPrice}
        onChange={handleChange}
        placeholder="Max Price..."
        className="input input-bordered"
      />

      <div className="col-span-2 flex justify-end gap-3 md:col-span-5">
        <button onClick={fetchProducts} className="btn btn-primary px-6">
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
