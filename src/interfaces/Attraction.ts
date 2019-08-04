import { LocationModel } from '../models/LocationModel';

//interface for a attraction
export interface IAttraction {
  id?: string;
  dateCreated?: Date;
  name: string;
  location: LocationModel;
  imageUrl: string;
  description: string;
}
