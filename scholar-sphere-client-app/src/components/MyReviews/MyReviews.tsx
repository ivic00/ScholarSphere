import { CardActions, CardContent, Grid, Paper, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IReview } from "../../interfaces/IReview";
import { IServiceResponse } from "../../interfaces/IServiceResponse";
import reviewService from "../../services/reviewService";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

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
                <CardActions>
                    <Button variant="text" color="secondary">
                      View Paper
                    </Button>
                </CardActions>
              <CardContent style={{ flex: "1" }}>
                <Typography variant="caption" color="initial">
                  {review.reviewer?.firstName} {review.reviewer?.lastName}
                </Typography>
                <Typography variant="body1" color="initial">
                  {review.comments}
                </Typography>
                {review.approved ? (
                  <CheckCircleIcon color="success" />
                ) : (
                  <CancelIcon color="error" />
                )}
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
