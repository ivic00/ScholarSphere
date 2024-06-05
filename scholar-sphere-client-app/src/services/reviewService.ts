import { IPaper } from "../interfaces/IPaper";
import { IReview } from "../interfaces/IReview";
import { IServiceResponse } from "../interfaces/IServiceResponse";
import axiosInstance from "./axiosInstance";

class ReviewService {
  public async postReview(newReview: IReview): Promise<IServiceResponse> {
    const response = await axiosInstance.post(
      `/api/Review/AddReview`,
      newReview
    );
    return response.data;
  }

  public async getAllPaperReviews(paperId: number): Promise<IServiceResponse<IReview[]>> {
    const response = await axiosInstance.get(
      "/api/Review/GetAllPaperReviews?paperId=" + paperId
    );

    const serviceResponse: IServiceResponse = {
      data: response.data.data,
      message: response.data.message,
      success: response.data.success,
    };
    return serviceResponse;
  }
}

const userService = new ReviewService();

export default userService;
