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
  styled,
} from "@mui/material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import React, { useEffect, useState } from "react";
import paperService from "../../services/paperService";
import { IPaper } from "../../interfaces/IPaper";
import "../MyPapersView/MyPapersView.scss";
import { SchoolOutlined } from "@mui/icons-material";
import EditPaperModal from "../EditPaperModal/EditPaperModal";
import DownloadPaperBtn from "../DownloadPaperBtn/DownloadPaperBtn";
import ViewReviewsModal from "../ViewReviewsModal/ViewReviewsModal";

function MyPapersView() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const [papers, setPapers] = useState<IPaper[]>([]);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    paperService.gerUserPapers().then((res) => {
      setPapers(res.data);
    });
  }, []);

  useEffect(() => {
    setCount(papers?.length);
  }, [papers]);

  return (
    <div>
      <Grid container spacing={2} justifyContent={"center"}>
        {papers.map((paper) => (
          <React.Fragment key={paper.id}>
            <Grid
              item
              xs={12}
              md={6}
              xl={4}
              style={{ display: "flex", alignItems: "stretch" }}
            >
              <React.Fragment>
                <Paper
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <CardContent style={{ flex: "1 0 auto" }}>
                    {paper.forPublishing ? (
                      <Alert
                        iconMapping={{
                          success: <SchoolOutlined fontSize="inherit" />,
                        }}
                      >
                        <AlertTitle>Published</AlertTitle>
                        This paper has been peer reviewed and published
                      </Alert>
                    ) : (
                      <Alert
                        severity="warning"
                        iconMapping={{
                          warning: (
                            <AccessTimeOutlinedIcon fontSize="inherit" />
                          ),
                        }}
                      >
                        <AlertTitle>Pending</AlertTitle>
                        This paper needs to be peer reviewed before publishing
                      </Alert>
                    )}
                    <Typography variant="h5" component="div">
                      {paper.title}
                    </Typography>
                    <br />
                    <Typography variant="caption">Abstract:</Typography>
                    <Typography variant="body1">{paper.abstract}</Typography>
                    <br />
                    <Typography variant="caption" color="initial">
                      Keywords:{" "}
                    </Typography>
                    {paper?.keywords.split(", ").map((keyword, index) => (
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
                  </CardContent>
                  <CardContent>
                    <Typography variant="caption" color="initial">
                      Published on:{" "}
                      {new Date(paper.publicationDate).toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <DownloadPaperBtn paper={paper} />
                  </CardActions>
                  <CardActions>
                    <ViewReviewsModal paper={paper} />
                    {!paper.forPublishing && (
                      <EditPaperModal paperForEdit={paper} />
                    )}
                  </CardActions>
                </Paper>
              </React.Fragment>
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
    </div>
  );
}

export default MyPapersView;
