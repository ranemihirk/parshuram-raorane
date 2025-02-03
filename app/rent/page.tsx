"use client";
import { useEffect, useState, useCallback } from "react";
import "@/style.css";
import { motion, useInView } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import { faSitemap } from "@fortawesome/free-solid-svg-icons/faSitemap";
import { faWheelchair } from "@fortawesome/free-solid-svg-icons/faWheelchair";
import useMediaQuery from "@mui/material/useMediaQuery";
import { table } from "console";
import { addRentData } from "@/actions/addRentData";
import { addRentersDetails } from "@/actions/addRentersDetails";
import { useDataContext } from "@/contexts/DataContext";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

type rentersData = {
  month: string;
  amount: number;
};

type RentDetails = {
  renterName: string;
  rentersData: rentersData[];
  rentAmount: number;
};

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

const defaultRentDetails: RentDetails[] = [
  {
    renterName: "Seema Gandhi",
    rentersData: [],
    rentAmount: 1500,
  },
  {
    renterName: "Jitendra Sonkar",
    rentersData: [],
    rentAmount: 2500,
  },
];

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
    console.log("formData: ", formData);
    const result = await addRentData(formData);
    setMessages(result.message);
    await fetchRents();
  }

  //   const handleAddRent = (renter_id, amount) => {};

  const calculateRent = (renterId, type) => {
    let amount = 0;
    if (type == "amount-paid") {
      rentData.map((item) => {
        if (renterId == item.renterId && item.isRentPaid) {
          amount = amount + item.rentAmount;
        }
      });
    }
    if (type == "amount-pending") {
      rentData.map((item) => {
        if (renterId == item.renterId && !item.isRentPaid) {
          amount = amount + item.rentAmount;
        }
      });
    }
    return amount;
  };

  useEffect(() => {
    const start = new Date("2024-05-01");
    const today = new Date();
    for (let d = new Date(start); d <= today; d.setMonth(d.getMonth() + 1)) {
      console.log(
        new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
        }).format(d)
      );
    }
  }, []);

  return (
    <>
      <div className="flex p-4 justify-evenly">
        <Button className="" variant="contained" onClick={handleOpen}>
          Add Renter
        </Button>
      </div>
      <div className="w-full p-2">
        {" "}
        {rentersData &&
          rentersData.map((renter) => (
            <table className="w-full mb-4 text-center">
              <tr key={renter.renterName} className="">
                <th className="border bg-dark text-light" colSpan="3">
                  <h2 className="text-xl">{renter.renterName} : {renter._id}</h2>
                </th>
              </tr>
              {rentData && (
                <>
                  <tr>
                    <th className="border">Month</th>
                    <th className="border">Amount</th>
                    <th className="border">IsPaid</th>
                  </tr>
                  {rentData.map(
                    (rent) =>
                      rent.renterId == renter._id && (
                        <tr key={`rent_${rent.rentMonth}`} className="">
                          <th className="border">{rent.rentMonth}</th>
                          <td className="border">{rent.rentAmount}</td>
                          <td className="border">
                            {rent.isRentPaid ? "Paid" : "Unpaid"}
                          </td>
                        </tr>
                      )
                  )}
                </>
              )}
              <tr>
                <th className="border">
                  Amount Paid: {calculateRent(renter._id, "amount-paid")}
                </th>
                <th></th>
                <th className="border">
                  Amount Pending: {calculateRent(renter._id, "amount-pending")}
                </th>
              </tr>
              <tr>
                <th className="border" colSpan="3">
                  <form
                    className="flex justify-evenly item-center py-4"
                    action={handleAddRentSubmit}
                  >
                    <input
                      type="text"
                      name="rentMonth"
                      placeholder="Rent Month"
                      required
                    />
                    <input
                      type="text"
                      name="rentAmount"
                      placeholder="Rent Amount"
                      required
                    />
                    <div className="flex items-center">
                      <input type="checkbox" name="isRentPaid" />
                      <label htmlFor="isRentPaid">isRentPaid</label>
                    </div>
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
      {/* <div>
        <div>
          
          {messages && <p>{messages}</p>}
        </div>
      </div> */}
    </>
  );
}
