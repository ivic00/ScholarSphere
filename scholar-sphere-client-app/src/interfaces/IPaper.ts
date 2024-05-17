export interface IPaper {
  id: number;
  title: String;
  abstract: String;
  keywords: String;
  publicationDate: Date;
  scientificField: String;
  forPublishing: boolean;
  pdfUrl: String;
}
