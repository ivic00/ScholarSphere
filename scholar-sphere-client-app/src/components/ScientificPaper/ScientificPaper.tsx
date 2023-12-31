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
import "../ScientificPaper/ScientificPaper.scss";
import { backendLink } from "../../config";

const ScientificPaper = (props: {paper:IPaper}) => {
  const [paper, setPaper] = useState<IPaper>();


  useEffect(() => {
    setPaper(props.paper);
  }, []);

  return (
    <div id="paperDiv">
      <Card>
        <CardContent>
          <Typography variant="h5" color="initial">
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
            <Chip key={index} className="keywordChip" label={keyword} variant="filled" color="warning" size="small" />
          ))}
          <br />
          <br />
          <Typography variant="subtitle1" color="initial">
            Summary
          </Typography>
          <Divider />
          <Typography variant="body1" color="initial">
            {paper?.fullText}
          </Typography>

          <Rating
            name="size-large"
            defaultValue={2}
            size="large"
            precision={0.5}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default ScientificPaper;
