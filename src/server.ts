import {
  ServerLoader,
  ServerSettings,
  GlobalAcceptMimesMiddleware
} from '@tsed/common';
import '@tsed/mongoose';
const express = require('express');
// const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const formData = require('express-form-data');
const Path = require('path');

const keys = require('../config/keys');

@ServerSettings({
  rootDir: Path.resolve(__dirname),
  acceptMimes: ['application/json'],
  httpPort: 'localhost:5000',
  httpsPort: false,
  mongoose: {
    url: keys.mongoURI,
    connectionOptions: {
      dbName: 'data',
      useNewUrlParser: true
    }
  }
})
export class Server extends ServerLoader {
  public $onMountingMiddlewares(): void | Promise<any> {
    this.use(GlobalAcceptMimesMiddleware)
      .use(
        cookieSession({
          maxAge: 30 * 24 * 60 * 60 * 1000,
          keys: [keys.cookieKey]
        })
      )
      .use(express.json({ extended: true }))
      .use(formData.parse());

    return;
  }

  public $onReady() {
    console.log('Server has started...');
  }

  public $onServerInitError(err: Error) {
    console.error(err);
  }
}
