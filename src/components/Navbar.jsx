import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import "./Auth.css";

const Navbar = ({ onSearch }) => {
  const [user] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const db = getFirestore();

  useEffect(() => {
    let isMounted = true;

    const checkAdminRole = async () => {
      if (user?.uid) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);

          if (isMounted) {
            setIsAdmin(userSnap.exists() && userSnap.data().role === "admin");
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
    };

    checkAdminRole();

    return () => {
      isMounted = false;
    };
  }, [user, db]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value); // Pass the search term to the parent component
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          Car<span>spot</span>
        </Link>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search cars..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/carview">Cars</Link>
          {isAdmin && <Link to="/admin">Admin</Link>}
        </div>

        <div className="auth-section">
          {user ? (
            <>
              <span className="welcome-text">
                Welcome, {user.displayName || user.email}!
              </span>
              <button className="logout-btn" onClick={() => signOut(auth)}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="login-btn">
              Login / Signup
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

