import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import {
  Card,
  Typography,
  Button,
  IconButton,
  Tooltip,
  CardContent,
  Alert,
  AlertTitle,
  Snackbar,
  styled,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";
import "../PaperUpload/PaperUploadForm.scss";
import axios from "axios";
import { backendLink } from "../../config";
import { IAddPaper } from "../../interfaces/IAddPaper";
import axiosInstance from "../../services/axiosInstance";
import { IUser } from "../../interfaces/IUser";
import { IServiceResponse } from "../../interfaces/IServiceResponse";
import FieldSelect from "../FieldSelect/FieldSelect";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const link = backendLink + "Paper/AddPaper";

function PaperUploadForm() {
  const VisuallyHiddenInput = styled("input")`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    white-space: nowrap;
    width: 1px;
  `;
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [keywords, setKeywords] = useState("");
  const [sciField, setSciField] = useState<string>("");
  const [incorrField, setincorr] = useState<string>("");

  const [titleCheck, setTitleCheck] = useState<boolean>(true);
  const [abstractCheck, setAbstractCheck] = useState<boolean>(true);
  const [keywordsCheck, setKeywordsCheck] = useState<boolean>(true);
  const [fullTextCheck, setFullTextCheck] = useState<boolean>(true);

  const [user, setUser] = useState<IUser | any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/api/User/GetUserById");
        setUser(response.data.data);
        console.log(user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const [serviceResponse, setServiceResponse] = useState<IServiceResponse>();

  const handleSciFieldChange = (value: string) => {
    setSciField(value);
  };

  useEffect(() => {
    if (serviceResponse?.message) {
      alert(serviceResponse.message);
      window.location.href = "/Feed";
    }
  }, [serviceResponse]);

  async function addPaper(addPaperData: IAddPaper) {
    try {
      const response: IServiceResponse = await axiosInstance.post(
        "/api/paper/addpaper",
        addPaperData
      );
      setServiceResponse(response.data);
    } catch (error: any) {
      setServiceResponse(error.response.data);
    }
  }

  useEffect(() => {
    setTitleCheck(title === "");
    setAbstractCheck(abstract === "");
    setKeywordsCheck(keywords === "");
    setFullTextCheck(sciField === "");
  }, [title, abstract, keywords, sciField]);

  async function handleSubmit(
    title: String,
    abstract: String,
    keywords: String,
    fullText: String
  ) {
    if (title == "") setTitleCheck(true);
    else setTitleCheck(false);

    if (abstract == "") setAbstractCheck(true);
    else setAbstractCheck(false);

    if (keywords == "") setKeywordsCheck(true);
    else setKeywordsCheck(false);

    if (!titleCheck && !abstractCheck && !keywordsCheck && !fullTextCheck) {
      try {
        const response = await axiosInstance.post("api/Paper/AddPaper", {
          title,
          abstract,
          keywords,
          scientificField: sciField,
          pdfURL: "testUrl.com",
        });

        alert(response.data.message);

        window.location.href = "/feed";
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Incorrect input");
    }
  }
  return (
    <Card variant="outlined" className="formCard">
      <CardContent>
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
          required
          error={titleCheck}
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
          required
          error={abstractCheck}
          rows={2}
        />
        <br />
        <br />
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <VisuallyHiddenInput type="file" />
        </Button>
        <br />
        <br />
        <FieldSelect onSciFieldChange={handleSciFieldChange} />
        <br />
        <TextField
          id="keywordsTbox"
          label="Keywords"
          variant="standard"
          color="primary"
          helperText="please separate keywords with comma and space"
          fullWidth
          required
          value={keywords}
          error={keywordsCheck}
          onChange={(e) => {
            setKeywords(e.target.value);
          }}
        />
        <br />
        <br />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => handleSubmit(title, abstract, keywords, sciField)}
        >
          Submit
        </Button>
      </CardContent>
    </Card>
  );
}

export default PaperUploadForm;
