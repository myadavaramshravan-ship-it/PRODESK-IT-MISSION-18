function InventoryTable({
  products,
  sort,
  onSort
}) {
  const getSortIndicator = (field) => {
    if (sort === field) {
      return " ↑";
    }

    if (sort === `-${field}`) {
      return " ↓";
    }

    return "";
  };

  return (
    <div className="table-wrapper">
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>SKU</th>
            <th>Category</th>

            <th>
              <button
                type="button"
                onClick={() => onSort("price")}
              >
                Price
                {getSortIndicator("price")}
              </button>
            </th>

            <th>
              <button
                type="button"
                onClick={() => onSort("cost")}
              >
                Cost
                {getSortIndicator("cost")}
              </button>
            </th>

            <th>
              <button
                type="button"
                onClick={() =>
                  onSort("stockQuantity")
                }
              >
                Stock
                {getSortIndicator("stockQuantity")}
              </button>
            </th>

            <th>Reorder Level</th>

            <th>
              <button
                type="button"
                onClick={() => onSort("lastUpdated")}
              >
                Updated
                {getSortIndicator("lastUpdated")}
              </button>
            </th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="8">
                No products found.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product._id}>
                <td>{product.productName}</td>

                <td>{product.sku}</td>

                <td>{product.category}</td>

                <td>
                  ${product.price.toFixed(2)}
                </td>

                <td>
                  ${product.cost.toFixed(2)}
                </td>

                <td>
                  {product.stockQuantity}
                </td>

                <td>
                  {product.reorderLevel}
                </td>

                <td>
                  {new Date(
                    product.lastUpdated
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryTable;