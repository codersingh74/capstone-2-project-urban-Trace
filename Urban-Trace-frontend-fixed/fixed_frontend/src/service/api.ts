// FIX 8: Complete API service - backend se properly connect karta hai
const BASE_URL = "http://127.0.0.1:8000/api";

// ─── Issues ───────────────────────────────────────────────

/** Saare issues fetch karo (map ke liye) */
export const getIssues = async () => {
  const res = await fetch(`${BASE_URL}/issues/`);
  if (!res.ok) throw new Error(`Failed to fetch issues: ${res.status}`);
  return res.json();
};

/** Ek nayi issue report karo (FormData - image support ke saath) */
export const createIssue = async (formData: FormData) => {
  const res = await fetch(`${BASE_URL}/issues/`, {
    method: "POST",
    // Content-Type header mat lagao - browser khud set karta hai FormData ke saath
    body: formData,
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.detail || `Submission failed (${res.status})`);
  }

  return res.json();
};

/** Issue status update karo (authority ke liye) */
export const updateIssueStatus = async (issueId: number, status: string) => {
  const res = await fetch(`${BASE_URL}/issues/${issueId}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) throw new Error(`Update failed: ${res.status}`);
  return res.json();
};

/** Issue delete karo */
export const deleteIssue = async (issueId: number) => {
  const res = await fetch(`${BASE_URL}/issues/${issueId}/`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
};

// ─── Dashboard Stats ──────────────────────────────────────

export const getDashboardStats = async () => {
  const res = await fetch(`${BASE_URL}/stats/`);
  if (!res.ok) throw new Error(`Stats fetch failed: ${res.status}`);
  return res.json();
};
