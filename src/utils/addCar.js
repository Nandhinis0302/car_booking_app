import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export const addCar = async () => {
  try {
    await addDoc(collection(db, "cars"), {
      name: "Honda Civic",
      brand: "Honda",
      price: 18000,
      year: 2021,
      imageURL: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.kbb.com%2Fhonda%2Fcivic-type-r%2F2019%2Fconsumer-reviews%2F&psig=AOvVaw0DThfof9QHfxRSqFWH6Zgp&ust=1740388026838000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLD2quW42YsDFQAAAAAdAAAAABAE",
      ownerID: "user456"
    });
    console.log("Car added successfully!");
  } catch (error) {
    console.error("Error adding car:", error);
  }
};
