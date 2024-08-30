import {
  CardActions,
  CardContent,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { IReview } from "../../interfaces/IReview";
import { IServiceResponse } from "../../interfaces/IServiceResponse";
import reviewService from "../../services/reviewService";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import DownloadPaperBtn from "../DownloadPaperBtn/DownloadPaperBtn";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import mainTheme from "../../Themes/mainTheme";

function MyReviews() {
  const [serviceResponse, setServiceResponse] =
    useState<IServiceResponse<IReview[]>>();

  async function getReviews() {
    setServiceResponse(await reviewService.getAllReviewsByUser());
  }

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <Grid container spacing={2} justifyContent={"center"}>
      {serviceResponse?.success ? (
        serviceResponse.data.map((review, index) => (
          <Grid item xs={12} md={6} xl={4}>
            <Paper
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <CardContent>
                <Accordion variant="outlined">
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="paper-content"
                    id="paper-title"
                  >
                    <Typography variant="h6" color="white">
                      {review.paper?.title}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="subtitle2" color="white">
                      Abstract:
                    </Typography>
                    <Typography variant="caption" color="white">
                      {review.paper?.abstract}
                    </Typography>
                  </AccordionDetails>
                  {review.paper && <DownloadPaperBtn paper={review.paper} />}
                </Accordion>
              </CardContent>
              <CardContent style={{ flex: "1" }}>
                <Typography variant="subtitle2" color="initial">Your review:</Typography>
                <Typography variant="body1" color="initial">
                  {review.comments}
                </Typography>
                <Box alignContent={"end"}>
                  {review.approved ? (
                    <Box>
                      {" "}
                      <CheckCircleIcon color="success" />
                    </Box>
                  ) : (
                    <CancelIcon color="error" />
                  )}
                </Box>
                <br />
                <br />
              </CardContent>
            </Paper>
          </Grid>
        ))
      ) : (
        <Typography variant="subtitle1" color="initial">
          {serviceResponse?.message}
        </Typography>
      )}
    </Grid>
  );
}

export default MyReviews;
