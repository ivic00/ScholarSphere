import axios from "axios";
import { IAddPaper } from "../interfaces/IAddPaper";
import { IPaper } from "../interfaces/IPaper";
import { IServiceResponse } from "../interfaces/IServiceResponse";
import axiosInstance from "./axiosInstance";
import { saveAs } from "file-saver";

class PaperService {
  public async publishPaper(paperId: number): Promise<IServiceResponse> {
    const response = await axiosInstance.put('/api/Paper/PublishPaper?paperId=' + paperId);
    const serviceResponse: IServiceResponse = {
      data: response.data.data,
      message: response.data.message,
      success: response.data.success
    }

    return serviceResponse;
  }

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

  public async addPaper(paper: IAddPaper): Promise<IServiceResponse> {
    const formData = new FormData();

    formData.append("title", paper.title);
    formData.append("abstract", paper.abstract);
    formData.append("scientificField", paper.scientificField);
    formData.append("keywords", paper.keywords);
    formData.append("pdfURL", paper.pdfURL);

    /*const fileBlob = new Blob([paper.file], {type: "application/pdf"});
     formData.append("file", fileBlob);*/
    formData.append("file", paper.file, paper.file.name);

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

    console.log(formData);
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

  public async DownloadPaper(paper: IPaper) {
    //npm install file-saver
    const paperId = paper.id;
    const paperTitle = paper.title;
    try {
      await axiosInstance
        .get("api/Paper/DownloadPaper", {
          params: { paperId },
          responseType: "blob",
        })
        .then((res) => {
          let fileName = paperTitle + ".pdf";

          //zapocni file download koristeci file-server
          saveAs(res.data, fileName);

          const serviceResponse: IServiceResponse = {
            data: null,
            message: "File downloaded successfully",
            success: true,
          };
          return serviceResponse;
        });
    } catch (error) {
      const serviceResponse: IServiceResponse = {
        data: null,
        message: `Failed to download file: ${error}`,
        success: false,
      };
      return serviceResponse;
    }
  }

  public async GetAllPendingPaginated(pageNumber: number, pageSize: number): Promise<IServiceResponse>{
    const response = await axiosInstance.get(`api/Paper/GetAllForPublishing?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    const serviceResponse: IServiceResponse = {
      data: response.data.data,
      message: response.data.message,
      success: response.data.success,
    }

    return serviceResponse;
  }
}

const userService = new PaperService();

export default userService;
