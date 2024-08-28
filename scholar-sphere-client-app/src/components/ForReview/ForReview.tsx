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
import { IPaginationParams } from "../../interfaces/IPaginationParams";
import { IPaper } from "../../interfaces/IPaper";
import paperService from "../../services/paperService";
import SciPaperForReview from "../SciPaperForReview/SciPaperForReview";
import SortByButtons from "../SortByButtons/SortByButtons";

function ForReview() {
  const [user, setUser] = useState<IUser>();

  const [paginationParams, setPaginationParams] = useState<IPaginationParams>({
    pageNumber: 1,
    pageSize: 3,
  });
  const [papersCount, setPapersCount] = useState<number>(0);
  const [papers, setPapers] = useState<IPaper[]>([]);
  const [sortState, setSortState] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      setUser(await userService.getUser());
    };
    fetchData();
    getPapers();
  }, []);

  useEffect(() => {
    getPapers();
  }, [user, sortState, paginationParams]);

  const handlePageSizeChange = (event: SelectChangeEvent) => {
    const size: number = parseInt(event.target.value);
    setPaginationParams({
      pageNumber: 1,
      pageSize: size,
    });
  };


  const getPapers = () => {
    const sciField = user?.expertise || "";
    paperService
      .getForReview(
        paginationParams.pageNumber,
        paginationParams.pageSize,
        sciField,
        sortState
      )
      .then((data) => {
        setPapers(data.item1);
        setPapersCount(data.item2);
      });
  };


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
          <Grid item xs={12} sm={11} md={10} lg={9}>
            <Stack spacing={1}>
              <SortByButtons sortState={sortState} setSortState={setSortState} />
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
        </Grid>
      ) : (
        <div>You can not write Reviews as a non-Reviewer</div>
      )}
    </div>
  );
}

export default ForReview;
