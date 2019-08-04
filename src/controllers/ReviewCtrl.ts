'use strict';

import {
  Get,
  Post,
  Patch,
  Req,
  Res,
  Controller,
  PathParams
} from '@tsed/common';
import * as Express from 'express';
var mongoose = require('mongoose');
import { ReviewService } from '../services/ReviewService';

@Controller('/review')
export class ReviewCtrl {
  constructor(private reviewService: ReviewService) {}

  @Post()
  async createReview(
    @Req() request: Express.Request,
    @Res() response: Express.Response
  ) {
    const review = {
      ...request.body,
      location: mongoose.Types.ObjectId(request.body.location),
      user: request.user.id
    };
    await this.reviewService.createReview(review);
    response.status(200).json({ message: 'Successfully added review.' });
  }

  @Get('/location/:id/:page')
  async getAttractions(
    @PathParams('id') id: string,
    @PathParams('page') page: string,
    @Req() request: Express.Request,
    @Res() response: Express.Response
  ) {
    const reviews = await this.reviewService.getReviews(
      mongoose.Types.ObjectId(id),
      Number(page)
    );

    response.send(reviews);
  }
}
