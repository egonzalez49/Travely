import { Service, ServerSettingsService, Inject } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { ReviewModel } from '../models/ReviewModel';
import { IReview } from '../interfaces/Review';
import { Document } from 'mongoose';
import { BadRequest } from 'ts-httpexceptions';
import { LocationModel } from '../models/LocationModel';
import { UserModel } from '../models/UserModel';

@Service()
export class ReviewService {
  constructor(
    private serverSettings: ServerSettingsService,
    @Inject(ReviewModel) private model: MongooseModel<ReviewModel>,
    @Inject(LocationModel) private locationModel: MongooseModel<LocationModel>,
    @Inject(UserModel) private userModel: MongooseModel<UserModel>
  ) {}

  // create a new review for a location
  // @params review   the review object (IReview interface implement)
  // @return review   the review added to db
  public async createReview(review: IReview): Promise<ReviewModel & Document> {
    const newReviewObject = new this.model(review);
    await newReviewObject.save(err => {
      if (err) {
        throw err;
      }
    });
    await this.locationModel
      .findByIdAndUpdate(
        review.location,
        { $push: { reviews: newReviewObject._id } },
        { new: true, upsert: true }
      )
      .exec();

    await this.userModel
      .findByIdAndUpdate(
        review.user,
        { $push: { reviews: newReviewObject._id } },
        { new: true, upsert: true }
      )
      .exec();

    return newReviewObject;
  }

  // edit an existing review
  // @params review   the review object (IReview interface implement)
  // @return review   the review added to db
  public async editReview(review: IReview): Promise<ReviewModel & Document> {
    const newReviewObject = await this.model
      .findOneAndUpdate({ _id: review.id }, review)
      .exec();
    // await newAttractionObject.save(err => {
    //   if (err) {
    //     throw err;
    //   }
    // });

    return newReviewObject;
  }

  // get the reviews for a location
  // @return reviews  5 reviews based on page
  public async getReviews(id: string, page: number) {
    var amount = 0;
    const reviews = await this.model
      .find({ location: id })
      .limit(5)
      .populate('user')
      .skip(5 * page)
      .exec();

    const totalReviews = await this.model.find({ location: id });

    amount = totalReviews.length;

    const newReviews = { amount: amount, reviews: reviews };

    return newReviews;
  }
}
