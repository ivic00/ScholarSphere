export interface IUpdatePaper {
  id: number;
  title: string;
  abstract: string;
  keywords: string;
  scientificField: string;
  file?: File;
  forPublishing: false;
}
