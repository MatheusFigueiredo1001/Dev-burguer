import * as Yup from 'yup';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

class SessionController {
	async store(req, res) {
		const schema = Yup.object({
			email: Yup.string().email().required(),
			password: Yup.string().min(8).required(),
		});

		const isValid = await schema.isValid(req.body);

		const emailOrPasswordIncorrect = () => {
			res
				.status(401)
				.json({ error: 'Check that your email or password is correct!' });
		};

		if (!isValid) {
			return emailOrPasswordIncorrect();
		}

		const { email, password } = req.body;

		const user = await User.findOne({
			where: {
				email,
			},
		});
		if (!user) {
			return emailOrPasswordIncorrect();
		}

		const isSamePassword = await user.checkPassword(password);
		if (!isSamePassword) {
			return emailOrPasswordIncorrect();
		}

		return res.status(201).json({
			id: user.id,
			name: user.name,
			email: user.email,
			admin: user.admin,
			token: jwt.sign({ id: user.id }, authConfig.secret, {
				expiresIn: authConfig.expiresIn,
			}),
		});
	}
}

export default new SessionController();
