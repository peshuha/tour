import {TourType} from "./i-tour-filter";

export interface ITour {
  name: string;
  description: string;
  tourOperator: string;
  price: string;
  img?: string;
  id: string;
  type?: TourType;
}
