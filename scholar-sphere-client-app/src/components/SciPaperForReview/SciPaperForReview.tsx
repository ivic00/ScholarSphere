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

const SciPaperForReview = (props: { paper: IPaper }) => {
  const [paper, setPaper] = useState<IPaper>();
  const [paperId, setPaperId] = useState<number>(0);

  useEffect(() => {
    setPaper(props.paper);
  }, []);

  useEffect(() => {
    if (paper) setPaperId(paper.id);
  }, [paper]);

  return (
    <div id="paperDiv">
      <Card variant="elevation" elevation={3}>
        <CardContent>
          <Typography variant="h5" color="textPrimary">
            {paper?.title}
          </Typography>
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
          <Typography variant="subtitle1" color="initial">
            File Here
          </Typography>
          <Divider />
          <Typography variant="body1" color="initial">
            {paper?.fullText}
          </Typography>
          <div className="write-review-btn">
            <ReviewUploadModal paperId={paperId} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SciPaperForReview;
