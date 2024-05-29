import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import "../ReviewUploadModal/ReviewUploadModal.scss";
import React, { ChangeEvent, useEffect, useState } from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { ThumbDownAlt } from "@mui/icons-material";
import { ThumbDownAltOutlined } from "@mui/icons-material";
import reviewService from "../../services/reviewService";
import { IReview } from "../../interfaces/IReview";
import { IPaper } from "../../interfaces/IPaper";

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

function ReviewUploadModal(props: { paper: IPaper }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [comment, setComment] = useState<string>("");
  const [approved, setApproved] = useState<boolean>(false);

  const handleSubmit = () => {
    console.log(typeof approved);
    console.log(approved);
    const newReview: IReview = {
      paperId: props.paper.id,
      approved: approved,
      comments: comment,
    };
    reviewService.postReview(newReview).then((res) => {
      if (res.success == false) alert(res.message);
      else {
        alert(res.message);
        window.location.href = "/ForReview";
      }
    });
  };
  return (
    <div>
      <Button onClick={handleOpen} color="secondary" fullWidth variant="contained">Write Review</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mb: 2 }}>
            Write your Review for: <br /> <br />  <b>{props.paper.title}</b> <br />
          </Typography>
          <TextField
            id="commentTb"
            label="Comment"
            variant="outlined"
            color="primary"
            margin="none"
            fullWidth
            multiline
            maxRows={20}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <br />
          <br />
          <Typography variant="subtitle2" sx={{ textAlign: "right" }}>
            Do you approve of this paper?{" "}
          </Typography>
          <div className="like-dislike">
            <IconButton
              aria-label="Approve"
              onClick={() => {
                setApproved(true);
              }}
              color="default"
            >
              {approved ? (
                <CheckCircleIcon color="success" />
              ) : (
                <CheckCircleOutlineIcon />
              )}
            </IconButton>
            <IconButton
              aria-label="Disapprove"
              onClick={() => {
                setApproved(false);
              }}
            >
              {approved ? (
                <HighlightOffIcon />
              ) : (
                <CancelIcon color="error" />
              )}
            </IconButton>
          </div>
          <Button
            variant="contained"
            color="success"
            fullWidth
            onClick={handleSubmit}
          >
            Submit Review
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default ReviewUploadModal;
