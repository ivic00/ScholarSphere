import React, { useEffect, useState } from "react";
import { backendLink } from "../../config";
import {
  Grid,
  Stack,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Pagination,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import ScientificPaper from "../ScientificPaper/ScientificPaper";
import { IPaper } from "../../interfaces/IPaper";
import "../Feed/Feed.scss";
import { IPaginationParams } from "../../interfaces/IPaginationParams";
import PaginationComponent from "../PaginationComponent/PaginationComponent";

function Feed() {
  const [paginationParams, setPaginationParams] = useState<IPaginationParams>({
    pageNumber: 1,
    pageSize: 3,
  });

  const [papersCount, setPapersCount] = useState<number>(0);

  const [papers, setPapers] = useState<IPaper[]>([]);
  const [sortState, setSortState] = useState<Number>(0);

  const getPapers = () => {
    const link: any =
      backendLink +
      `Paper/GetAllPublishedPapers?pageNumber=${paginationParams?.pageNumber}&pageSize=${paginationParams?.pageSize}`;

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
  }, [paginationParams]);

  const buttons = [
    <Button
      key="latest"
      variant="contained"
      color="primary"
      onClick={() => {
        getPapers();
        setSortState(0);
      }}
    >
      Latest
    </Button>,
    <Button
      key="best-rated"
      variant="contained"
      color="primary"
      onClick={() => {
        getPapers();
        setSortState(1);
      }}
    >
      Best Rated
    </Button>,
    <Button
      key="earliest"
      variant="contained"
      color="primary"
      onClick={() => {
        getPapers();
        setSortState(2);
      }}
    >
      Earliest
    </Button>,
  ];

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
      <Grid item xs={8}>
        <PaginationComponent
          pageNumber={paginationParams.pageNumber}
          pageSize={paginationParams.pageSize}
          totalElementsCount={papersCount}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </Grid>
      <Grid item xs={4}>
        
      </Grid>
      <Grid item xs={8}>
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
      <Grid item xs={4}>
        <Stack spacing={1}>
          <ButtonGroup
            variant="contained"
            orientation="vertical"
            color="primary"
            size="large"
          >
            {buttons}
          </ButtonGroup>
        </Stack>
      </Grid>
    </Grid>
  );
}
export default Feed;
