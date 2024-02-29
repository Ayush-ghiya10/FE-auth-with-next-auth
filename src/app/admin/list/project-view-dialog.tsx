import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { ResponseUser } from "userTest";

const ProjectDialog = ({
  modalState,
  setModalState,
}: {
  modalState: boolean;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  //   const { data } = useQuery({ queryKey: ["admin", "list"] });
  const queryClient = useQueryClient();

  const data: ResponseUser[] = queryClient.getQueryData(["adminlist"]);
  console.log(data);
  return (
    <Dialog
      open={modalState}
      maxWidth="xl"
      onClose={() => {
        setModalState(false);
      }}
    >
      <DialogTitle
        className="relative flex w-full items-center justify-center"
        style={{ cursor: "move" }}
        id="draggable-dialog-title"
      ></DialogTitle>

      <DialogContent>
        {data && data[0].Email}
        <button
          className="mr-5 bg-[#601EF0] text-white py-2 px-5 rounded "
          onClick={() =>
            queryClient.setQueryData<ResponseUser[]>(["adminlist"], (data) => {
              console.log(data);
              return [
                {
                  FirstName: "testing",
                  LastName: "testing",
                  Email: "testing",
                  Username: "testing",
                  UserID: "ssadfasdf",
                },
                ...data,
              ];
            })
          }
        >
          Testing
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDialog;
