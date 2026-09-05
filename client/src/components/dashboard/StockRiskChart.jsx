import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function StockRiskChart({ data }) {
  const chartData = data.map((product) => ({
    name:
      product.productName.length > 18
        ? `${product.productName.substring(0, 18)}...`
        : product.productName,
    stock: product.stockQuantity
  }));

  return (
    <section className="chart-card">
      <div className="chart-header">
        <div>
          <p className="chart-eyebrow">
            RISK ASSESSMENT
          </p>

          <h2>Restock Priority</h2>

          <p>
            Products with the lowest available stock.
          </p>
        </div>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={360}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{
              top: 10,
              right: 30,
              left: 20,
              bottom: 10
            }}
          >
            <CartesianGrid stroke="rgba(148, 163, 184, 0.2)" strokeDasharray="3 3" vertical={false} />

            <XAxis
              type="number"
              allowDecimals={false}
              stroke="#94a3b8"
            />

            <YAxis
              type="category"
              dataKey="name"
              width={150}
              stroke="#94a3b8"
            />

            <Tooltip
              cursor={{ fill: "rgba(139, 92, 246, 0.08)" }}
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid rgba(148, 163, 184, 0.2)",
                borderRadius: "12px",
                color: "#e2e8f0"
              }}
            />

            <Bar
              dataKey="stock"
              name="Stock"
              fill="#8b5cf6"
              radius={[0, 8, 8, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default StockRiskChart;