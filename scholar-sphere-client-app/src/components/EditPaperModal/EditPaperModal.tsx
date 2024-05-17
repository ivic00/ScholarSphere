import { Box, Button, Modal, TextField } from "@mui/material";
import React, { useState } from "react";
import { IPaper } from "../../interfaces/IPaper";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
};

function EditPaperModal(props: { paperForEdit: IPaper }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState<String>(props.paperForEdit.title);
  const [abstract, setAbstract] = useState<String>(props.paperForEdit.abstract);
  const [keywords, setKeywords] = useState<String>(props.paperForEdit.keywords);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <React.Fragment>
      <Button
        onClick={handleOpen}
        size="large"
        color="warning"
        variant="outlined"
      >
        Edit Paper
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            variant="filled"
            id="titletb"
            label="Title"
            multiline
            fullWidth
            disabled
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <br />
          <br />
          <TextField
            id="abstractTb"
            label="Abstract"
            multiline
            fullWidth
            value={abstract}
            onChange={(e) => {
              setAbstract(e.target.value);
            }}
          />
          <br />
          <br />
          <TextField
            id="keywordsTb"
            label="Keywords"
            multiline
            fullWidth
            value={keywords}
            onChange={(e) => {
              setKeywords(e.target.value);
            }}
          />
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default EditPaperModal;
