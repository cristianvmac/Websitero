// The canonical "brief" — everything the guided wizard collects.
// This is the contract the fulfillment pipeline reads (Stage 1: the team,
// Stage 2: the automated build worker), so keep it stable and additive.

export interface Brief {
  business: {
    name: string;
    type: string;
    location: string;
  };
  /** Feature keys from FEATURES the owner picked. */
  features: string[];
  style: {
    brandColor: string;
    vibe: string;
  };
  /** Plain-English description, same spirit as the Hero's typed prompt. */
  prompt: string;
  contact: {
    email: string;
    phone: string;
  };
}

export const EMPTY_BRIEF: Brief = {
  business: { name: "", type: "", location: "" },
  features: [],
  style: { brandColor: "#4588ba", vibe: "" },
  prompt: "",
  contact: { email: "", phone: "" },
};

// Beachhead vertical is home services / trades, so those lead the list —
// but the brand stays horizontal, hence bakery/salon/etc. too.
export const BUSINESS_TYPES = [
  "Plumbing",
  "HVAC",
  "Electrician",
  "Roofing",
  "Landscaping",
  "Cleaning",
  "Bakery",
  "Restaurant / Café",
  "Salon / Barber",
  "Auto repair",
  "Fitness",
  "Other",
] as const;

export const FEATURES = [
  { key: "services", label: "Services / menu list" },
  { key: "gallery", label: "Photo gallery" },
  { key: "booking", label: "Booking / appointments" },
  { key: "orders", label: "Online orders" },
  { key: "reviews", label: "Customer reviews" },
  { key: "contact", label: "Contact form" },
  { key: "faq", label: "FAQ" },
  { key: "blog", label: "Blog / news" },
] as const;

export const VIBES = [
  { key: "cozy", label: "Cozy & warm" },
  { key: "modern", label: "Clean & modern" },
  { key: "bold", label: "Bold & energetic" },
  { key: "classic", label: "Classic & trustworthy" },
] as const;

// First swatch is the Websitero blue so the preview defaults on-brand.
export const BRAND_COLORS = [
  "#4588ba",
  "#e11d48",
  "#059669",
  "#f59e0b",
  "#8b5cf6",
  "#0f172a",
] as const;
