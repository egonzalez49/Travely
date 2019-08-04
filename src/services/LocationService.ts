import { Service, ServerSettingsService, Inject } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { LocationModel } from '../models/LocationModel';
import { ILocation } from '../interfaces/Location';
import { Document } from 'mongoose';
import cloudinary from 'cloudinary';
const keys = require('../../config/keys');
import { BadRequest } from 'ts-httpexceptions';

cloudinary.config({
  cloud_name: keys.cloudName,
  api_key: keys.cloudKey,
  api_secret: keys.cloudSecret
});

@Service()
export class LocationService {
  constructor(
    private serverSettings: ServerSettingsService,
    @Inject(LocationModel) private model: MongooseModel<LocationModel>
  ) {}

  // create a new location
  // @params location   the user object (ILocation interface implement)
  // @return location   the location added to db
  public async createLocation(
    location: ILocation,
    imageFile
  ): Promise<LocationModel & Document> {
    let image = await cloudinary.v2.uploader.upload(imageFile.path, {
      folder: 'travely'
    });

    let newLocation = { ...location, imageUrl: image.url };

    const newLocationObject = new this.model(newLocation);
    await newLocationObject.save(err => {
      if (err) {
        throw err;
      }
    });

    return newLocationObject;
  }

  // get the top locations by rating
  // @return locations   top 6 locations by rating
  public async getTopLocations(): Promise<(LocationModel & Document)[]> {
    const locations = await this.model
      .find({})
      .sort({ rating: -1 })
      .limit(6)
      .exec();

    return locations;
  }

  // get location by id
  // @params location   the user object (ILocation interface implement)
  // @return location   the location added to db
  public async getLocation(id: string): Promise<LocationModel & Document> {
    const location = await this.model
      .findOne({ _id: id })
      .populate('attractions')
      .populate('reviews')
      .exec();

    return location;
  }
}
