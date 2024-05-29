import React from "react";
import Button from "@mui/material/Button";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import IconButton from "@mui/material/IconButton";
import { Icon, debounce } from "@mui/material";
import { IPaper } from "../../interfaces/IPaper";
import paperService from "../../services/paperService";

function DownloadPaperBtn(props: { paper: IPaper }) {
    const handleClick = debounce(() => {
        paperService.DownloadPaper(props.paper);
      }, 1000);
  return (
    <Button
      aria-label=""
      variant="contained"
      color="primary"
      onClick={handleClick}
      fullWidth
    >
      <PictureAsPdfIcon /> Download Research Paper
    </Button>
  );
}

export default DownloadPaperBtn;
