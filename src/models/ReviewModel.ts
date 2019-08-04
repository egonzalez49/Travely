import { Format, Default, Property, Minimum, Maximum } from '@tsed/common';
import { Model, Ref, ObjectID, VirtualRef } from '@tsed/mongoose';
import { LocationModel } from './LocationModel';
import { UserModel } from './UserModel';

@Model()
export class ReviewModel {
  @ObjectID('id') // Or rename _id by id (for response sent to the client)
  _id: string;

  @VirtualRef('location')
  location: VirtualRef<LocationModel>;

  @Ref(UserModel)
  user: Ref<UserModel>;

  @Property()
  content: string;

  @Minimum(0)
  @Maximum(5)
  @Default(0)
  rating: Number;

  @Format('date-time')
  @Default(Date.now)
  dateCreated: Date = new Date();
}
