import { Format, Default, Property } from '@tsed/common';
import { Model, Ref, VirtualRef, ObjectID } from '@tsed/mongoose';
import { LocationModel } from './LocationModel';

@Model()
export class AttractionModel {
  @ObjectID('id') // Or rename _id by id (for response sent to the client)
  _id: string;

  @Ref('location')
  location: Ref<LocationModel>;

  @Property()
  name: string;

  @Property()
  description: string;

  @Property()
  imageUrl: string;

  @Format('date-time')
  @Default(Date.now)
  dateCreated: Date = new Date();
}
