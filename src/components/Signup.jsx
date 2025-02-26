import React, { useState } from "react";
import { auth, provider, db } from "../firebaseConfig"; // Import db
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Import Firestore functions
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add user to Firestore with default role 'user'
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "user", // Default role
      });

      alert("Signup Successful! Please login.");
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Signup Failed:", error);
      alert(error.message);
    }
  };

  const googleSignIn = async () => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // Store user role only if they are signing up for the first time
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, { email: user.email, role: "user" }, { merge: true });

      alert("Google Signup Successful!");
      navigate("/login"); // Redirect to login
    } catch (error) {
      console.error("Google Sign-In Failed:", error);
      alert(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign Up</h2>
        <input type="email" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        <button onClick={handleSignup}>Sign Up</button>
        <button onClick={googleSignIn} className="google-btn">Continue with Google</button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Signup;
