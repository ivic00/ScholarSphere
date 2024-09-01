import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { IUser } from "../interfaces/IUser";
import axiosInstance from "../services/axiosInstance";
import { userRole } from "../types/userRole";
import { IServiceResponse } from "../interfaces/IServiceResponse";
import { Box, Snackbar } from "@mui/material";
import userService from "../services/userService";

interface IAuthContext {
  user: IUser | null;
  token: string | undefined;
  register: (
    userName: string,
    firstName: string,
    lastName: string,
    password: string,
    role: userRole,
    expertise: string
  ) => void;
  signOut: () => void;
  authResponse: IServiceResponse | null;
}

const AuthContext = createContext<IAuthContext>(undefined!);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string>();

  const value = {
    user,
    setUser,
  };

  const [authResponse, setAuthResponse] = useState<IServiceResponse | null>(
    null
  );

  useEffect(() => {
    if (authResponse?.message) {
      localStorage.setItem("jwtToken", authResponse.data);
      if (localStorage.getItem("jwtToken")) {
        window.location.href = "/Feed";
      }
    }

    setToken(localStorage.getItem("jwtToken")?.toString());
  }, [authResponse]);

  useEffect(() => {
    const fetchUser = async () => setUser(await userService.getUser());
    if (token) {
      fetchUser();
    }
  }, [token]);

  const signOut = () => {
    setUser(null);
    setToken(undefined);
    localStorage.removeItem("jwtToken");
    window.location.href = "/";
  };

  const register = async (
    userName: string,
    firstName: string,
    lastName: string,
    password: string,
    role: userRole,
    selectedExpertise: string
  ) => {
    if (!userName || !firstName || !lastName || !password || !role) {
      alert("please fill all informations and select role");
    } else {
      try {
        const response = await axiosInstance.post("/Auth/Register", {
          userName,
          firstName,
          lastName,
          password,
          role,
          expertise: selectedExpertise,
        });
        console.log("sent response");
        setAuthResponse(response.data);
      } catch (error: any) {
        console.error("Error registering user:", error);
        setAuthResponse(error.data);
      }
    }
  };

  function arrayToString(fields: string[]): string {
    return fields.join(";") + ";";
  }

  return (
    <AuthContext.Provider
      value={{ user, register, authResponse, token, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext)!;
