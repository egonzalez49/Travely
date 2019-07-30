//interface for a regular user
export interface IUser {
  id?: string;
  dateCreated?: Date;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
