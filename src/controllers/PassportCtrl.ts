'use strict';

import {
  BodyParams,
  Get,
  Post,
  Req,
  Required,
  Res,
  Controller
} from '@tsed/common';
import * as Express from 'express';
import Passport from 'passport';
import { IUser } from '../interfaces/User';

@Controller('/auth')
export class PassportCtrl {
  @Post('/login')
  async login(
    @Required() @BodyParams('email') email: string,
    @Required() @BodyParams('password') password: string,
    @Req() request: Express.Request,
    @Res() response: Express.Response
  ) {
    return new Promise<IUser>((resolve, reject) => {
      Passport.authenticate('login', (err, user: IUser) => {
        if (err) {
          reject(err);
        }

        request.logIn(user, err => {
          if (err) {
            reject(err);
          } else {
            resolve(user);
          }
        });
      })(request, response, () => {});
    });
  }

  @Post('/signup')
  async signup(
    @Required() @BodyParams('email') email: string,
    @Required() @BodyParams('password') password: string,
    @Required() @BodyParams('firstName') firstName: string,
    @Required() @BodyParams('lastName') lastName: string,
    @Req() request: Express.Request,
    @Res() response: Express.Response
  ) {
    return new Promise((resolve, reject) => {
      Passport.authenticate('signup', (err, user: IUser) => {
        if (err) {
          return reject(err);
        }

        if (!user) {
          return reject(!!err);
        }

        request.logIn(user, err => {
          console.log(request.user);
          if (err) {
            return reject(err);
          }
          resolve(user);
        });
      })(request, response, () => {});
    });
  }

  @Get('/logout')
  public logout(
    @Req() request: Express.Request,
    @Res() response: Express.Response
  ): string {
    request.logout();
    return 'Disconnected';
  }

  @Get('/current_user')
  public getUser(
    @Req() request: Express.Request,
    @Res() response: Express.Response
  ): void {
    response.send(request.user);
  }
}
