import * as Yup from 'yup';
import Product from '../models/Product';
import Category from '../models/Categories';

class ProductController {
	async store(req, res) {
		const schema = Yup.object({
			name: Yup.string().required(),
			price: Yup.number().required(),
			category_id: Yup.number().required(),
		});

		try {
			schema.validateSync(req.body, { abortEarly: false });
		} catch (err) {
			return res.status(400).json({ error: err.errors });
		}

		const { filename: path } = req.file;
		const { name, price, category_id } = req.body;

		const product = await Product.create({
			name,
			price,
			category_id,
			path,
		});

		return res.status(201).json(product);
	}

	async index(req, res) {
		try {
			const products = await Product.findAll({
				include: [
					{
						model: Category,
						as: 'category',
						attributes: ['id', 'name'],
					},
				]
			});

			console.log({ userId: req.userId });

			return res.json(products);
		} catch (err) {
			return res.status(500).json({ error: 'Error listing products!' });
		}
	}
}

export default new ProductController();
