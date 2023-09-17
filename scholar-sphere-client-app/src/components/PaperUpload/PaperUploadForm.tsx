import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Card, Typography, Button, IconButton, Tooltip } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";
import "../PaperUpload/PaperUploadForm.scss";

function PaperUploadForm() {
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [keyword, setKeyword] = useState("");
  const [fullText, setFullText] = useState("");
  const [keywordList, setKeywordList] = useState<string[]>([]);
  const [pom, setPom] = useState<string>("");
  //const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    console.log(keyword); // This will log the updated value of keyword
  }, [keyword]);

  const handleKeywordList = () => {
    const x = pom;
    setPom(pom + keyword + ', ');
  };

  return (
    <Card variant="outlined" className="formCard">
      <Typography variant="h5" color="initial">
        Paper Upload
      </Typography>
      <br />
      <TextField
        id="titleTbox"
        label="Title"
        variant="standard"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <br />
      <TextField
        id="abstractTbox"
        label="Abstract"
        value={abstract}
        onChange={(e) => setAbstract(e.target.value)}
        fullWidth
        multiline
        rows={2}
      />
      <br />
      <br />
      <TextField
        id="fullTextTbox"
        label="Text"
        variant="outlined"
        color="primary"
        value={fullText}
        onChange={(e) => setFullText(e.target.value)}
        multiline
        rows={4}
        fullWidth
      />
      <br />
      <br />
      <TextField
        id=""
        label=""
        variant="standard"
        color="primary"
        margin="none"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <IconButton onClick={handleKeywordList}>
        <AddCircleOutlineTwoToneIcon />
      </IconButton>
      <br /><br />
      {pom}
    </Card>
  );
}

export default PaperUploadForm;
