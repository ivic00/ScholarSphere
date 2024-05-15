import { IPaper } from "../interfaces/IPaper";
import axiosInstance from "./axiosInstance";

class PaperService {
  public async getForReview(pageNumber: number, pageSize: number, scientificField:string){
    const response = await axiosInstance.get(`/api/Paper/GetAllPendingPapers?pageNumber=${pageNumber}&pageSize=${pageSize}&scientificField=${scientificField}`);
    return response.data.data;
  }


}

const userService = new PaperService();

export default userService;
