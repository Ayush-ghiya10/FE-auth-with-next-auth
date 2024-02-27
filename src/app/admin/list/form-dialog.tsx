import { Dialog, DialogTitle } from "@mui/material";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import Paper, { PaperProps } from "@mui/material/Paper";
import Draggable from "react-draggable";
import axios from "axios";
import { useSession } from "next-auth/react";
import axiosInstance from "@/utils/axiosInstance";
function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}
const FormDialog = ({
  modalState,
  setModalState,
}: {
  modalState: boolean;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { data } = useSession();
  return (
    <Dialog
      open={modalState}
      maxWidth="xl"
      onClose={() => {
        setModalState(false);
      }}
      PaperComponent={PaperComponent}
    >
      <DialogTitle
        className="relative flex w-full items-center justify-center"
        style={{ cursor: "move" }}
        id="draggable-dialog-title"
      >
        Add new Admin
        <IoClose
          className="absolute right-5 top-5 h-8 w-8 cursor-pointer"
          onClick={() => {
            setModalState(false);
          }}
        />
      </DialogTitle>

      <div className="flex flex-col items-center px-8 pt-2 pb-10">
        <label className="mt-4 block w-full" htmlFor="name">
          <p className="mb-1 text-sm text-gray-600">Email Address</p>
          <input
            className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="block w-full" htmlFor="first-name">
          <p className="mb-1 text-sm text-gray-600">First Name</p>
          <input
            className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1"
            type="text"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label className="block w-full" htmlFor="last-name">
          <p className="mb-1 text-sm text-gray-600">Last Name</p>
          <input
            className="w-full rounded-md border bg-white py-2 px-2 outline-none ring-blue-600 focus:ring-1"
            type="text"
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>

        <div className="mt-8 flex flex-col justify-center space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
          <button
            className="whitespace-nowrap rounded-md bg-blue-500 px-4 py-3 font-medium text-white"
            onClick={async () => {
              const res = await axiosInstance.post("/user/admin/add", {
                email,
                firstName,
                lastName,
              });
            }}
          >
            Add User
          </button>
          <button
            className="whitespace-nowrap rounded-md bg-gray-200 px-4 py-3 font-medium"
            onClick={() => setModalState(false)}
          >
            Cancel Operation
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-4">
          Password will be sent to their email
        </p>
      </div>
    </Dialog>
  );
};

export default FormDialog;
