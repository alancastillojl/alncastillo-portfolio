declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackContactLead() {
  if (typeof window === "undefined" || !window.gtag) return;

  const conversionId = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;
  if (conversionId) {
    window.gtag("event", "conversion", { send_to: conversionId });
  }
  window.gtag("event", "generate_lead");
}
