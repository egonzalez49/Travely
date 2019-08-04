import { UserModel } from '../models/UserModel';
import { LocationModel } from '../models/LocationModel';

//interface for a attraction
export interface IReview {
  id?: string;
  dateCreated?: Date;
  location: LocationModel;
  content: string;
  user: UserModel;
  rating: Number;
}
