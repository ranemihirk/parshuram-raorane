"use server";

import clientPromise from "@/lib/mongodb";

export async function modifyRentData(rentersData) {
  const renterId = rentersData.renterId;
  const rentMonth = rentersData.rentMonth;

  const amountPaid = rentersData.amountPaid;
  const amountPaidDate = rentersData.amountPaidDate;

  try {
    const client = await clientPromise;
    const db = client.db("student-allocation");
    const collection = db.collection("rent-data");

    // const result = await collection.insertOne({
    //   rentMonth,
    //   rentAmount,
    //   isRentPaid,
    //   renterId,
    //   createdAt: new Date(),
    // });
    const result = await collection.updateOne(
      {
        renterId,
        rentMonth,
      },
      {
        $set: {
          amountPaid,
          amountPaidDate,
          updatedAt: new Date(),
        },
      },
      { upsert: true } // Creates a new document if it doesn't exist
    );
    return { success: true, message: "Renter updated successfully!" };
  } catch (error) {
    console.error("Error updating Renter:", error);
    return { success: false, message: "Failed to update Renter." };
  }
}
