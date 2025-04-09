import Fab from "@mui/material/Fab";
import ModeRoundedIcon from "@mui/icons-material/ModeRounded";
import ModalUpdate from "./ModalUpdate";
import { useState } from "react";


export default function UpdateTask({indexId ,index}) {
    const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Fab
        size="small"
        sx={{
          bgcolor: "#666",
          color: "white",
          "&:hover": { bgcolor: "#555" },
        }}
        aria-label="edit"
        onClick={() => setShowModal(true)}
      >
        <ModeRoundedIcon fontSize="small" />
      </Fab>
      <ModalUpdate
        showModal={showModal}
        setShowModal={setShowModal}
        indexId={indexId}
        index={index}
      />
    </>
  );
}
