import { useEffect, useMemo, useState } from "react";
import { Route as RouteIcon, Trash2, Zap, Droplets, Database } from "lucide-react";
import { mockIssues } from "../../data/mockIssues";
import { IssueMap } from "../../components/map/IssueMap";
import type { IssueCategory } from "../../types/issue";

const analyticsData = [
  { label: "Road",        value: "40%", count: 42, icon: <RouteIcon size={18} strokeWidth={2.5} />,  color: "#ef4444", bg: "#fee2e2" },
  { label: "Sanitation",  value: "30%", count: 31, icon: <Trash2 size={18} strokeWidth={2.5} />,  color: "#f97316", bg: "#fff7ed" },
  { label: "Electricity", value: "20%", count: 21, icon: <Zap size={18} strokeWidth={2.5} />,   color: "#eab308", bg: "#fefce8" },
  { label: "Water",       value: "10%", count: 11, icon: <Droplets size={18} strokeWidth={2.5} />,   color: "#3b82f6", bg: "#eff6ff" },
];

const categoryOptions: { value: "all" | IssueCategory; label: string }[] = [
  { value: "all",         label: "All Categories" },
  { value: "road",        label: "Road"            },
  { value: "sanitation",  label: "Sanitation"      },
  { value: "electricity", label: "Electricity"     },
  { value: "water",       label: "Water"           },
];

export function PublicView(): JSX.Element {
  const [categoryFilter, setCategoryFilter] = useState<"all" | IssueCategory>("all");

  const filteredIssues = useMemo(
    () => (categoryFilter === "all" ? mockIssues : mockIssues.filter((i) => i.category === categoryFilter)),
    [categoryFilter]
  );

  return (
    <div className="split-screen-layout">
      
      {/* LEFT: Full Bleed Map */}
      <div style={{ flex: 1, position: "relative", zIndex: 1, background: "var(--gray-900)" }}>
        <IssueMap
          title="Open Data Hub Map"
          subtitle=""
          issues={filteredIssues}
          fullBleed
        />
        
        {/* Floating Stat Block */}
        <div style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          zIndex: 1000,
          background: "var(--white)",
          border: "2px solid var(--green-900)",
          boxShadow: "4px 4px 0 var(--green-900)",
          padding: "1rem",
          display: "flex",
          gap: "1.5rem",
          maxWidth: "calc(100% - 40px)",
          flexWrap: "wrap"
        }}>
          <div>
            <span style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 800, color: "var(--gray-500)" }}>Data Points</span>
            <strong style={{ display: "block", fontSize: "1.2rem", fontWeight: 800 }}>{filteredIssues.length}</strong>
          </div>
          <div>
            <span style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 800, color: "var(--green-700)" }}>Feed Status</span>
            <strong style={{ display: "block", fontSize: "1.2rem", fontWeight: 800 }}>LIVE</strong>
          </div>
        </div>
      </div>

      {/* RIGHT: Scrollable Sidebar for Analytics */}
      <div style={{ 
        width: "min(100%, 480px)", 
        background: "var(--gray-50)", 
        borderLeft: "2px solid var(--green-900)", 
        display: "flex", 
        flexDirection: "column",
        position: "relative",
        zIndex: 10
      }}>
        
        {/* Sidebar Header */}
        <div style={{ 
          padding: "1.5rem", 
          borderBottom: "2px solid var(--green-900)",
          background: "var(--green-100)"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
            <h2 style={{ margin: 0, fontSize: "1.5rem", color: "var(--green-900)", letterSpacing: "-0.03em", fontWeight: 800 }}>Open Data Hub</h2>
            <Database size={24} color="var(--green-900)" />
          </div>
          <p style={{ margin: "0 0 1rem", fontSize: "0.85rem", color: "var(--green-800)", fontWeight: 600, lineHeight: 1.5 }}>
            Explore live civic data overlaying dynamic infrastructure feeds.
          </p>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as "all" | IssueCategory)}
            className="neo-select"
          >
            {categoryOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Scroll Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "2rem" }}>
          
          {/* Analytics Overview */}
          <div>
            <h3 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--gray-500)", marginBottom: "1rem" }}>
              Analytics Breakdown
            </h3>
            <div className="analytics-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {analyticsData.map((item) => (
                <div key={item.label} style={{
                  background: "var(--white)",
                  border: "2px solid var(--green-900)",
                  padding: "1rem",
                  boxShadow: "4px 4px 0 var(--green-900)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ width: 32, height: 32, background: item.bg, color: item.color, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%" }}>
                      {item.icon}
                    </div>
                    <span style={{ fontSize: "1.3rem", fontWeight: 800, color: "var(--green-900)" }}>{item.count}</span>
                  </div>
                  <div>
                    <strong style={{ display: "block", fontSize: "0.8rem", textTransform: "uppercase" }}>{item.label}</strong>
                    <span style={{ fontSize: "0.7rem", color: "var(--gray-500)", fontWeight: 600 }}>{item.value} of total</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Issue Stream */}
          <div>
            <h3 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--gray-500)", marginBottom: "1rem" }}>
              Live Report Stream
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {filteredIssues.slice(0, 10).map((issue) => (
                <div key={issue.id} style={{
                  background: "var(--white)",
                  border: "2px solid var(--green-900)",
                  padding: "1rem",
                  boxShadow: "3px 3px 0 var(--green-900)"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                    <strong style={{ fontSize: "0.95rem", color: "var(--green-900)" }}>{issue.title}</strong>
                    <span style={{ fontSize: "0.65rem", fontWeight: 800, padding: "0.15rem 0.5rem", background: "var(--green-100)", color: "var(--green-900)", border: "1px solid var(--green-900)", textTransform: "uppercase" }}>
                      {issue.category}
                    </span>
                  </div>
                  <p style={{ margin: "0 0 0.75rem", fontSize: "0.8rem", color: "var(--gray-600)", lineHeight: 1.5 }}>
                    {issue.description.slice(0, 80)}...
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.7rem", color: "var(--gray-500)", fontWeight: 600, borderTop: "1px dashed var(--gray-300)", paddingTop: "0.5rem" }}>
                    <span>{issue.locationLabel}</span>
                    <span style={{ textTransform: "uppercase" }}>{issue.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    
      {/* Mobile responsive styles */}
      <style>{`
        @media (max-width: 800px) {
          .analytics-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
