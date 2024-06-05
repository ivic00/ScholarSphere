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
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
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

  useEffect(() => {}, [open]);

  async function getReviews() {
    setServiceResponse(await reviewService.getAllPaperReviews(props.paper.id));
  }

  return (
    <>
      <Button
        size="large"
        color="info"
        variant="contained"
        onClick={handleOpen}
        sx={{ width: "40%" }}
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
          {serviceResponse?.data.map((review, index) => (
            <React.Fragment>
              <Typography key={index} variant="caption" color="initial">{review.reviewer?.firstName} {review.reviewer?.lastName}</Typography>
              <Typography key={index+1} variant="body1" color="initial">
                {review.comments}
              </Typography>
              {review.approved ? <CheckCircleIcon key={index+2} color="success" /> : <CancelIcon key={index+3} color="error"/>}
              <br />
              <br />
            </React.Fragment>
          ))}
        </Box>
      </Modal>
    </>
  );
}

export default ViewReviewsModal;
