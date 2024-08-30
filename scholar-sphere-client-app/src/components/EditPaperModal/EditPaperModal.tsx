import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IPaper } from "../../interfaces/IPaper";
import UploadFileButton from "../UploadFileButton/UploadFileButton";
import paperService from "../../services/paperService";
import { IUpdatePaper } from "../../interfaces/IUpdatePaper";
import FieldSelect from "../FieldSelect/FieldSelect";

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
  const [title, setTitle] = useState<string>(props.paperForEdit.title);
  const [abstract, setAbstract] = useState<string>(props.paperForEdit.abstract);
  const [keywords, setKeywords] = useState<string>(props.paperForEdit.keywords);
  const [fields, setFields] = useState<string>(
    props.paperForEdit.scientificField
  );
  const [existingFields, setExistingFields] = useState<string[]>([]);
  const [file, setFile] = useState<File>();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFileChange = (value: File) => {
    setFile(value);
  };

  const handleFieldsChange = (value: string) => {
    setFields(value);
  };

  function stringToArray(fields: string): string[] {
    return fields.split(";").filter((field) => field.trim().length > 0); // filter out empty strings
  }

  useEffect(() => {
    setExistingFields(stringToArray(props.paperForEdit.scientificField));
  }, []);

  const handlePaperUpdate = async () => {
    try {
      const newPaper: IUpdatePaper = {
        id: props.paperForEdit.id,
        title: title,
        abstract: abstract,
        keywords: keywords,
        scientificField: fields,
        file: file,
        forPublishing: false,
      };
      await paperService.updatePaper(newPaper, file).then(() => {
        window.location.href = "/MyPapers";
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <Button
        onClick={handleOpen}
        size="large"
        color="warning"
        variant="outlined"
        fullWidth
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
          <UploadFileButton onFileChange={handleFileChange} />{file && <Typography variant="caption" color="initial">Uploaded file!</Typography>}
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
          <br />
          <br />
          <FieldSelect
            onSciFieldChange={handleFieldsChange}
            existingFields={existingFields}
          />
          <br />
          <br />
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handlePaperUpdate}
          >
            Update Paper
          </Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default EditPaperModal;
