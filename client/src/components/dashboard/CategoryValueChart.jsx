import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const PIE_COLORS = [
  "#8b5cf6",
  "#22c55e",
  "#38bdf8",
  "#fbbf24",
  "#f97316",
  "#ec4899",
  "#14b8a6",
  "#a3e635"
];

function CategoryValueChart({ data }) {
  const chartData = data.map((item) => ({
    name: item.category,
    value: item.totalValue
  }));

  return (
    <section className="chart-card">
      <div className="chart-header">
        <div>
          <p className="chart-eyebrow">
            PORTFOLIO DISTRIBUTION
          </p>

          <h2>Inventory Valuation</h2>

          <p>
            Total inventory value grouped by category.
          </p>
        </div>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={360}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              innerRadius={60}
              label
              paddingAngle={3}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`${entry.name}-${index}`}
                  fill={PIE_COLORS[index % PIE_COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid rgba(148, 163, 184, 0.2)",
                borderRadius: "12px",
                color: "#e2e8f0"
              }}
            />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default CategoryValueChart;