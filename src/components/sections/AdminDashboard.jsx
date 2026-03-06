import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { COLORS, FONTS } from "../../constants";

// Initialize Supabase Client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

export default function AdminDashboard() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  const ADMIN_PASSWORD = "Archetech@0810";

  const fetchWaitlist = async () => {
    const { data, error } = await supabase
      .from("waitlist")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setEmails(data);
    setLoading(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      fetchWaitlist();
    } else {
      alert("Wrong key, explorer. ❌");
    }
  };

  if (!isAuthenticated) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000",
        }}
      >
        <form onSubmit={handleLogin} style={{ textAlign: "center" }}>
          <h1
            style={{
              color: "#fff",
              fontFamily: FONTS.display,
              marginBottom: "20px",
            }}
          >
            ZussGo Admin
          </h1>
          <input
            type="password"
            placeholder="Enter Admin Key"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "12px 20px",
              borderRadius: "8px",
              border: "none",
              outline: "none",
              width: "250px",
            }}
          />
        </form>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "40px 20px",
        background: "#0a0a0a", // Deep dark background
        minHeight: "100vh",
        fontFamily: FONTS.body,
        color: "#fff",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {/* Header Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "40px",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <h1
            style={{
              fontFamily: FONTS.display,
              fontSize: "2.5rem",
              margin: 0,
              color: "#fff",
            }}
          >
            Explorers List 🌍
          </h1>
          <div
            style={{
              background: "linear-gradient(135deg, #7B2FF7 0%, #F15A24 100%)",
              padding: "15px 30px",
              border_radius: "16px",
              color: "#fff",
              textAlign: "center",
              boxShadow: "0 10px 20px rgba(123, 47, 247, 0.3)",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "0.8rem",
                opacity: 0.9,
                fontWeight: "bold",
              }}
            >
              TOTAL SIGNUPS
            </p>
            <h2 style={{ margin: 0, fontSize: "2.5rem" }}>
              {emails.length + 411}
            </h2>
          </div>
        </div>

        {/* Table Section */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.03)", // Subtle glassmorphism
            borderRadius: "24px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            overflow: "hidden",
            backdropFilter: "blur(10px)",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
            }}
          >
            <thead style={{ background: "rgba(255, 255, 255, 0.05)" }}>
              <tr>
                <th
                  style={{
                    padding: "20px",
                    color: "#94a3b8",
                    fontSize: "0.9rem",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  # Rank
                </th>
                <th
                  style={{
                    padding: "20px",
                    color: "#94a3b8",
                    fontSize: "0.9rem",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  Email Address
                </th>
                <th
                  style={{
                    padding: "20px",
                    color: "#94a3b8",
                    fontSize: "0.9rem",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  Joined Date
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="3"
                    style={{
                      padding: "60px",
                      textAlign: "center",
                      color: "#64748b",
                    }}
                  >
                    Fetching explorers...
                  </td>
                </tr>
              ) : (
                emails.map((user, index) => (
                  <tr
                    key={user.id}
                    style={{
                      borderTop: "1px solid rgba(255, 255, 255, 0.05)",
                      transition: "background 0.3s",
                    }}
                  >
                    <td
                      style={{
                        padding: "20px",
                        fontWeight: "800",
                        color: "#7B2FF7",
                        fontSize: "1.1rem",
                      }}
                    >
                      #{emails.length - index + 411}
                    </td>
                    <td
                      style={{
                        padding: "20px",
                        color: "#e2e8f0",
                        fontSize: "1rem",
                      }}
                    >
                      {user.email}
                    </td>
                    <td style={{ padding: "20px", color: "#64748b" }}>
                      {new Date(user.created_at).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
