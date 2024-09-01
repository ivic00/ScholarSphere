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
  InputLabel,
  Link,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { IRegisterUser } from "../../interfaces/IRegisterUser";
import axiosInstance from "../../services/axiosInstance";
import { IServiceResponse } from "../../interfaces/IServiceResponse";
import { userRole } from "../../types/userRole";
import axios from "axios";
import { useAuthContext } from "../../contexts/AuthContext";

function RegisterForm() {
  const { register, authResponse } = useAuthContext();
  const [role, setRole] = useState<userRole>(userRole.Author);

  const [userName, setUserName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [sciFieldExpertise, setSciFieldExpertise] = useState<string[]>([]);
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [expertiseStr, setExpertiseStr] = useState<string>("");

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

  const handleExpertiseChange = (event: SelectChangeEvent<string[]>) => {
    setSelectedExpertise(event.target.value as string[]);
  };

  function arrayToString(fields: string[]): string {
    return fields.join(";") + ";";
  }

  useEffect(() => {
    console.log(selectedExpertise);
  }, [selectedExpertise]);

  const handleRegister = async () => {
    register(userName, firstName, lastName, password, role, arrayToString(selectedExpertise))
  };

  useEffect(() => {
    if (authResponse?.message) {
      localStorage.setItem("jwtToken", authResponse.data);
      if (localStorage.getItem("jwtToken")) {
        window.location.href = "/Feed";
      }
    }
  }, [authResponse]);

  useEffect(() => {
    const fetchExpertise = async () => {
      try {
        const response = await axiosInstance.get("api/ScientificFields/fields");
        setSciFieldExpertise(response.data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchExpertise();
  }, []);

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
          <Grid item xs={12}>
            <InputLabel id="sciFieldGroupSelect">
              Scientific Field Group
            </InputLabel>
            <br />
            <br />
            <InputLabel id="sciFieldSelect">Your Expertise</InputLabel>
            <Select
              labelId="sciFieldSelect"
              id="demo-simple-select-standard"
              value={selectedExpertise}
              onChange={handleExpertiseChange}
              label="Scientific Field Group"
              multiple
              fullWidth
            >
              {sciFieldExpertise.map((group, index) => (
                <MenuItem key={index} value={group}>
                  {group.replace(/([A-Z])/g, " $1").trim()}
                </MenuItem>
              ))}
            </Select>
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
