/**
 * Where website enquiries go. The site has no running backend on the live host, so
 * enquiry forms hand the visitor's message to WhatsApp (pre-filled, one tap to send)
 * with email as the alternative. Both are VRM's published sales contacts.
 */
import { trackEvent } from "./analytics";

export const SALES_WHATSAPP = "919884309789";
export const SALES_EMAIL = "mms@vrmstructures.in";

export type EnquiryFields = Record<string, string | undefined>;

/** "Label: value" lines for every filled field. */
export function enquiryText(title: string, fields: EnquiryFields): string {
  const lines = Object.entries(fields)
    .filter(([, value]) => value && value.trim())
    .map(([label, value]) => `${label}: ${value!.trim()}`);
  return [`${title} (vrmstructures.in)`, "", ...lines].join("\n");
}

export function whatsappUrl(text: string, phone = SALES_WHATSAPP): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export function mailtoUrl(subject: string, body: string, to = SALES_EMAIL): string {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Opens WhatsApp with the enquiry pre-filled and records the lead. Returns the URL used. */
export function sendEnquiryViaWhatsApp(formName: string, text: string, phone = SALES_WHATSAPP): string {
  const url = whatsappUrl(text, phone);
  trackEvent("generate_lead", { form_name: formName, method: "whatsapp" });
  const opened = window.open(url, "_blank", "noopener");
  if (!opened) window.location.href = url;
  return url;
}
