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
import userService from "../../services/userService";
import UploadFileButton from "../UploadFileButton/UploadFileButton";
import paperService from "../../services/paperService";
import { IPaper } from "../../interfaces/IPaper";

const link = backendLink + "Paper/AddPaper";

function PaperUploadForm() {
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [keywords, setKeywords] = useState("");
  const [sciField, setSciField] = useState<string>("");

  const [titleCheck, setTitleCheck] = useState<boolean>(true);
  const [abstractCheck, setAbstractCheck] = useState<boolean>(true);
  const [keywordsCheck, setKeywordsCheck] = useState<boolean>(true);
  const [fullTextCheck, setFullTextCheck] = useState<boolean>(true);

  const [user, setUser] = useState<IUser>();
  const [file, setFile] = useState<File>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setUser(await userService.getUser());
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

  const handleFileChange = (value: File) => {
    setFile(value);
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
    title: string,
    abstract: string,
    keywords: string,
    scientificField: string
  ) {
    if (title == "") setTitleCheck(true);
    else setTitleCheck(false);

    if (abstract == "") setAbstractCheck(true);
    else setAbstractCheck(false);

    if (keywords == "") setKeywordsCheck(true);
    else setKeywordsCheck(false);

    if (!titleCheck && !abstractCheck && !keywordsCheck && !fullTextCheck && file) {
      try {
        const paper: IAddPaper = {
          title,
          abstract,
          keywords,
          scientificField: sciField,
          pdfURL: "thisChanges",
          file: file
        };
        if (file) {
          const serviceResponse: IServiceResponse = await paperService.addPaper(
            paper
          );

          alert(serviceResponse.message);

          if (serviceResponse.success) window.location.href = "/feed";
        } else {
          alert("No File selected");
        }
      } catch (error) {
        alert(error);
      }
    } else {
      alert("Incorrect input");
    }
  }
  return (
    <Card variant="outlined" className="formCard">
      {user != undefined && user.role == 1 ? (
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
          <UploadFileButton onFileChange={handleFileChange} /> {file?.name}
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
      ) : (
        <div>As a Non-Author you can not post Scientific Papers</div>
      )}
    </Card>
  );
}

export default PaperUploadForm;
