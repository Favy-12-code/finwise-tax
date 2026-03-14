import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier,  connectAuthEmulator } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBeFhIAsdUYf5UKndU0adp7yXQiv9l8xXE",
  authDomain: "finwiseauth.firebaseapp.com",
  projectId: "finwiseauth",
  storageBucket: "finwiseauth.firebasestorage.app",
  messagingSenderId: "820379012986",
  appId: "1:820379012986:web:8a14f4743308bd1a1e50c3",
  measurementId: "G-H3ZQ3WETHT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, RecaptchaVerifier };
auth.settings.appVerificationDisabledForTesting = true;