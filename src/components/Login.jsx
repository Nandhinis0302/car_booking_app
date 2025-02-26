import React, { useState } from "react";
import { auth, provider, db } from "../firebaseConfig";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to get user role from Firestore
  const getUserRole = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      return userDoc.exists() ? userDoc.data().role : "user"; // Default to 'user' if not found
    } catch (error) {
      console.error("Error fetching user role:", error);
      return "user";
    }
  };

  // Handle Email/Password Login
  const handleLogin = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const role = await getUserRole(user.uid);
      alert("Login Successful!");

      navigate(role === "admin" ? "/admin" : "/carlist"); // Redirect based on role
    } catch (error) {
      console.error("Login Failed:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Login
  const googleSignIn = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      const role = await getUserRole(user.uid);
      alert("Google Login Successful!");

      navigate(role === "admin" ? "/admin" : "/carlist");
    } catch (error) {
      console.error("Google Sign-In Failed:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <button onClick={googleSignIn} className="google-btn" disabled={loading}>
          {loading ? "Signing in..." : "Continue with Google"}
        </button>
        <p>
          New user? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
