import { IUser } from "../interfaces/IUser";
import axiosInstance from "./axiosInstance";

class UserService {
  public async getUser(): Promise<IUser> {
    const response = await axiosInstance.get("/api/user/GetUser");
    return response.data.data;
  }

}

const userService = new UserService();

export default userService;
