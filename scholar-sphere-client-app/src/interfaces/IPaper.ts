export interface IPaper {
  id: number;
  title: string;
  abstract: string;
  keywords: string;
  publicationDate: Date;
  scientificField: string;
  forPublishing: boolean;
  pdfUrl: string;
}
