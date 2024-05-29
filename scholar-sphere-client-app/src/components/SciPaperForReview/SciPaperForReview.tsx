import React, { useEffect, useState } from "react";
import { IPaper } from "../../interfaces/IPaper";
import {
  Button,
  CardHeader,
  Avatar,
  IconButton,
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Grid,
  Divider,
  Rating,
} from "@mui/material";
import "../SciPaperForReview/SciPaperForReview.scss";
import ReviewUploadModal from "../ReviewUploadModal/ReviewUploadModal";
import { WidthFull } from "@mui/icons-material";
import { IUser } from "../../interfaces/IUser";
import userService from "../../services/userService";
import DownloadPaperBtn from "../DownloadPaperBtn/DownloadPaperBtn";

const SciPaperForReview = (props: { paper: IPaper }) => {
  const [paper, setPaper] = useState<IPaper>(props.paper);
  const [paperId, setPaperId] = useState<number>(0);
  const [user, setUser] = useState<IUser>();

  async function handleAuthor() {
    const response = await userService.getPaperAuthor(paper.id);
    setUser(response.data);
  }

  useEffect(() => {
    setPaper(props.paper);
    handleAuthor();
  }, []);

  useEffect(() => {
    if (paper) setPaperId(paper.id);
  }, [paper]);

  return (
    <div id="paperDiv">
      <Card variant="elevation" elevation={3}>
        <CardContent>
          <b>
            <Typography
              variant="h5"
              color="textPrimary"
              sx={{ fontWeight: "bold" }}
            >
              {paper?.title}
            </Typography>
          </b>
          <Typography variant="subtitle1" sx={{ color: "gray" }}>
            {user?.firstName} {user?.lastName}
          </Typography>
          <br />
          <Typography variant="subtitle1" color="Highlight">
            Abstract
          </Typography>
          <Divider />
          <Typography variant="body1" color="initial">
            {paper?.abstract}
          </Typography>
          <br />
          <Typography variant="caption" color="initial">
            Keywords:{" "}
          </Typography>
          {paper?.keywords.split(", ").map((keyword, index) => (
            <Chip
              key={index}
              className="keywordChip"
              label={keyword}
              variant="filled"
              color="secondary"
              size="small"
            />
          ))}
          <br />
          <br />
          <DownloadPaperBtn paper={paper} />
          <Divider />
          <div className="write-review-btn">
            <ReviewUploadModal paper={paper} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SciPaperForReview;
