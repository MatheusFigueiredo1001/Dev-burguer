import Sequelize from 'sequelize';

import configDatabase from '../config/database';

import User from '../app/models/User';
import Product from '../app/models/Product';
import Category from '../app/models/Categories';

const models = [User, Product, Category]; //Criando um array, é possível usar o map e assim não precisar chamar as Models sempre que cria cada uma, já chama automaticamente

class Database {
	constructor() {
		this.init();
	}

	init() {
		this.connection = new Sequelize(configDatabase);
		models
			.map((model) => model.init(this.connection))
			.map((model) => model.associate?.(this.connection.models));
	}
}

export default new Database();
