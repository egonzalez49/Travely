'use strict';

import { Get, Post, Req, Res, Controller, PathParams } from '@tsed/common';
import * as Express from 'express';
import { LocationService } from '../services/LocationService';

@Controller('/location')
export class LocationCtrl {
  constructor(private locationService: LocationService) {}

  @Post()
  async createLocation(
    @Req() request: Express.Request & { files: any },
    @Res() response: Express.Response
  ) {
    const imageFile = Object.values(request.files)[0];
    await this.locationService.createLocation(request.body, imageFile);
    response.status(200).json({ message: 'Successfully added location.' });
  }

  @Get()
  async getTopLocations(
    @Req() request: Express.Request,
    @Res() response: Express.Response
  ) {
    const locations = await this.locationService.getTopLocations();
    response.send(locations);
  }

  @Get('/:id')
  async getLocation(
    @PathParams('id') id: string,
    @Req() request: Express.Request,
    @Res() response: Express.Response
  ) {
    const location = await this.locationService.getLocation(id);
    response.send(location);
  }
}
