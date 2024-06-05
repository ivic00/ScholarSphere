import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import "./Home.scss";
import Button from "@mui/material/Button";
import { Grid, Link } from "@mui/material";
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
        <Grid item xs={6}></Grid>
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
        <Grid item xs={6}></Grid>
      </Grid>
      <br />
    </div>
  );
}

export default Home;
