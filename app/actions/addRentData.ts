"use server";

import clientPromise from "@/lib/mongodb";

export async function addRentData(formData: FormData) {
  const renterId = formData.get("renterId") as string;
  const rentMonth = formData.get("rentMonth") as string;
  const rentAmount = Number(formData.get("rentAmount"));
  const isRentPaid = formData.has("isRentPaid");
  const amountPaid = Number(formData.get("amountPaid"));

  try {
    const client = await clientPromise;
    const db = client.db("student-allocation");
    const collection = db.collection("rent-data");
    const date = new Date();

    const result = await collection.insertOne({
      rentMonth,
      rentAmount,
      isRentPaid,
      renterId,
      amountPaid: amountPaid != 0 ? amountPaid : 0,
      amountPaidDate: amountPaid != 0 ? `${date.getFullYear()}/${String(
        date.getMonth() + 1
      ).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}` : '',
      createdAt: date,
      updatedAt: date,
    });
    return { success: true, message: "Renter added successfully!" };
  } catch (error) {
    console.error("Error inserting Renter:", error);
    return { success: false, message: "Failed to add Renter." };
  }
}
