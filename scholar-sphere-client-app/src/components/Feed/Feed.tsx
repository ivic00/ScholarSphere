import React, { useEffect, useState } from "react";
import { backendLink } from "../../config";
import {
  Grid,
  Stack,
  Button,
  ButtonGroup,
  Card,
  CardContent,
} from "@mui/material";
import ScientificPaper from "../ScientificPaper/ScientificPaper";
import { IPaper } from "../../interfaces/IPaper";
import "../Feed/Feed.scss";
const buttons = [
  <Button variant="contained">Latest</Button>,
  <Button variant="contained">Best Rated</Button>,
  <Button variant="contained">Trending</Button>,
  <Button variant="contained">itd</Button>,
];
function Feed() {
  const getPapers = () => {
    const link: String = backendLink + "Paper/GetAllPapers";

    fetch("http://localhost:5185/api/Paper/GetAllPapers")
      .then((res) => res.json())
      .then((data) => setPapers(data.data));
  };

  useEffect(() => {
    getPapers();
  }, []);

  const [papers, setPapers] = useState<IPaper[]>([]);
  return (
      <Grid container spacing={2} direction="row" justifyContent="center">
        <Grid item xs={4}>
          {papers.map((paper) => (
            <ScientificPaper paper={paper} />
          ))}
        </Grid>
        <Grid item xs={2}>
          <Stack spacing={1}>
            <ButtonGroup
              variant="contained"
              orientation="vertical"
              color="info"
            >
              {buttons}
            </ButtonGroup>
          </Stack>
        </Grid>
      </Grid>
  );
}
export default Feed;
