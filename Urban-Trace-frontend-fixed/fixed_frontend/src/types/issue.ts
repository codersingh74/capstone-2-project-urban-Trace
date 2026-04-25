export type IssueCategory = "sanitation" | "road" | "electricity" | "water";

export type IssueStatus = "open" | "assigned" | "in_progress" | "resolved" | "pending";

// Backend Django model ke fields se match karta hai
export type Issue = {
  id: number;
  title: string;
  description: string;
  status: string;
  category: string;
  latitude: number;
  longitude: number;
  // IssueMap ke saath compatibility ke liye computed aliases
  lat?: number;
  lng?: number;
  locationLabel?: string;
  image?: string | null;
  created_at: string;
  created_by?: number | null;
  assigned_to?: number | null;
};
