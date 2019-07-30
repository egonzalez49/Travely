import {
  OverrideMiddleware,
  AuthenticatedMiddleware,
  EndpointInfo,
  Next,
  Request,
  EndpointMetadata,
  IMiddleware
} from '@tsed/common';
import { Forbidden } from 'ts-httpexceptions';
import * as Express from 'express';

@OverrideMiddleware(AuthenticatedMiddleware)
export class PassportAuth implements IMiddleware {
  public use(
    @EndpointInfo() endpoint: EndpointMetadata,
    @Request() request: Express.Request,
    @Next() next: Express.NextFunction
  ) {
    // next is optional here

    // options given to the @Authenticated decorator
    const options = endpoint.get(AuthenticatedMiddleware) || {};
    // options => {role: 'admin'}

    // if (!request.isAuthenticated()) {
    //   // passport.js
    //   throw new Forbidden('Forbidden');
    // }

    next();
  }
}
