"use client";
import { useState, Suspense, useEffect } from "react";
import "@/style.css";
import { addRentData } from "@/actions/addRentData";
import { addRentersDetails } from "@/actions/addRentersDetails";
import { useDataContext } from "@/contexts/DataContext";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { modifyRentData } from "@/actions/modifyRentData";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Rent() {
  const { rentersData, rentData, fetchRents, fetchRenter } = useDataContext();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function handleSubmit(formData: FormData) {
    const result = await addRentersDetails(formData);
    setMessages(result.message);
    await fetchRenter();
  }

  async function handleAddRentSubmit(formData: FormData) {
    const result = await addRentData(formData);
    setMessages(result.message);
    await fetchRents();
  }

  const calculateRent = (renterId, type) => {
    let amount = 0;
    if (rentData.length > 0) {
      if (type == "amount-paid") {
        rentData.map((item) => {
          console.log('item: ', item);
          if (renterId == item.renterId) {
            amount = amount + item.amountPaid;
          }
        });
      }
      if (type == "amount-pending") {
        rentData.map((item) => {
          // console.log("rentData: ", item);
          if (renterId == item.renterId) {
            amount = amount + (item.amountPaid - item.rentAmount);
          }
        });
      }
    }

    return amount;
  };

  // const fillRentPaid = () => {
  //   if (rentData.length > 0) {
  //     const rentId = "67a0a8294ea4dc4788bdc97f";
  //     const rentPaidDate = getFirstOfEachMonth(2024, 5);
  //     console.log("rentPaidDate: ", rentPaidDate);
  //     const newData = rentPaidDate.map((item) => {
  //       return {
  //         amountPaid: 1500,
  //         amountPaidDate: item,
  //         rentMonth: `${new Date(item).toLocaleString("en-US", {
  //           month: "long",
  //         })} ${new Date(item).getFullYear()}`,
  //       };
  //     });

  //     const newRentData = rentData
  //       .map((item) => {
  //         if (item.renterId != "67a0a8364ea4dc4788bdc980") return null;
  //         const date = new Date(item.rentMonth + " 1"); // Append day to create valid Date
  //         const year = date.getFullYear();
  //         const month = String(date.getMonth() + 1).padStart(2, "0");
  //         return {
  //           ...item,
  //           amountPaid: 0,
  //           amountPaidDate: null,
  //         };
  //       })
  //       .filter(Boolean);

  //     console.log("newData: ", newData);
  //     console.log("newRentData: ", newRentData);
  //     newRentData.map((item) => {
  //       // modifyRentData(item);
  //     });
  //   }
  // };

  // const getFirstOfEachMonth = (startYear, startMonth) => {
  //   const currentDate = new Date();
  //   const currentYear = currentDate.getFullYear();
  //   const currentMonth = currentDate.getMonth();

  //   let dates = [];

  //   for (let year = startYear; year <= currentYear; year++) {
  //     for (
  //       let month = year === startYear ? startMonth : 0;
  //       month < 12;
  //       month++
  //     ) {
  //       if (year === currentYear && month > currentMonth) break;
  //       dates.push(new Date(year, month - 1, 2).toISOString().split("T")[0]);
  //     }
  //   }

  //   return dates;
  // };

  // useEffect(() => {
  //   fillRentPaid();
  // }, [rentData]);

  // const updateOneData = () => {
  //   // 2025-02-24
  //   if(rentData && rentData.length > 0){
  //     const current = rentData[rentData.length-1];
  //     console.log('current: ', current);
  //     if(current) {
  //       current.amountPaid = 10000;
  //       current.amountPaidDate = '2024/02/23';
  //       console.log('current: ', current);
  //       modifyRentData(current);
  //     }
  //      // modifyRentData(data);
  //   }
   
  // };

  // useEffect(() => {
  //   // updateOneData();
  //   // console.log("rentData: ", rentData[rentData.length-1]);
  //   console.log('rentData: ', rentData);
  // }, [rentData]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex p-4 justify-end">
        <Button className="" variant="contained" onClick={handleOpen}>
          + Add Renter
        </Button>
      </div>
      <div className="w-full p-2">
        {" "}
        {rentersData &&
          rentersData.map((renter) => (
            <table
              className="w-full mb-4 text-center"
              key={`table_${renter.renterName}`}
            >
              <thead>
                <tr key={renter.renterName} className="">
                  <th className="border bg-dark text-light" colSpan="3">
                    <h2 className="text-2xl">
                      {renter.renterName} : {renter._id}
                    </h2>
                  </th>
                </tr>
              </thead>

              {rentData && rentData.length > 0 && (
                <tbody>
                  <tr className="bg-gray text-xl">
                    <th className="border">Month</th>
                    <th className="border">Amount</th>
                    <th className="border">Paid</th>
                  </tr>
                  {rentData.map(
                    (rent) =>
                      rent.renterId == renter._id && (
                        <tr key={`rent_${rent.rentMonth}`} className="text-lg">
                          <th className="border">{rent.rentMonth}</th>
                          <td className="border">{rent.rentAmount}</td>
                          {/* <td className="border">
                            {rent.isRentPaid ? "Paid" : "Unpaid"}
                          </td> */}
                          <td className="border">
                            <h3>{rent.amountPaid}</h3>
                            <span
                              className={`${
                                rent.amountPaidDate == null && "hidden"
                              } text-sm`}
                            >
                              {rent.amountPaidDate != '' && `(${rent.amountPaidDate})`}
                            </span>
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              )}
              <tfoot>
                <tr>
                  <th className="border">
                    Amount Paid: {calculateRent(renter._id, "amount-paid")}
                  </th>
                  <th></th>
                  <th className="border">
                    Amount Pending:{" "}
                    {Math.abs(calculateRent(renter._id, "amount-pending"))}
                  </th>
                </tr>
                <tr>
                  <th className="bg-gray/30 border" colSpan="3">
                    <form
                      className="flex flex-col lg:flex-row gap-2 justify-evenly item-center px-2 py-4"
                      action={handleAddRentSubmit}
                    >
                      <input
                        className="border border-dark/30 rounded-lg p-2"
                        type="text"
                        name="rentMonth"
                        placeholder="Rent Month"
                        required
                      />
                      <input
                        className="border border-dark/30 rounded-lg p-2"
                        type="text"
                        name="rentAmount"
                        placeholder="Rent Amount"
                        required
                      />
                      <div className="flex items-center">
                        <input type="checkbox" name="isRentPaid" />
                        <label className="ml-2" htmlFor="isRentPaid">
                          isRentPaid
                        </label>
                      </div>
                      <input
                        className="border border-dark/30 rounded-lg p-2"
                        type="text"
                        name="amountPaid"
                        placeholder="Amount Paid"
                        required
                      />
                      <input type="hidden" name="renterId" value={renter._id} />
                      <button
                        type="submit"
                        className="bg-dark text-light p-2 rounded-lg"
                      >
                        Add Rent
                      </button>
                    </form>
                  </th>
                </tr>
              </tfoot>
            </table>
          ))}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Renter
          </Typography>
          <form action={handleSubmit}>
            <input
              type="text"
              name="renterName"
              placeholder="Renter Name"
              required
            />
            <input
              type="text"
              name="rentAmount"
              placeholder="Renter Amount"
              required
            />
            <button type="submit">Add Renter</button>
          </form>
        </Box>
      </Modal>
    </Suspense>
  );
}
