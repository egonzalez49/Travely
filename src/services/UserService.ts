import { Service, ServerSettingsService, Inject } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { UserModel } from '../models/UserModel';
import { IUser } from '../interfaces/User';
import { Document } from 'mongoose';
import { BadRequest } from 'ts-httpexceptions';
import bcrypt from 'bcrypt';

@Service()
export class UserService {
  constructor(
    private serverSettings: ServerSettingsService,
    @Inject(UserModel) private model: MongooseModel<UserModel>
  ) {}

  // find a document by email
  // @params email  the email to search for
  // @return user   document or null
  public async findByEmail(
    email: string
  ): Promise<UserModel & Document | null> {
    const existing = await this.model.findOne({ email }).exec();
    return existing;
  }

  // create a new user
  // @params user   the user object (IUser interface implement)
  // @return user   the user added to db (with encrypted password)
  public async createUser(user: IUser): Promise<UserModel & Document> {
    let newUser = user;
    newUser.password = this.encryptPassword(newUser.password);

    const newUserObject = new this.model(newUser);
    await newUserObject.save(err => {
      if (err) {
        throw err;
      }
    });

    return newUserObject;
  }

  // find a user using email and password
  // @params email    the email of the user
  // @params password the user's password
  // @return user     the user if found
  public async findByCredentials(
    email: string,
    password: string
  ): Promise<UserModel & Document> {
    const user = await this.model.findOne({ email }).exec();

    if (!user) {
      throw new BadRequest('Invalid credentials.');
    }

    if (!user.verifyPassword(password)) {
      throw new BadRequest('Invalid credentials.');
    }

    return user;
  }

  // encrypt a password
  // @params password   the password to encrypt
  // @return encrypted  the encrypted password
  private encryptPassword(password: string): string {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5));
  }

  // find a user by their id
  // @params id     the user's id
  // @return user   the user with id
  public async findById(id: string): Promise<UserModel & Document | null> {
    const user = await this.model
      .findById(id)
      .select({ password: false })
      .exec();

    return user;
  }
}
