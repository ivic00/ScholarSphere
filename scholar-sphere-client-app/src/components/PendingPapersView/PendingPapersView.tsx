import React, { useEffect, useState } from "react";
import { IPaperForPub } from "../../interfaces/IPaperForPub";
import { IPaginationParams } from "../../interfaces/IPaginationParams";
import paperService from "../../services/paperService";
import PaginationComponent from "../PaginationComponent/PaginationComponent";
import DownloadPaperBtn from "../DownloadPaperBtn/DownloadPaperBtn";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  AlertTitle,
  Button,
  CardActions,
  CardContent,
  Chip,
  Grid,
  Paper,
  Typography,
  SelectChangeEvent,
  Stack,
  Snackbar,
} from "@mui/material";
import myDateTime from "../../services/MyDT";
import { IServiceResponse } from "../../interfaces/IServiceResponse";
function PendingPapersView() {
  const [pendPaps, setPendPaps] = useState<IPaperForPub[]>();
  const [totalPages, setTotalPages] = useState<number>(1);
  const [open, setOpen] = React.useState(false);

  const [paginationParams, setPaginationParams] = useState<IPaginationParams>({
    pageNumber: 1,
    pageSize: 4,
  });

  const getPapers = () => {
    paperService
      .GetAllPendingPaginated(
        paginationParams.pageNumber,
        paginationParams.pageSize
      )
      .then((res) => {
        const mappedData = res.data[0].item1.map((item: any) => ({
          data: item.item1,
          revCount: item.item2,
          posRevCount: item.item3,
          negRevCount: item.item4,
        }));
        setPendPaps(mappedData);
        setTotalPages(res.data[0].item2);
      });
  };
  useEffect(() => {
    getPapers();
  }, []);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPaginationParams({
      pageNumber: page,
      pageSize: paginationParams.pageSize,
    });
  };

  useEffect(() => {
    //mozda za kasnije
  }, [pendPaps]);

  const handlePageSizeChange = (event: SelectChangeEvent) => {
    const size: number = parseInt(event.target.value);
    setPaginationParams({
      pageNumber: 1,
      pageSize: size,
    });
  };

  useEffect(() => {
    getPapers();
  }, [paginationParams]);

  function handlePubClick(paperId: number) {
    console.log("paperId: " + paperId);
    paperService.publishPaper(paperId).then((res) => {
      if (res.success) {
        alert(res.message);
        window.location.href = "/PendingPapersView";
      } else {
        alert(res.message);
      }
    });
  }

  return (
    <div>
      {pendPaps && (
        <>
          <Typography variant="h2" color="initial">
            Pending for publishing
          </Typography>
          <br />
          <PaginationComponent
            pageNumber={paginationParams.pageNumber}
            pageSize={paginationParams.pageSize}
            totalElementsCount={totalPages}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
          <Grid container spacing={2}>
            {pendPaps.map((paper, index) => (
              <React.Fragment key={paper.data.id}>
                <Grid
                  item
                  xs={index % 4 === 0 || (index + 1) % 4 === 0 ? 7 : 5}
                >
                  <React.Fragment>
                    <Paper>
                      <CardContent>
                        <Typography variant="h5" component="div">
                          {paper.data.title}
                        </Typography>
                        <br />
                        <Typography variant="caption">Abstract:</Typography>
                        <Typography variant="body1">
                          {paper.data.abstract}
                        </Typography>
                        <br />
                        <Typography variant="caption" color="initial">
                          Keywords:{" "}
                        </Typography>
                        {paper?.data.keywords
                          .split(", ")
                          .map((keyword, index) => (
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
                        <Typography variant="caption" color="initial">
                          Uploaded on: <br />
                          {myDateTime.toDate(paper.data.publicationDate)}
                        </Typography>
                        <br />
                        <br />
                        <Stack direction="column" width={190} spacing={0.2}>
                          <Chip
                            label={`Total Reviews: ${paper.revCount}`}
                            color="primary"
                            variant="filled"
                          />
                          <Chip
                            label={`Positive Reviews: ${paper.posRevCount}`}
                            color="success"
                            variant="filled"
                          />
                          <Chip
                            label={`Negative Reviews: ${paper.negRevCount}`}
                            color="error"
                            variant="filled"
                          />
                        </Stack>
                        <br />
                        <DownloadPaperBtn paper={paper.data} />
                      </CardContent>
                      <CardActions>
                        <Button
                          size="large"
                          color="info"
                          variant="contained"
                          sx={{ width: "40%" }}
                        >
                          View Reviews
                        </Button>
                        {paper.revCount >= 3 &&
                        paper.posRevCount > paper.negRevCount ? (
                          <Button
                            size="large"
                            color="success"
                            variant="contained"
                            sx={{ width: "60%" }}
                            onClick={() => {
                              handlePubClick(paper.data.id);
                            }}
                          >
                            Publish
                          </Button>
                        ) : (
                          <Button
                            size="large"
                            color="secondary"
                            variant="contained"
                            disabled
                            sx={{ width: "60%" }}
                          >
                            Publish
                          </Button>
                        )}
                      </CardActions>
                    </Paper>
                  </React.Fragment>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
          <PaginationComponent
            pageNumber={paginationParams.pageNumber}
            pageSize={paginationParams.pageSize}
            totalElementsCount={totalPages}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </>
      )}
    </div>
  );
}

export default PendingPapersView;
