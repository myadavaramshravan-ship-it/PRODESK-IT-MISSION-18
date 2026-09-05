function ExportButton({ products }) {
  const exportToCSV = () => {
    if (!products.length) {
      return;
    }

    const headers = [
      "Product Name",
      "SKU",
      "Category",
      "Price",
      "Cost",
      "Stock Quantity",
      "Reorder Level",
      "Last Updated"
    ];

    const rows = products.map((product) => [
      product.productName,
      product.sku,
      product.category,
      product.price,
      product.cost,
      product.stockQuantity,
      product.reorderLevel,
      new Date(
        product.lastUpdated
      ).toISOString()
    ]);

    const csvContent = [
      headers,
      ...rows
    ]
      .map((row) =>
        row
          .map((value) => {
            const stringValue = String(value ?? "");

            return `"${stringValue.replaceAll(
              '"',
              '""'
            )}"`;
          })
          .join(",")
      )
      .join("\n");

    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv;charset=utf-8;"
      }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "aura-inventory-export.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      onClick={exportToCSV}
      disabled={!products.length}
    >
      Export CSV
    </button>
  );
}

export default ExportButton;