function InventoryFilters({
  category,
  setCategory,
  maxStock,
  setMaxStock,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  categories
}) {
  return (
    <section className="filters">
      <div className="filter-group">
        <label htmlFor="category-filter">
          Category
        </label>

        <select
          id="category-filter"
          value={category}
          onChange={(event) =>
            setCategory(event.target.value)
          }
        >
          <option value="">All Categories</option>

          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="stock-filter">
          Maximum Stock:{" "}
          {maxStock === "" ? "Any" : maxStock}
        </label>

        <input
          id="stock-filter"
          type="range"
          min="0"
          max="100"
          value={maxStock === "" ? 100 : maxStock}
          onChange={(event) => {
            const value = Number(event.target.value);

            if (value === 100) {
              setMaxStock("");
            } else {
              setMaxStock(value);
            }
          }}
        />

        <small>
          Use the slider to find low-stock products.
        </small>
      </div>

      <div className="filter-group">
        <label htmlFor="min-price">
          Minimum Price
        </label>

        <input
          id="min-price"
          type="number"
          min="0"
          value={minPrice}
          onChange={(event) =>
            setMinPrice(event.target.value)
          }
          placeholder="Min"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="max-price">
          Maximum Price
        </label>

        <input
          id="max-price"
          type="number"
          min="0"
          value={maxPrice}
          onChange={(event) =>
            setMaxPrice(event.target.value)
          }
          placeholder="Max"
        />
      </div>

      <button
        type="button"
        onClick={() => {
          setCategory("");
          setMaxStock("");
          setMinPrice("");
          setMaxPrice("");
        }}
      >
        Clear Filters
      </button>
    </section>
  );
}

export default InventoryFilters;