import { IServiceResponse } from "../interfaces/IServiceResponse";
import { IUser } from "../interfaces/IUser";
import axiosInstance from "./axiosInstance";

class UserService {
  public async updateUserExpertise(newExpertise: string) {
    try {
      const response = await axiosInstance.patch("/api/user/UpdateExpertise", newExpertise);

      return response.data;
    } catch (error) {
      console.error("Error updating user expertise:", error);
      throw error;
    }
  }

  public async getUser(): Promise<IUser> {
    const response = await axiosInstance.get("/api/user/GetUser");
    return response.data.data;
  }

  public async getPaperAuthor(paperId: number): Promise<IServiceResponse> {
    const response = await axiosInstance.get(
      `api/user/getPaperAuthor?paperId=${paperId}`
    );
    const serviceResponse: IServiceResponse = {
      data: response.data.data,
      success: response.data.success,
      message: response.data.message,
    };

    return serviceResponse;
  }
}

const userService = new UserService();

export default userService;
