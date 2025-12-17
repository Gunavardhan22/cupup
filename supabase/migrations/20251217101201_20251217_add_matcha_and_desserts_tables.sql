/*
  # Add Matcha and Desserts Product Tables

  1. New Tables
    - `matchas` - Matcha menu items with similar structure to coffees
    - `desserts` - Desserts menu items
    - `add_ons` - Customizable add-ons for orders

  2. Tables Structure
    - Each table includes: id, name, description, price, image_url, category, rating, popular, created_at
    - add_ons table includes: id, name, description, price, type (e.g., syrup, topping), created_at

  3. Security
    - Enable RLS on all tables
    - Add public read policies for product browsing
    - Add authenticated user policies for admin functionality

  4. Sample Data
    - Insert matcha products
    - Insert dessert products  
    - Insert add-on options
*/

CREATE TABLE IF NOT EXISTS matchas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price decimal(10,2) NOT NULL,
  image_url text NOT NULL,
  category text NOT NULL,
  rating decimal(2,1) DEFAULT 4.5,
  popular boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS desserts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price decimal(10,2) NOT NULL,
  image_url text NOT NULL,
  category text NOT NULL,
  rating decimal(2,1) DEFAULT 4.5,
  popular boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS add_ons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price decimal(10,2) NOT NULL,
  type text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE matchas ENABLE ROW LEVEL SECURITY;
ALTER TABLE desserts ENABLE ROW LEVEL SECURITY;
ALTER TABLE add_ons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view matchas"
  ON matchas FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage matchas"
  ON matchas FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can view desserts"
  ON desserts FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage desserts"
  ON desserts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can view add_ons"
  ON add_ons FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage add_ons"
  ON add_ons FOR INSERT
  TO authenticated
  WITH CHECK (true);

INSERT INTO matchas (name, description, price, image_url, category, rating, popular) VALUES
  ('Matcha Latte', 'Creamy matcha green tea with steamed milk and subtle sweetness', 5.50, 'https://images.pexels.com/photos/5737454/pexels-photo-5737454.jpeg', 'Classic', 4.8, true),
  ('Iced Matcha Latte', 'Refreshing cold matcha latte served over ice with smooth milk', 5.75, 'https://images.pexels.com/photos/5737454/pexels-photo-5737454.jpeg', 'Cold', 4.7, true),
  ('Matcha Smoothie', 'Blend of matcha, banana, yogurt, and honey for a healthy treat', 6.25, 'https://images.pexels.com/photos/5737454/pexels-photo-5737454.jpeg', 'Smoothie', 4.9, true),
  ('Matcha Macchiato', 'Thick matcha cream layered with steamed milk, visually stunning', 5.99, 'https://images.pexels.com/photos/5737454/pexels-photo-5737454.jpeg', 'Classic', 4.8, false),
  ('Vanilla Matcha Latte', 'Smooth matcha latte infused with vanilla syrup and silky milk', 5.99, 'https://images.pexels.com/photos/5737454/pexels-photo-5737454.jpeg', 'Flavored', 4.6, false),
  ('Matcha Frappuccino', 'Iced matcha blended with cream and a hint of vanilla', 6.50, 'https://images.pexels.com/photos/5737454/pexels-photo-5737454.jpeg', 'Frozen', 4.7, false);

INSERT INTO desserts (name, description, price, image_url, category, rating, popular) VALUES
  ('Chocolate Cake', 'Rich, moist chocolate layer cake with smooth frosting', 7.50, 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg', 'Cakes', 4.9, true),
  ('Croissant', 'Buttery, flaky French croissant perfect with coffee', 4.50, 'https://images.pexels.com/photos/3407953/pexels-photo-3407953.jpeg', 'Pastries', 4.8, true),
  ('Cheesecake', 'Creamy New York style cheesecake with berry topping', 8.00, 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg', 'Cakes', 4.9, true),
  ('Chocolate Chip Cookie', 'Warm, chewy cookie loaded with premium chocolate chips', 3.50, 'https://images.pexels.com/photos/3407953/pexels-photo-3407953.jpeg', 'Cookies', 4.7, false),
  ('Macarons', 'Colorful French macarons in assorted flavors', 6.00, 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg', 'Pastries', 4.8, false),
  ('Tiramisu', 'Classic Italian dessert with mascarpone, cocoa, and espresso', 7.99, 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg', 'Cakes', 4.9, true),
  ('Blueberry Muffin', 'Fresh blueberry muffin with a delicate crumb', 5.00, 'https://images.pexels.com/photos/3407953/pexels-photo-3407953.jpeg', 'Baked Goods', 4.6, false),
  ('Donut', 'Glazed donut with your choice of toppings', 4.00, 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg', 'Donuts', 4.5, false);

INSERT INTO add_ons (name, description, price, type) VALUES
  ('Vanilla Syrup', 'Sweet vanilla flavoring shot', 0.75, 'Syrup'),
  ('Caramel Syrup', 'Rich caramel flavoring shot', 0.75, 'Syrup'),
  ('Hazelnut Syrup', 'Nutty hazelnut flavoring', 0.75, 'Syrup'),
  ('Honey', 'Raw honey drizzle', 0.50, 'Sweetener'),
  ('Extra Espresso Shot', 'Additional espresso for stronger coffee', 1.00, 'Coffee'),
  ('Whipped Cream', 'Fresh whipped cream topping', 0.75, 'Topping'),
  ('Chocolate Drizzle', 'Rich chocolate drizzle', 0.50, 'Topping'),
  ('Cinnamon Powder', 'Dusting of cinnamon', 0.25, 'Topping'),
  ('Almond Milk', 'Non-dairy milk alternative', 0.75, 'Milk'),
  ('Oat Milk', 'Creamy oat milk alternative', 0.75, 'Milk');
