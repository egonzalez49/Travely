import { Format, Default, Property, Email } from '@tsed/common';
import { Model, ObjectID } from '@tsed/mongoose';
import bcrypt from 'bcrypt';

@Model()
export class UserModel {
  @ObjectID('id') // Or rename _id by id (for response sent to the client)
  _id: string;

  @Email()
  email: string;

  @Property()
  firstName: string;

  @Property()
  lastName: string;

  @Property()
  password: string;

  @Format('date-time')
  @Default(Date.now)
  dateCreated: Date = new Date();

  verifyPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}
