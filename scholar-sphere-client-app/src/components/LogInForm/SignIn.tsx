import { TextField, Button, Avatar } from "@mui/material";
import React, { useState } from "react";
import { backendLink } from "../../config";
import axios from "axios";
import "./SignIn.scss";
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const SignIn = ({
  setAuthenticated,
}: {
  setAuthenticated: (value: boolean) => void;
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSignIn = async () => {
    try {
      const response = await axios.post("http://localhost:5185/Auth/Login", {
        username,
        password,
      });

      const token = response.data.data;
      localStorage.setItem("jwtToken", token);

      window.location.href = "/Feed";
    } catch (error: any) {
      console.error("Error signing in:", error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="sign-in-div">
      <div className="input-div">
        <Avatar className="person-icon">
          <AccountBoxIcon className="person-icon-icon"/>
        </Avatar>
        <br />
        <TextField
          id="usernameTF"
          label="Username"
          variant="outlined"
          value={username}
          onChange={handleUsernameChange}
          fullWidth
        />
        <br />
        <br />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={handlePasswordChange}
          fullWidth
        />
        <br />
        <br />
        <Button variant="contained" fullWidth onClick={handleSignIn}>
          Sign in
        </Button>
      </div>
    </div>
  );
};

export default SignIn;
