import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDemoKeyVRMStructures",
  authDomain: "vrm-structures.firebaseapp.com",
  projectId: "vrm-structures",
  storageBucket: "vrm-structures.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const auth = getAuth(app);

export async function getAuthInstance() {
  return auth;
}

export async function addQuote(quoteData: any): Promise<void> {
  console.log("Mock addQuote called with data:", quoteData);
  const stored = localStorage.getItem("vrm_quotes");
  const quotes = stored ? JSON.parse(stored) : [];
  quotes.push({ id: `quote-${Date.now()}`, ...quoteData, date: new Date().toISOString() });
  localStorage.setItem("vrm_quotes", JSON.stringify(quotes));
  return Promise.resolve();
}

export async function addInquiry(inquiryData: any): Promise<void> {
  console.log("Mock addInquiry called with data:", inquiryData);
  const stored = localStorage.getItem("vrm_inquiries");
  const inquiries = stored ? JSON.parse(stored) : [];
  inquiries.push({ id: `inquiry-${Date.now()}`, ...inquiryData, date: new Date().toISOString() });
  localStorage.setItem("vrm_inquiries", JSON.stringify(inquiries));
  return Promise.resolve();
}
