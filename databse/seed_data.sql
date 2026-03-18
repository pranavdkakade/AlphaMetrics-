INSERT INTO users (name, occupation, email, password_hash)
VALUES
	(
		'Alpha Admin',
		'Store Manager',
		'admin@alphametrics.com',
		crypt('admin123', gen_salt('bf'))
	)
ON CONFLICT (email) DO NOTHING;

INSERT INTO products (user_id, name, category, buying_price, quantity, image_path, embedding)
SELECT u.id, 'Premium Rice 5kg', 'Grocery', 410.0, 120, NULL, NULL
FROM users u
WHERE u.email = 'admin@alphametrics.com'
ON CONFLICT DO NOTHING;

INSERT INTO products (user_id, name, category, buying_price, quantity, image_path, embedding)
SELECT u.id, 'Cooking Oil 1L', 'Grocery', 132.0, 180, NULL, NULL
FROM users u
WHERE u.email = 'admin@alphametrics.com'
ON CONFLICT DO NOTHING;
