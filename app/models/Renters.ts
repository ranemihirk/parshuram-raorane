import mongoose, { Schema, model, models } from "mongoose";

const RentSchema = new Schema({
  renterName: { type: String, required: true },
  rentersData: [
    {
      month: String,
      amount: Number,
    },
  ],
  rentAmount: { type: Number, required: true },
});

const Renter = model("Renter", RentSchema);
export default Renter;
