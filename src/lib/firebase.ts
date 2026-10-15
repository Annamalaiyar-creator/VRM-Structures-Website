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
