import { IUser } from "./IUser";

export interface IReview {
  paperId: number;
  approved: boolean;
  comments: string;
  reviewer?: IUser;
}
