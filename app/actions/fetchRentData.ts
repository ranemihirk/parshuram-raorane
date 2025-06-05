"use server";

import clientPromise from "@/lib/mongodb";
import Renter from "@/models/Renters";

export async function fetchRentData() {
  //   await clientPromise();

  //   const renterName = formData.get("renterName") as string;
  //   const rentAmount = Number(formData.get("rentAmount"));

  try {
    const client = await clientPromise;
    const db = client.db("student-allocation");
    const collection = db.collection("rent-data");

    const data = await collection.find({}).toArray();

    return data.map((rent) => ({
      _id: rent._id.toString(), // Fix ObjectId
      rentMonth: rent.rentMonth,
      rentAmount: rent.rentAmount,
      isRentPaid: rent.isRentPaid,
      renterId: rent.renterId.toString(),
      amountPaid: rent.amountPaid,
      amountPaidDate: rent.amountPaidDate,
      createdAt: rent.createdAt, // Fix Date
    }));
  } catch (error) {
    console.error("Error inserting Renter:", error);
    return { success: false, message: "Failed to fetch Renter." };
  }
}
