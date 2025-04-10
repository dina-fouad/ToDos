import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import Fab from "@mui/material/Fab";
import ModalMsg from "./ModalMsg";
import { useState } from "react";


export default function DeleteTask({ index ,toastMsg}) {
  const [show, setShow] = useState(false);

  return (
    <>
      <Fab
        size="small"
        color="error"
        aria-label="delete"
        sx={{ "&:hover": { bgcolor: "#c62828" } }}
        onClick={() => setShow(true)}
      >
        <DeleteForeverRoundedIcon fontSize="small" />
      </Fab>
      <ModalMsg toastMsg={toastMsg}show={show} setShow={setShow} index={index} />
    </>
  );
}
