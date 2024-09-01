import React, { createContext, useContext, useState, ReactNode } from "react";
import { IUser } from "../interfaces/IUser";

interface IAuthContext {
  user: IUser | null;
}

const AuthContext = createContext<IAuthContext>(undefined!);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser | null>(null);

  const value = {
    user,
    setUser,
  };

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext)!;
