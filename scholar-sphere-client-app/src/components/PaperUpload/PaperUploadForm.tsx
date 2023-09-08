import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import {
  Card,
  Grid,
  Typography,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";
import "../PaperUpload/PaperUploadForm.scss";

function PaperUploadForm() {
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [keyword, setKeyword] = useState("");
  const [keywordList, setKeywordList] = useState<string[]>([]);
  //const [file, setFile] = useState<File | null>(null);

  const handleKeywordList = () => {
    if (keyword.trim() !== "") {
      const lowerCaseKeyword = keyword.toLowerCase();
      setKeywordList((prevKeywordList) => {
        if (
          !prevKeywordList.some((x) => x.toLowerCase() === lowerCaseKeyword)
        ) {
          return [...prevKeywordList, keyword];
        }
        return prevKeywordList;
      });
      setKeyword("");
    }

    console.log("Keywords: " + keywordList.toString());
  };

  return (
    <Card id="formCard" variant="elevation" elevation={5}>
      <Grid container spacing={2} id="formGrid">
        <Grid item xs={12}>
          <Typography variant="h4" color="initial" align="center">
            Upload Paper
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <TextField
            id="txtTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            label="Title"
            fullWidth
            variant="filled"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            className="rounded"
            id="txtAbstract"
            label="Abstract"
            value={abstract}
            fullWidth
            multiline
            onChange={(e) => setAbstract(e.target.value)}
            rows={3}
            size="small"
            required
          />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button variant="outlined" color="secondary">
            <UploadFileIcon />
            Upload File
          </Button>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            variant="outlined"
            label="Keywords"
            size="small"
            onChange={(e) => {
              console.log(keyword);
              setKeyword(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={1}>
          <Tooltip title="Add Keyword" placement="right">
            <IconButton color="primary" onClick={handleKeywordList}>
              <AddCircleOutlineTwoToneIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="success" type="submit" fullWidth>
            Publish Paper
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}

export default PaperUploadForm;
