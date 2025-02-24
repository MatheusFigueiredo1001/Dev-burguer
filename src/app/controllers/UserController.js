/*
    store => Cadastra/Adiciona usuário
    index => Lista vários usuários
    show => Lista apenas um usuário
    update => Atualiza usuários
    delete => Deleta usuários
*/

import User from '../models/User';
import { v4 } from 'uuid';
import * as Yup from 'yup';

class UserController {
	async store(req, res) {
		const schema = Yup.object({
			name: Yup.string().required(),
			email: Yup.string().email().required(),
			password: Yup.string().min(8).required(),
			admin: Yup.boolean(),
		});

		try {
			schema.validateSync(req.body, { abortEarly: false });
		} catch (err) {
			return res.status(400).json({ error: err.errors });
		}

		const { name, email, password, admin } = req.body;

		const userExists = await User.findOne({
			where: {
				email,
			},
		});

		if (userExists) {
			return res.status(400).json({ error: 'User already exists!' });
		}

		console.log(userExists);

		const user = await User.create({
			id: v4(),
			name,
			email,
			password,
			admin,
		});
		return res.status(201).json({
			id: user.id,
			name,
			email,
			admin, //No front-end vai retornar essas informações, apenas o que o usuário precisa saber
		});
	}
}

export default new UserController();
