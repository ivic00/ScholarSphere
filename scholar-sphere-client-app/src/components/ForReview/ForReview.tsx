import React, { useEffect, useState } from "react";
import { IUser } from "../../interfaces/IUser";
import userService from "../../services/userService";
import {
  Grid,
  Stack,
  ButtonGroup,
  SelectChangeEvent,
  Button,
} from "@mui/material";
import PaginationComponent from "../PaginationComponent/PaginationComponent";
import ScientificPaper from "../ScientificPaper/ScientificPaper";
import { IPaginationParams } from "../../interfaces/IPaginationParams";
import { IPaper } from "../../interfaces/IPaper";
import paperService from "../../services/paperService";
import SciPaperForReview from "../SciPaperForReview/SciPaperForReview";

function ForReview() {
  const [user, setUser] = useState<IUser>();

  const [paginationParams, setPaginationParams] = useState<IPaginationParams>({
    pageNumber: 1,
    pageSize: 3,
  });
  const [papersCount, setPapersCount] = useState<number>(0);
  const [papers, setPapers] = useState<IPaper[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setUser(await userService.getUser());
    };
    fetchData();
    getPapers();
  }, []);

  useEffect(() => {
    getPapers();
  }, [user]);

  useEffect(() => {
    getPapers();
  }, [paginationParams]);

  const handlePageSizeChange = (event: SelectChangeEvent) => {
    const size: number = parseInt(event.target.value);
    setPaginationParams({
      pageNumber: 1,
      pageSize: size,
    });
  };

  const [sortState, setSortState] = useState<Number>(0);

  const getPapers = () => {
    const sciField = user?.expertise || "";
    paperService
      .getForReview(
        paginationParams.pageNumber,
        paginationParams.pageSize,
        sciField
      )
      .then((data) => {
        setPapers(data.item1);
        setPapersCount(data.item2);
      });
  };

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
    <div>
      {user?.role == 2 ? (
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
          <Grid item xs={4}></Grid>
          <Grid item xs={8}>
            {papers.map((paper) => (
              <SciPaperForReview key={paper.id.toString()} paper={paper} />
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
      ) : (
        <div>You can not write Reviews as a non-Reviewer</div>
      )}
    </div>
  );
}

export default ForReview;
