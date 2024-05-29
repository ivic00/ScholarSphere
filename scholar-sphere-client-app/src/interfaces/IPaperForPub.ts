import { IPaper } from "./IPaper";

export interface IPaperForPub{
    data: IPaper;
    revCount: number;
    posRevCount: number;
    negRevCount: number
}