import Sequelize from 'sequelize';

import User from '../app/models/User';
import File from '../app/models/File';

import databaseConfig from '../config/database';

const models = [User, File];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(m => m.init(this.connection))
      .map(m => m.associate && m.associate(this.connection.models));
    ;
  }
}

export default new Database();
