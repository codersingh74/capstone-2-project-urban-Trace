import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BuildingIcon, ArrowLeft } from "lucide-react";

export function NGORegistration(): JSX.Element {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/ngos");
    }, 1000);
  };

  return (
    <div style={{ padding: "0 1rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <Link
          to="/ngos"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "var(--green-900)",
            textDecoration: "none",
            fontWeight: 800,
            fontSize: "0.95rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em"
          }}
        >
          <ArrowLeft size={18} /> Back to NGOs
        </Link>
      </div>

      <div
        className="form-container"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.5fr",
          background: "var(--white)",
          borderRadius: 0,
          border: "2px solid var(--green-900)",
          boxShadow: "8px 8px 0 var(--green-900)",
        }}
      >
        {/* Left visually rich area */}
        <div
          style={{
            background: "var(--green-900)",
            padding: "3rem",
            color: "var(--white)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRight: "2px solid var(--green-900)"
          }}
        >
          <div>
            <div
              style={{
                width: 60,
                height: 60,
                background: "var(--green-500)",
                border: "2px solid var(--white)",
                boxShadow: "4px 4px 0 var(--white)",
                borderRadius: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "2rem",
              }}
            >
              <BuildingIcon size={32} color="var(--green-900)" />
            </div>
            <h2
              style={{
                fontSize: "2.2rem",
                lineHeight: 1.1,
                marginBottom: "1rem",
                fontFamily: '"Space Grotesk", sans-serif',
                letterSpacing: "-0.02em",
                color: "var(--white)",
                textTransform: "uppercase"
              }}
            >
              Join the Network
            </h2>
            <p style={{ fontSize: "1rem", color: "var(--white)", lineHeight: 1.6, fontWeight: 500 }}>
              Register your organisation to officially partner with local authorities, access real-time civic data, and streamline community-led resolution of urban issues.
            </p>
          </div>

          <div
            style={{
              background: "var(--white)",
              padding: "1.5rem",
              borderRadius: 0,
              border: "2px solid var(--white)",
              color: "var(--green-900)",
              marginTop: "2rem"
            }}
          >
            <strong style={{ display: "block", marginBottom: "0.5rem", fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Why Register?
            </strong>
            <ul style={{ margin: 0, paddingLeft: "1.2rem", fontSize: "0.95rem", lineHeight: 1.6, fontWeight: 700 }}>
              <li>Access verified civic reports</li>
              <li>Collaborate closely with authorities</li>
              <li>Visible profile to 50k+ citizens</li>
            </ul>
          </div>
        </div>

        {/* Right Form area */}
        <div style={{ padding: "3rem", display: "flex", flexDirection: "column", justifyContent: "center", background: "var(--gray-50)" }}>
          <h3 style={{ fontSize: "1.5rem", marginBottom: "2rem", color: "var(--green-900)", borderBottom: "4px solid var(--green-900)", display: "inline-block", alignSelf: "flex-start", paddingBottom: "0.5rem" }}>
            Organisation Details
          </h3>
          <form style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }} onSubmit={handleSubmit}>
            <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.85rem", fontWeight: 800, color: "var(--green-900)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Organisation Name
              <input
                required
                type="text"
                placeholder="e.g. Green City Trust"
                style={{
                  padding: "0.85rem 1rem",
                  border: "2px solid var(--green-900)",
                  borderRadius: 0,
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  outline: "none",
                  color: "var(--green-900)",
                  background: "var(--white)",
                }}
              />
            </label>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <label style={{ flex: 1, minWidth: "150px", display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.85rem", fontWeight: 800, color: "var(--green-900)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Govt Reg ID
                <input
                  required
                  type="text"
                  placeholder="Registration Number"
                  style={{
                    padding: "0.85rem 1rem",
                    border: "2px solid var(--green-900)",
                    borderRadius: 0,
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    outline: "none",
                    color: "var(--green-900)",
                    background: "var(--white)",
                  }}
                />
              </label>

              <label style={{ flex: 1, minWidth: "150px", display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.85rem", fontWeight: 800, color: "var(--green-900)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Focus Area
                <select
                  required
                  style={{
                    padding: "0.85rem 1rem",
                    border: "2px solid var(--green-900)",
                    borderRadius: 0,
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    outline: "none",
                    color: "var(--green-900)",
                    background: "var(--white)",
                    cursor: "pointer",
                    appearance: "none"
                  }}
                >
                  <option value="civic">Civic Rights</option>
                  <option value="environment">Environment</option>
                  <option value="infrastructure">Infrastructure</option>
                  <option value="welfare">Welfare</option>
                </select>
              </label>
            </div>

            <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.85rem", fontWeight: 800, color: "var(--green-900)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Contact Email
              <input
                required
                type="email"
                placeholder="contact@organisation.org"
                style={{
                  padding: "0.85rem 1rem",
                  border: "2px solid var(--green-900)",
                  borderRadius: 0,
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  outline: "none",
                  color: "var(--green-900)",
                  background: "var(--white)",
                }}
              />
            </label>

            <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.85rem", fontWeight: 800, color: "var(--green-900)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Brief Description
              <textarea
                required
                rows={3}
                placeholder="What does your organisation do?"
                style={{
                  padding: "0.85rem 1rem",
                  border: "2px solid var(--green-900)",
                  borderRadius: 0,
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  outline: "none",
                  resize: "vertical",
                  color: "var(--green-900)",
                  background: "var(--white)",
                }}
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: "0.5rem",
                background: "var(--green-500)",
                color: "var(--green-900)",
                border: "2px solid var(--green-900)",
                borderRadius: 0,
                padding: "1rem",
                fontSize: "1rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                fontWeight: 800,
                cursor: loading ? "wait" : "pointer",
                boxShadow: "4px 4px 0 var(--green-900)",
                transition: "transform 100ms ease, box-shadow 100ms ease",
                opacity: loading ? 0.8 : 1
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = "translate(-2px, -2px)";
                  e.currentTarget.style.boxShadow = "6px 6px 0 var(--green-900)";
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = "translate(0, 0)";
                  e.currentTarget.style.boxShadow = "4px 4px 0 var(--green-900)";
                }
              }}
            >
              {loading ? "Submitting..." : "Submit Registration →"}
            </button>
          </form>
        </div>
      </div>
      
      {/* Mobile responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          .form-container {
            grid-template-columns: 1fr !important;
          }
          .form-container > div:first-child {
            border-right: none !important;
            border-bottom: 2px solid var(--green-900) !important;
          }
        }
      `}</style>
    </div>
  );
}
