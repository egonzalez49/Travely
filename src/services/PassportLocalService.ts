import {
  Service,
  BeforeRoutesInit,
  AfterRoutesInit,
  ServerSettingsService,
  Inject,
  ExpressApplication
} from '@tsed/common';
import Passport from 'passport';
import { Strategy } from 'passport-local';
import { BadRequest, NotFound } from 'ts-httpexceptions';
import { UserService } from './UserService';
import { IUser } from '../interfaces/User';
import { UserModel } from '../models/UserModel';
import { Document } from 'mongoose';

@Service()
export class PassportLocalService implements BeforeRoutesInit, AfterRoutesInit {
  constructor(
    private serverSettings: ServerSettingsService,
    private userService: UserService,
    @Inject(ExpressApplication) private expressApplication: ExpressApplication
  ) {}

  $beforeRoutesInit() {
    const options: any = this.serverSettings.get('passport') || ({} as any);
    const { userProperty, pauseStream } = options;

    this.expressApplication.use(Passport.initialize());
    this.expressApplication.use(Passport.session());
  }

  $afterRoutesInit() {
    this.initializeSignup();
    this.initializeLogin();
    Passport.serializeUser((user: IUser, done) => {
      done(null, user.id);
    });

    Passport.deserializeUser((id: string, done) => {
      this.userService.findById(id).then(user => done(null, user));
    });
  }

  public initializeSignup(): void {
    Passport.use(
      'signup',
      new Strategy(
        {
          usernameField: 'email',
          passwordField: 'password',
          passReqToCallback: true
        },
        (req, email, password, done) => {
          const { firstName, lastName } = req.body;

          process.nextTick(() => {
            this.signup({
              firstName,
              lastName,
              email,
              password
            })
              .then(user => done(null, user))
              .catch(err => done(err));
          });
        }
      )
    );
  }

  async signup(user: IUser): Promise<UserModel & Document> {
    const exists = await this.userService.findByEmail(user.email);

    if (exists) {
      throw new BadRequest('Email is already in use.');
    }

    return await this.userService.createUser({
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName
    });
  }

  public initializeLogin(): void {
    Passport.use(
      'login',
      new Strategy(
        {
          usernameField: 'email',
          passwordField: 'password',
          passReqToCallback: true
        },
        (req, email, password, done) => {
          this.login(email, password)
            .then(user => done(null, user))
            .catch(err => done(err));
        }
      )
    );
  }

  async login(email: string, password: string): Promise<IUser> {
    const user = await this.userService.findByCredentials(email, password);
    if (user) {
      return user;
    }

    throw new NotFound('User not found.');
  }
}
