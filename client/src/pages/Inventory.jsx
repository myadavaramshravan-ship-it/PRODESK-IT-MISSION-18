import { useEffect, useState } from "react";

import SearchBar from "../components/inventory/SearchBar";
import InventoryFilters from "../components/inventory/InventoryFilters";
import InventoryTable from "../components/inventory/InventoryTable";
import Pagination from "../components/inventory/Pagination";
import ExportButton from "../components/inventory/ExportButton";

import {
  getInventory
} from "../services/inventoryService";

import useDebounce from "../hooks/useDebounce";

const categories = [
  "Electronics",
  "Apparel",
  "Home & Kitchen",
  "Sports",
  "Office",
  "Beauty",
  "Grocery",
  "Toys",
  "Automotive",
  "Accessories"
];

function Inventory() {
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("");

  const [maxStock, setMaxStock] = useState("");

  const [minPrice, setMinPrice] = useState("");

  const [maxPrice, setMaxPrice] = useState("");

  const [sort, setSort] = useState("-lastUpdated");

  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({
    totalRecords: 0,
    totalPages: 0,
    currentPage: 1,
    hasNextPage: false
  });

  const [loading, setLoading] = useState(false);

  const debouncedSearch = useDebounce(
    search,
    500
  );

  useEffect(() => {
    const loadInventory = async () => {
      try {
        setLoading(true);

        const params = {
          page,
          limit: 50,
          search: debouncedSearch,
          category,
          maxStock,
          minPrice,
          maxPrice,
          sort
        };

        const response = await getInventory(params);

        setProducts(response.data);

        setPagination(response.pagination);
      } catch (error) {
        console.error(
          "Failed to load inventory:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadInventory();
  }, [
    page,
    debouncedSearch,
    category,
    maxStock,
    minPrice,
    maxPrice,
    sort
  ]);

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    setPage(1);
  };

  const handleMaxStockChange = (value) => {
    setMaxStock(value);
    setPage(1);
  };

  const handleMinPriceChange = (value) => {
    setMinPrice(value);
    setPage(1);
  };

  const handleMaxPriceChange = (value) => {
    setMaxPrice(value);
    setPage(1);
  };

  const handleSort = (field) => {
    if (sort === field) {
      setSort(`-${field}`);
    } else if (sort === `-${field}`) {
      setSort(field);
    } else {
      setSort(`-${field}`);
    }

    setPage(1);
  };

  return (
    <main className="inventory-page">
      <header className="page-header page-hero">
        <div className="hero-copy">
          <p className="eyebrow">
            AURA ENGINE
          </p>

          <h1>Inventory</h1>

          <p>
            Manage and monitor enterprise inventory.
          </p>
        </div>

        <div className="hero-actions">
          <span className="status-pill neutral">
            {loading ? "Refreshing" : "Synced"}
          </span>
          <ExportButton products={products} />
        </div>
      </header>

      <section className="stat-grid">
        <div className="stat-card">
          <span className="section-label">Visible stock</span>
          <strong>{products.length}</strong>
          <small>records in view</small>
        </div>

        <div className="stat-card">
          <span className="section-label">Total records</span>
          <strong>{pagination.totalRecords.toLocaleString()}</strong>
          <small>items in database</small>
        </div>

        <div className="stat-card">
          <span className="section-label">Page</span>
          <strong>{pagination.currentPage}</strong>
          <small>of {pagination.totalPages || 1}</small>
        </div>
      </section>

      <SearchBar
        value={search}
        onChange={handleSearch}
      />

      <InventoryFilters
        category={category}
        setCategory={handleCategoryChange}
        maxStock={maxStock}
        setMaxStock={handleMaxStockChange}
        minPrice={minPrice}
        setMinPrice={handleMinPriceChange}
        maxPrice={maxPrice}
        setMaxPrice={handleMaxPriceChange}
        categories={categories}
      />

      <div className="inventory-summary">
        {loading ? (
          <span>Loading...</span>
        ) : (
          <span>
            {products.length} records displayed
            {" • "}
            {pagination.totalRecords.toLocaleString()}
            {" total records"}
          </span>
        )}
      </div>

      <InventoryTable
        products={products}
        sort={sort}
        onSort={handleSort}
      />

      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        hasNextPage={pagination.hasNextPage}
        onPrevious={() =>
          setPage((current) => current - 1)
        }
        onNext={() =>
          setPage((current) => current + 1)
        }
      />
    </main>
  );
}

export default Inventory;