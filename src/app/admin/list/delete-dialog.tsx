import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { IoClose } from "react-icons/io5";
import Paper, { PaperProps } from "@mui/material/Paper";
import Draggable from "react-draggable";
import axios from "axios";
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
const DeleteUserDialog = ({
  modalState,
  setModalState,
  userID,
}: {
  modalState: boolean;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
  userID: string;
}) => {
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
        Delete User
        <IoClose
          className="absolute right-5 top-5 h-8 w-8 cursor-pointer"
          onClick={() => {
            setModalState(false);
          }}
        />
      </DialogTitle>
      <DialogContent>
        <h1>`Are you sure you want to delete this user {userID} ?`</h1>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setModalState(false)}>Cancel</Button>
        <Button
          onClick={async () => {
            const res = await axiosInstance.post("/user/delete", {
              userId: userID,
            });
            setModalState(false);
          }}
          color="warning"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteUserDialog;
