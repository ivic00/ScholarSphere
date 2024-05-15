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
}

const userService = new ReviewService();

export default userService;
