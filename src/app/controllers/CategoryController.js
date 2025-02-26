import * as Yup from 'yup';
import Category from '../models/Categories';

class CategoryController {
	async store(req, res) {
		const schema = Yup.object({
			name: Yup.string().required(),
		});

		try {
			schema.validateSync(req.body, { abortEarly: false });
		} catch (err) {
			return res.status(400).json({ error: err.errors });
		}

		const { name } = req.body;

		const categoryExists = await Category.findOne({
			where: {
				name,
			},
		});

		if (categoryExists) {
			return res.status(400).json({ error: 'Category already exists!' });
		}

		const { id } = await Category.create({
			name,
		});

		return res.status(201).json({ id, name});
	}

	async index(req, res) {
		try {
			const categories = await Category.findAll();

			console.log({ userId: req.userId });

			return res.json(categories);
		} catch (err) {
			return res.status(500).json({ error: 'Error listing products!' });
		}
	}
}

export default new CategoryController();
