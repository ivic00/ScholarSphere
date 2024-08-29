import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import "../ReviewUploadModal/ReviewUploadModal.scss";
import React, { ChangeEvent, Fragment, useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { ThumbDownAlt } from "@mui/icons-material";
import { ThumbDownAltOutlined } from "@mui/icons-material";
import reviewService from "../../services/reviewService";
import { IReview } from "../../interfaces/IReview";
import { IPaper } from "../../interfaces/IPaper";
import { IServiceResponse } from "../../interfaces/IServiceResponse";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
};

function ViewReviewsModal(props: { paper: IPaper }) {
  const [open, setOpen] = React.useState(false);

  const [reviews, setReviews] = useState<any[]>();
  const [serviceResponse, setServiceResponse] =
    useState<IServiceResponse<IReview[]>>();

  const handleOpen = () => {
    setOpen(true);
    getReviews();
    console.log(serviceResponse);
  };
  const handleClose = () => setOpen(false);

  async function getReviews() {
    setServiceResponse(await reviewService.getAllPaperReviews(props.paper.id));
  }

  return (
    <>
      <Button
        size="large"
        color="info"
        variant="contained"
        fullWidth
        onClick={handleOpen}
      >
        View Reviews
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h5" color="initial">
            Reviews for: <br />
            {props.paper.title}
          </Typography>
          <br />
          {serviceResponse?.success ? (
            serviceResponse.data.map((review, index) => (
              <React.Fragment key={index}>
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
              </React.Fragment>
            ))
          ) : (
            <Typography variant="subtitle1" color="initial">{serviceResponse?.message}</Typography>
          )}
        </Box>
      </Modal>
    </>
  );
}

export default ViewReviewsModal;
