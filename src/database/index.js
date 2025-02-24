import Sequelize from 'sequelize';

import configDatabase from '../config/database';

import User from '../app/models/User';

const models = [User]; //Criando um array, é possível usar o map e assim não precisar chamar as Models sempre que cria cada uma, já chama automaticamente

class Database {
	constructor() {
		this.init();
	}

	init() {
		this.connection = new Sequelize(configDatabase)
		models
		  .map((model) => model.init(this.connection))
	}
}

export default new Database();
