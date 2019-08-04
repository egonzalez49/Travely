'use strict';

import {
  Get,
  Post,
  Patch,
  Req,
  Res,
  Controller,
  PathParams,
  Put
} from '@tsed/common';
import * as Express from 'express';
import { AttractionService } from '../services/AttractionService';

@Controller('/attraction')
export class AttractionCtrl {
  constructor(private attractionService: AttractionService) {}

  @Post()
  async createAttraction(
    @Req() request: Express.Request & { files: any },
    @Res() response: Express.Response
  ) {
    const imageFile = Object.values(request.files)[0];
    await this.attractionService.createAttraction(request.body, imageFile);
    response.status(200).json({ message: 'Successfully added attraction.' });
  }

  @Patch('/:id')
  async editAttraction(
    @PathParams('id') id: string,
    @Req() request: Express.Request & { files: any },
    @Res() response: Express.Response
  ) {
    const imageFile = Object.values(request.files)[0];
    await this.attractionService.editAttraction(request.body, imageFile);
    response.status(200).json({ message: 'Successfully edited attraction.' });
  }

  // @Get('/location/:id')
  // async getAttractions(
  //   @PathParams('id') id: string,
  //   @Req() request: Express.Request,
  //   @Res() response: Express.Response
  // ) {
  //   const attractions = await this.attractionService.getAttractions(id);
  //   response.send(attractions);
  // }
}
