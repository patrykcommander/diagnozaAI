"use client";

import React, { useState } from "react";
import { Dialog, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Upload from "@/components/Upload";

export default function Footer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => setOpen(true)}
        style={{ position: "fixed", bottom: 20, right: 20 }}
      >
        <AddIcon />
      </Fab>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <Upload closeDialog={() => setOpen(false)} />
      </Dialog>
    </>
  );
}
