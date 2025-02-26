// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "./firebaseConfig";
// import { useEffect, useState } from "react";

// import HomePage from "./pages/HomePage";
// import CarDetails from "./pages/CarDetails";
// import AdminDashboard from "./pages/AdminDashboard";
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import Navbar from "./components/Navbar";
// import { getFirestore, doc, getDoc } from "firebase/firestore";

// const App = () => {
//   const [user, loading] = useAuthState(auth);
//   const [role, setRole] = useState(null);

//   useEffect(() => {
//     const fetchUserRole = async () => {
//       if (user) {
//         const db = getFirestore();
//         const userRef = doc(db, "users", user.uid);
//         const userSnap = await getDoc(userRef);
//         setRole(userSnap.exists() ? userSnap.data().role : "user");
//       }
//     };
//     fetchUserRole();
//   }, [user]);

//   if (loading) return <div>Loading...</div>;

//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/car/:id" element={<CarDetails />} />
//         <Route path="/admin" element={user && role === "admin" ? <AdminDashboard /> : <Navigate to="/login" />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;






import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./firebaseConfig";  // Use db from firebaseConfig
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import HomePage from "./pages/HomePage";
import CarDetails from "./pages/CarDetails";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";

const App = () => {
  const [user, loading] = useAuthState(auth);
  const [role, setRole] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchUserRole = async () => {
      if (!user) return;

      try {
        const userRef = doc(db, "users", user.uid); // Use db from firebaseConfig
        const userSnap = await getDoc(userRef);

        if (isMounted) {
          setRole(userSnap.exists() ? userSnap.data().role : "user");
        }
      } catch (error) {
        console.error("Error fetching role:", error);
      }
    };

    fetchUserRole();

    return () => {
      isMounted = false;
    };
  }, [user]);

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/car/:id" element={<CarDetails />} />
        <Route 
          path="/admin" 
          element={
            loading || role === null ? <div>Loading...</div> : 
            user && role === "admin" ? <AdminDashboard /> : <Navigate to="/login" />
          } 
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
