import { AttractionModel } from '../models/AttractionModel';
import { ReviewModel } from '../models/ReviewModel';

//interface for location
export interface ILocation {
  id?: string;
  dateCreated?: Date;
  city: string;
  country: string;
  rating: Number;
  imageUrl: string;
  description: string;
  attractions: AttractionModel[];
  reviews: ReviewModel[];
}
