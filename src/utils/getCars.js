import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export const getCars = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "cars"));
    const cars = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return cars;
  } catch (error) {
    console.error("Error fetching cars:", error);
    return [];
  }
};
