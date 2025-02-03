"use server";

import clientPromise from "@/lib/mongodb";
import Renter from "@/models/Renters";

export async function fetchRentersData() {
  //   await clientPromise();

  //   const renterName = formData.get("renterName") as string;
  //   const rentAmount = Number(formData.get("rentAmount"));

  try {
    const client = await clientPromise;
    const db = client.db("student-allocation");
    const collection = db.collection("renters");

    const data = await collection.find({}).toArray();

    return data.map((rent) => ({
      _id: rent._id.toString(), // Fix ObjectId
      renterName: rent.renterName,
      rentAmount: rent.rentAmount,
      createdAt: rent.createdAt.toISOString(), // Fix Date
    }));
  } catch (error) {
    console.error("Error inserting Renter:", error);
    return { success: false, message: "Failed to add Renter." };
  }
}
