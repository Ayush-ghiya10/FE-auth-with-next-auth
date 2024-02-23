"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IoMdHome } from "react-icons/io";
import { useRouter } from "next/navigation";
import FormDialog from "./form-dialog";

const Page = () => {
  const [adminList, setAdminList] = useState<Array<any>>([]);
  const router = useRouter();
  const [modalState, setModalState] = useState(false);
  const getAdminList = async () => {
    try {
      const resData = (
        await axios.get(
          process.env.NEXT_PUBLIC_BACKEND_URL + "/user/admin/list"
        )
      ).data;
      return resData;
    } catch (error) {
      return null;
    }
  };
  useEffect(() => {
    getAdminList().then((value) => {
      setAdminList(value);
    });
  }, []);
  return (
    <div className="h-full w-full py-3">
      <div className="w-full flex items-center justify-between my-5">
        <h2 className="text-xl">Super Admin List</h2>
        <div className="flex items-center justify-center">
          <button
            className="mr-5 bg-[#601EF0] text-white py-2 px-5 rounded"
            onClick={() => setModalState(true)}
          >
            + Add Super Admin
          </button>
          <button
            className="mr-5 bg-[#601EF0] text-white py-2 px-5 rounded "
            onClick={() => {
              router.push("/");
            }}
          >
            <IoMdHome className="h-5 w-5" />
          </button>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="bg-[#601EF0]">
            <TableRow>
              <TableCell className="text-white">Sr No</TableCell>
              <TableCell className="text-white" align="left">
                First Name
              </TableCell>
              <TableCell className="text-white" align="left">
                Last Name
              </TableCell>
              <TableCell className="text-white" align="left">
                Email
              </TableCell>
              <TableCell className="text-white" align="left">
                Username
              </TableCell>
              <TableCell className="text-white " align="left">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminList.map((row, index) => (
              <TableRow
                key={row.UserID}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
                className="even:bg-gray-100"
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>

                <TableCell align="left">{row.FirstName}</TableCell>
                <TableCell align="left">{row.LastName}</TableCell>
                <TableCell align="left">{row.Email}</TableCell>
                <TableCell align="left">{row.Username}</TableCell>
                <TableCell align="left">{row.UserID}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <FormDialog modalState={modalState} setModalState={setModalState} />
    </div>
  );
};

export default Page;
