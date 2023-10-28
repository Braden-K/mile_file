import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import AddShoeForm from "./AddShoeForm";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const ShoeModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Typography variant="h3" style={{ fontFamily: "Poppins" }}>
        <Button
          style={{ margin: 20, border: "1px solid black" }}
          onClick={handleOpen}
        >
          Add Shoe +
        </Button>
      </Typography>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add a shoe
          </Typography>
          <AddShoeForm />
        </Box>
      </Modal>
    </div>
  );
};
