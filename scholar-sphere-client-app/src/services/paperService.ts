import { IAddPaper } from "../interfaces/IAddPaper";
import { IPaper } from "../interfaces/IPaper";
import { IServiceResponse } from "../interfaces/IServiceResponse";
import axiosInstance from "./axiosInstance";

class PaperService {
  public async getForReview(
    pageNumber: number,
    pageSize: number,
    scientificField: string
  ) {
    const response = await axiosInstance.get(
      `/api/Paper/GetAllPendingPapers?pageNumber=${pageNumber}&pageSize=${pageSize}&scientificField=${scientificField}`
    );
    return response.data.data;
  }
  public async gerUserPapers(): Promise<IServiceResponse> {
    const response = await axiosInstance.get("/api/Paper/GetAllFromAuthor");
    const serviceResponse: IServiceResponse = {
      data: response.data.data,
      message: response.data.message,
      success: response.data.success,
    };
    return serviceResponse;
  }

  public async addPaper(
    paper: IAddPaper
  ): Promise<IServiceResponse> {
    const formData = new FormData();
    formData.append("addPaperDTO", JSON.stringify(paper));

    const response = await axiosInstance.post("api/Paper/AddPaper", formData, {
      headers: {
        //Posto se salje i json objekat i fajl
        "Content-Type": "multipart/form-data",
      },
    });

    const serviceResponse: IServiceResponse = {
      data: response.data.data,
      message: response.data.message,
      success: response.data.success,
    };
    return serviceResponse;
  }

  public async updatePaper(paper: IAddPaper): Promise<IServiceResponse> {
    const response = await axiosInstance.put("api/Paper/UpdatePaper", paper);
    const serviceResponse: IServiceResponse = {
      data: response.data.data,
      message: response.data.message,
      success: response.data.success,
    };
    return serviceResponse;
  }
}

const userService = new PaperService();

export default userService;
