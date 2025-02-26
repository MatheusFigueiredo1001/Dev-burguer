import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import configDatabase from '../config/database';

import User from '../app/models/User';
import Product from '../app/models/Product';
import Category from '../app/models/Categories';

const models = [User, Product, Category]; //Criando um array, é possível usar o map e assim não precisar chamar as Models sempre que cria cada uma, já chama automaticamente

class Database {
	constructor() {
		this.init();
		this.mongo();
	}

	init() {
		this.connection = new Sequelize(configDatabase);
		models
			.map((model) => model.init(this.connection))
			.map((model) => model.associate?.(this.connection.models));
	}

	mongo() {
		this.mongoConnection = mongoose.connect(
			'mongodb://localhost:27017/devburguer',
		);
	}
}

export default new Database();
