import { Service, ServerSettingsService, Inject } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { AttractionModel } from '../models/AttractionModel';
import { IAttraction } from '../interfaces/Attraction';
import { Document } from 'mongoose';
import cloudinary from 'cloudinary';
const keys = require('../../config/keys');
import { BadRequest } from 'ts-httpexceptions';
import { LocationModel } from '../models/LocationModel';

cloudinary.config({
  cloud_name: keys.cloudName,
  api_key: keys.cloudKey,
  api_secret: keys.cloudSecret
});

@Service()
export class AttractionService {
  constructor(
    private serverSettings: ServerSettingsService,
    @Inject(AttractionModel) private model: MongooseModel<AttractionModel>,
    @Inject(LocationModel) private locationModel: MongooseModel<LocationModel>
  ) {}

  // create a new attraction for a location
  // @params attraction   the attraction object (IAttraction interface implement)
  // @return attraction   the attraction added to db
  public async createAttraction(
    attraction: IAttraction,
    imageFile
  ): Promise<AttractionModel & Document> {
    let newAttraction = attraction;

    if (imageFile) {
      let image = await cloudinary.v2.uploader.upload(imageFile.path, {
        folder: 'travely'
      });

      newAttraction = { ...newAttraction, imageUrl: image.url };
    }

    const newAttractionObject = new this.model(newAttraction);
    await newAttractionObject.save(err => {
      if (err) {
        throw err;
      }
    });
    await this.locationModel
      .findByIdAndUpdate(
        newAttraction.location,
        { $push: { attractions: newAttractionObject._id } },
        { new: true, upsert: true }
      )
      .exec();

    return newAttractionObject;
  }

  // edit an existing attraction
  // @params attraction   the attraction object (IAttraction interface implement)
  // @return attraction   the attraction added to db
  public async editAttraction(
    attraction: IAttraction,
    imageFile
  ): Promise<AttractionModel & Document> {
    let newAttraction = attraction;

    if (imageFile) {
      let image = await cloudinary.v2.uploader.upload(imageFile.path, {
        folder: 'travely'
      });

      newAttraction = { ...newAttraction, imageUrl: image.url };
    }

    const newAttractionObject = await this.model
      .findOneAndUpdate({ _id: attraction.id }, newAttraction)
      .exec();
    // await newAttractionObject.save(err => {
    //   if (err) {
    //     throw err;
    //   }
    // });

    return newAttractionObject;
  }

  // get the attractions for a location
  // @return attractions  top 3 attractions
  public async getAttractions(
    id: string
  ): Promise<(AttractionModel & Document)[]> {
    const attractions = await this.model
      .find({ location: id })
      .limit(3)
      .exec();

    return attractions;
  }
}
