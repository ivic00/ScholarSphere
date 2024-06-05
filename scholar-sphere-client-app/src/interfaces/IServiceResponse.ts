import { IPaper } from "./IPaper";
import { IReview } from "./IReview";
import { IUser } from "./IUser";

export interface IServiceResponse<T = any>{
    data: T;
    success: boolean;
    message: string;
}