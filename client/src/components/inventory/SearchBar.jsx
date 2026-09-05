function SearchBar({ value, onChange }) {
  return (
    <div className="search-container">
      <label htmlFor="inventory-search">
        Search inventory
      </label>

      <input
        id="inventory-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search products..."
      />
    </div>
  );
}

export default SearchBar;