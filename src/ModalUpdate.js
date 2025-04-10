import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useContext } from "react";
import { TodoContext } from "./TodoContext";

export default function ModalUpdate({ showModal, setShowModal, indexId,index ,toastMsg}) {
  const { showTasks, setShowTasks } = useContext(TodoContext);
  const [title, setTitle] = useState(showTasks[index].task);

  function handleClose() {
    setShowModal(false);
  }

  function updateTsk() {
    toastMsg("!تم تعديل بنجاح", "success");
    const updatedTasks = showTasks.map((t) => {
      if (t.id === indexId) {
        return {
          ...t,
          task: title,
          
        };
      }
      return t;
    });
    setShowTasks(updatedTasks);
    localStorage.setItem("todos", JSON.stringify(updatedTasks));
    setShowModal(false);
  }

  return (
    <Dialog
      open={showModal}
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
     
    >
      <DialogTitle>تعديل المهمة</DialogTitle>
      <br></br>
      <DialogContent>
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          id="outlined-basic"
          label="قم بتعديل المهمة"
          variant="outlined"
          InputLabelProps={{ style: { color: "#b0b0b0" } }}
          sx={{
            input: { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#666" },
              "&:hover fieldset": { borderColor: "#555" },
              "&.Mui-focused fieldset": { borderColor: "#bb86fc" },
            },
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={updateTsk}>تعديل</Button>
        <Button onClick={handleClose}>اغلاق</Button>
      </DialogActions>
    </Dialog>
  );
}
