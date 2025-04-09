import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext } from "react";
import { TodoContext } from "./TodoContext";

export default function ModalMsg({ show, setShow, index }) {
  const { showTasks, setShowTasks } = useContext(TodoContext);

  function dltTask() {
    const deleteTask = [...showTasks];
    deleteTask.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(deleteTask));
    setShowTasks(deleteTask);
  }
  const handleClose = () => {
    setShow(false);
  };
  return (
    <React.Fragment>
      <Dialog
      style={{direction :"rtl"}}
        open={show}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        disableRestoreFocus
   
      >
        <DialogTitle id="responsive-dialog-title">{"حذف المهمة"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            لا يمكنك التراجع عن عملية الحذف في حال اختيار زر حذف
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>اغلاق</Button>
          <Button onClick={dltTask}>حذف</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
