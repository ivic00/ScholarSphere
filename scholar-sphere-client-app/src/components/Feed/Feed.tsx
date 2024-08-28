import React, { useEffect, useState } from "react";
import { backendLink } from "../../config";
import {
  Grid,
  Stack,
  Button,
  ButtonGroup,
  SelectChangeEvent,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import ScientificPaper from "../ScientificPaper/ScientificPaper";
import { IPaper } from "../../interfaces/IPaper";
import "../Feed/Feed.scss";
import { IPaginationParams } from "../../interfaces/IPaginationParams";
import PaginationComponent from "../PaginationComponent/PaginationComponent";
import SortByButtons from "../SortByButtons/SortByButtons";

function Feed() {
  const [paginationParams, setPaginationParams] = useState<IPaginationParams>({
    pageNumber: 1,
    pageSize: 4,
  });

  const [papersCount, setPapersCount] = useState<number>(0);

  const [papers, setPapers] = useState<IPaper[]>([]);
  const [sortState, setSortState] = useState<number>(0);

  const getPapers = () => {
    const link: any =
      backendLink +
      `Paper/GetAllPublishedPapers?pageNumber=${paginationParams?.pageNumber}&pageSize=${paginationParams?.pageSize}&sortState=${sortState}`;

    fetch(link)
      .then((res) => res.json())
      .then((data) => {
        setPapers(data.data.item1);
        setPapersCount(data.data.item2);
      });
  };

  const handlePageSizeChange = (event: SelectChangeEvent) => {
    const size: number = parseInt(event.target.value);
    setPaginationParams({
      pageNumber: 1,
      pageSize: size,
    });
  };

  useEffect(() => {
    getPapers();
  }, []);

  useEffect(() => {
    getPapers();
  }, [paginationParams, sortState]);



  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPaginationParams({
      pageNumber: page,
      pageSize: paginationParams.pageSize,
    });
  };

  return (
    <Grid container spacing={2} direction="row" justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h2" color="initial">
          Published papers
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Stack spacing={1}>
          <SortByButtons setSortState={setSortState} sortState={sortState} />
        </Stack>
      </Grid>
      <Grid item xs={12} sm={11} md={10} lg={9}>
        <PaginationComponent
          pageNumber={paginationParams.pageNumber}
          pageSize={paginationParams.pageSize}
          totalElementsCount={papersCount}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </Grid>
      <Grid item xs={12} sm={11} md={10} lg={9}>
        {papers.map((paper) => (
          <ScientificPaper key={paper.id.toString()} paper={paper} />
        ))}
        <PaginationComponent
          pageNumber={paginationParams.pageNumber}
          pageSize={paginationParams.pageSize}
          totalElementsCount={papersCount}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </Grid>
    </Grid>
  );
}
export default Feed;
