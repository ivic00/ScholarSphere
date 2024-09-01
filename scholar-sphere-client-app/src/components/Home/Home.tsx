import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import "./Home.scss";
import Button from "@mui/material/Button";
import backgroundImage from "../../assets/images/openart-image_B0aw6iYq_1725226782458_raw.png";
import { Box, Grid, Link } from "@mui/material";
function Home() {
  const [loginTrue, setLoginTrue] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      setLoginTrue(true);
    }
  }, []);
  return (
    <div className="home-page-div">
      <Grid container spacing={2}>
        <Box className="box-1" />
        <Box className="box-2" />
        <Box className="box-3" />
        <Grid item xs={6}>
          <Typography variant="h3" color="initial" className="text1">
            Show
          </Typography>
          <br />
          <Typography variant="h3" color="primary" className="text2">
            your research
          </Typography>
          <br />
          <Typography variant="h3" className="text3">
            to the world
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" className="text1" color={"primary"}>
            Discover a world of scientific research and innovation on our
            platform.
          </Typography>
          <Typography variant="h6" className="text2">
            Explore a comprehensive collection of papers, engage with
            cutting-edge studies, and contribute to the advancement of
            knowledge.
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <div className="buttons-div">
            <Button
              size="large"
              variant="contained"
              color="primary"
              href="/Feed"
            >
              Published papers
            </Button>
            {!loginTrue && (
              <>
                <Button
                  size="large"
                  variant="outlined"
                  color="primary"
                  sx={{ marginLeft: 2 }}
                >
                  SignUp
                </Button>
                <br />
                <Link
                  href="/SignIn"
                  color="primary"
                  className="align-text-right"
                >
                  or sign in if you're already a member
                </Link>
              </>
            )}
          </div>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" className="text3" color="secondary">
            Join us in shaping the future of science through collaboration and
            discovery!
          </Typography>
        </Grid>
      </Grid>
      <br />
    </div>
  );
}

export default Home;
