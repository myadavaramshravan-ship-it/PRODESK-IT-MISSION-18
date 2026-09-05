import { useEffect, useState } from "react";

import {
  getAnalytics
} from "../services/inventoryService";

import KPICard from "../components/dashboard/KPICard";
import StockRiskChart from "../components/dashboard/StockRiskChart";
import CategoryValueChart from "../components/dashboard/CategoryValueChart";

function Dashboard({ reportRequested, onReportHandled }) {
  const [analytics, setAnalytics] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        setLoading(true);

        const response = await getAnalytics();

        setAnalytics(response.data);
      } catch (error) {
        console.error(
          "Failed to load analytics:",
          error
        );

        setError(
          "Unable to load dashboard analytics."
        );
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  useEffect(() => {
    if (!reportRequested || !analytics) {
      return;
    }

    const rows = [
      ["Metric", "Value"],
      ["Total SKUs", String(analytics.summary.totalSKUs)],
      ["Inventory Value", String(analytics.summary.totalInventoryValue)],
      ["Out of Stock Items", String(analytics.summary.outOfStockItems)],
      ["Restock Priority", JSON.stringify(analytics.restockPriority)],
      ["Category Distribution", JSON.stringify(analytics.categoryDistribution)]
    ];

    const csvContent = rows
      .map((row) =>
        row
          .map((value) => `"${String(value).replaceAll('"', '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "aura-engine-report.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    onReportHandled();
  }, [analytics, onReportHandled, reportRequested]);

  if (loading) {
    return (
      <main className="dashboard-page">
        <p>Loading analytics...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="dashboard-page">
        <p>{error}</p>
      </main>
    );
  }

  const {
    summary,
    restockPriority,
    categoryDistribution
  } = analytics;

  return (
    <main className="dashboard-page">
      <header className="dashboard-header page-hero">
        <div className="hero-copy">
          <p className="eyebrow">
            AURA ENGINE
          </p>

          <h1>Command Center</h1>

          <p>
            Enterprise inventory intelligence
            dashboard.
          </p>
        </div>

        <div className="hero-actions">
          <span className="status-pill success">
            Live sync
          </span>
          <button
            type="button"
            className="primary-button"
            id="export-report-button"
            onClick={() => {
              if (analytics) {
                const rows = [
                  ["Metric", "Value"],
                  ["Total SKUs", String(analytics.summary.totalSKUs)],
                  ["Inventory Value", String(analytics.summary.totalInventoryValue)],
                  ["Out of Stock Items", String(analytics.summary.outOfStockItems)],
                  ["Restock Priority", JSON.stringify(analytics.restockPriority)],
                  ["Category Distribution", JSON.stringify(analytics.categoryDistribution)]
                ];

                const csvContent = rows
                  .map((row) =>
                    row
                      .map((value) => `"${String(value).replaceAll('"', '""')}"`)
                      .join(",")
                  )
                  .join("\n");

                const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");

                link.href = url;
                link.download = "aura-engine-report.csv";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
              }
            }}
          >
            Export report
          </button>
        </div>
      </header>

      <section className="kpi-grid">
        <KPICard
          label="Total SKUs"
          value={summary.totalSKUs.toLocaleString()}
          description="Products currently tracked"
        />

        <KPICard
          label="Total Inventory Value"
          value={`$${summary.totalInventoryValue.toLocaleString(
            undefined,
            {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }
          )}`}
          description="Current stock valuation"
        />

        <KPICard
          label="Out of Stock Items"
          value={summary.outOfStockItems.toLocaleString()}
          description="Products requiring immediate attention"
        />
      </section>

      <section className="insight-row">
        <div className="insight-card wide">
          <div className="section-label">Operational pulse</div>
          <strong>Inventory health is stable with 3 high-priority restock alerts.</strong>
          <p>Demand remains aligned with forecast, and stock cover is above target across priority categories.</p>
        </div>

        <div className="insight-card">
          <div className="section-label">This week</div>
          <strong>+12.4%</strong>
          <p>revenue recovery from improved inventory positioning</p>
        </div>
      </section>

      <section className="chart-grid">
        <StockRiskChart
          data={restockPriority}
        />

        <CategoryValueChart
          data={categoryDistribution}
        />
      </section>
    </main>
  );
}

export default Dashboard;