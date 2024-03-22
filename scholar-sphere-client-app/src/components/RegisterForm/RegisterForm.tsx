import React, { useEffect, useState } from "react";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { IRegisterUser } from "../../interfaces/IRegisterUser";
import axiosInstance from "../../services/axiosInstance";
import { IServiceResponse } from "../../interfaces/IServiceResponse";
import { userRole } from "../../types/userRole";

function RegisterForm() {
  const [role, setRole] = useState<userRole>();

  const [userName, setUserName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [serviceResponse, setServiceResponse] = useState<IServiceResponse>();

  /*ovde definisem tip setState funkcije da bih poslao drugoj funkciji kao param,
    sto znaci da ne moram za svaki Textfield da pravim pojedinacnu funkciju*/
  type SetStateFunction<T> = React.Dispatch<React.SetStateAction<T>>;

  const handleRoleChange = (
    event: React.MouseEvent<HTMLElement>,
    role: userRole
  ) => {
    setRole(role);
  };

  const handleTextChange =
    (setText: SetStateFunction<string>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setText(event.target.value);
    };

  const handleRegister = async () => {
    if (!userName || !firstName || !lastName || !password || !role) {
      alert("please fill all informations and select role");
    } else {
      try {
        console.log(userName + firstName + lastName + password);
        const response = await axiosInstance.post("/Auth/Register", {
          userName,
          firstName,
          lastName,
          password,
          role,
        });
        setServiceResponse(response.data);
      } catch (error: any) {
        console.error("Error registering user:", error);
        setServiceResponse(error.response.data);
      }
    }
  };

  useEffect(() => {
    if (serviceResponse?.message) {
      alert(serviceResponse.message);

      //ovde se preko JWT automatski loguje korisnik
      localStorage.setItem("jwtToken", serviceResponse.data);
      if (localStorage.getItem("jwtToken")) {
        window.location.href = "/Feed";
      }
    }
  }, [serviceResponse]);

  return (
    <div>
      <Box component="form" noValidate sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} textAlign="center">
            <Avatar sx={{ bgcolor: "green" }}>
              <AppRegistrationIcon />
            </Avatar>
            <br />
            <Typography variant="h4" color="inherit">
              Register
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              value={firstName}
              onChange={handleTextChange(setFirstName)}
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              value={lastName}
              onChange={handleTextChange(setLastName)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoComplete="username"
              value={userName}
              onChange={handleTextChange(setUserName)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={handleTextChange(setPassword)}
            />
          </Grid>
          <Grid item xs={12}>
            <ToggleButtonGroup
              fullWidth
              color="primary"
              value={role}
              exclusive
              onChange={handleRoleChange}
              aria-label="Platform"
            >
              <ToggleButton value={userRole.Author}>Author</ToggleButton>
              <ToggleButton value={userRole.Reviewer}>Reviewer</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
        <Button
          /*type="submit"*/
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleRegister}
        >
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/SignIn" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
      <br />
    </div>
  );
}

export default RegisterForm;
