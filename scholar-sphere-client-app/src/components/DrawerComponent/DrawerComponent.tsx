import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import InterestsIcon from "@mui/icons-material/Interests";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import RateReviewIcon from "@mui/icons-material/RateReview";
import BookIcon from "@mui/icons-material/Book";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ArticleIcon from '@mui/icons-material/Article';
import ReviewsIcon from "@mui/icons-material/Reviews";
import PeopleIcon from '@mui/icons-material/People';
import { useEffect, useState } from "react";
import { IUser } from "../../interfaces/IUser";
import userService from "../../services/userService";
import { userRole } from "../../types/userRole";

export default function DrawerComponent(props: {
  username: string | undefined;
}) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await userService.getUser();
        setUser(user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwtToken");

    window.location.href = "/";
  };

  const toPaperUpload = () => {
    window.location.href = "/paperupload";
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {user?.role === userRole.Author && (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={handleSignOut}>
                <ListItemIcon>
                  <BookIcon />
                </ListItemIcon>
                <ListItemText primary="My Papers" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={toPaperUpload}>
                <ListItemIcon>
                  <AddBoxIcon />
                </ListItemIcon>
                <ListItemText primary="Submit Paper" />
              </ListItemButton>
            </ListItem>
          </>
        )}
        {user?.role === userRole.Reviewer && (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={handleSignOut}>
                <ListItemIcon>
                  <ReviewsIcon />
                </ListItemIcon>
                <ListItemText primary="My Reviews" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleSignOut}>
                <ListItemIcon>
                  <InterestsIcon />
                </ListItemIcon>
                <ListItemText primary="My Fields" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => {window.location.href = '/ForReview'}}>
                <ListItemIcon>
                  <RateReviewIcon />
                </ListItemIcon>
                <ListItemText primary="For Review" />
              </ListItemButton>
            </ListItem>
          </>
        )}
        {user?.role === userRole.Administrator && (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={handleSignOut}>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="View Users" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleSignOut}>
                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText primary="View Papers" />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleSignOut}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Sign out" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <Button
        variant="contained"
        endIcon={<AccountBoxIcon />}
        onClick={toggleDrawer(true)}
      >
        {props.username}
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
        {DrawerList}
      </Drawer>
    </div>
  );
}
