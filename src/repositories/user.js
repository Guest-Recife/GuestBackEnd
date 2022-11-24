import BaseRepository from './base';
import UserModel from '../models/user';

export default class User extends BaseRepository {
  constructor() {
    super(UserModel);
  }
}
