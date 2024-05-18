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
import { IUser } from "../../interfaces/IUser";
import userService from "../../services/userService";

const ScientificPaper = (props: { paper: IPaper }) => {
  const [paper, setPaper] = useState<IPaper>(props.paper);
  const [user, setUser] = useState<IUser>();

  async function handleAuthor() {
    const response = await userService.getPaperAuthor(paper.id);
    setUser(response.data);
  };
  
  useEffect(() => {
    setPaper(props.paper);
    handleAuthor();
  }, []);

  return (
    <div id="paperDiv">
      <Card variant="elevation" elevation={3}>
        <CardContent>
          <b>
            <Typography variant="h5" color="textPrimary" sx={{fontWeight: 'bold'}}>
              {paper?.title}
            </Typography>
          </b>
          <Typography variant="subtitle1" sx={{color: 'gray'}}>
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
          <Typography variant="subtitle1" color="initial">
            File Here
          </Typography>
          <Divider />
          <div></div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScientificPaper;
