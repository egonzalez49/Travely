import { Format, Default, Property, Minimum, Maximum } from '@tsed/common';
import { Model, ObjectID, Ref, VirtualRef, VirtualRefs } from '@tsed/mongoose';
import { AttractionModel } from './AttractionModel';
import { ReviewModel } from './ReviewModel';

@Model()
export class LocationModel {
  @ObjectID('id') // Or rename _id by id (for response sent to the client)
  _id: string;

  @Property()
  city: string;

  @Property()
  country: string;

  @Property()
  description: string;

  @Property()
  imageUrl: string;

  @Minimum(0)
  @Maximum(5)
  @Default(0)
  rating: Number;

  @VirtualRef('AttractionModel')
  attractions: VirtualRefs<AttractionModel>;

  @VirtualRef('ReviewModel')
  reviews: VirtualRefs<ReviewModel>;

  @Format('date-time')
  @Default(Date.now)
  dateCreated: Date = new Date();
}
