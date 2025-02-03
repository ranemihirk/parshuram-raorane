"use server";

import clientPromise from "@/lib/mongodb";

export async function addRentersDetails(formData: FormData) {

  const renterName = formData.get("renterName") as string;
  const rentAmount = Number(formData.get("rentAmount"));

  try {
    const client = await clientPromise;
    const db = client.db("student-allocation");
    const collection = db.collection("renters");

    const result = await collection.insertOne({
      renterName,
      rentAmount,
      createdAt: new Date(),
    });
    return { success: true, message: "Renter added successfully!" };
  } catch (error) {
    console.error("Error inserting Renter:", error);
    return { success: false, message: "Failed to add Renter." };
  }
}
