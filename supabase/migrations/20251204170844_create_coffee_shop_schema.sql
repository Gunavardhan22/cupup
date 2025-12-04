/*
  # Coffee Shop Database Schema

  1. New Tables
    - `coffees`
      - `id` (uuid, primary key) - Unique identifier for each coffee
      - `name` (text) - Coffee name
      - `description` (text) - Detailed description of the coffee
      - `price` (decimal) - Price of the coffee
      - `image_url` (text) - URL to coffee image
      - `category` (text) - Category (espresso, latte, cappuccino, etc.)
      - `rating` (decimal) - Average rating (0-5)
      - `popular` (boolean) - Whether this coffee is popular/featured
      - `created_at` (timestamp) - Record creation timestamp

  2. Security
    - Enable RLS on `coffees` table
    - Add policy for public read access (anyone can view coffees)
    - Add policy for authenticated users to insert/update coffees (for admin functionality)

  3. Sample Data
    - Insert initial coffee products with various categories
*/

CREATE TABLE IF NOT EXISTS coffees (
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

ALTER TABLE coffees ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view coffees"
  ON coffees FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert coffees"
  ON coffees FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update coffees"
  ON coffees FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete coffees"
  ON coffees FOR DELETE
  TO authenticated
  USING (true);

INSERT INTO coffees (name, description, price, image_url, category, rating, popular) VALUES
  ('Espresso', 'Rich and bold espresso shot made from premium Arabica beans', 3.50, 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg', 'Espresso', 4.8, true),
  ('Cappuccino', 'Classic Italian coffee with steamed milk and foam, perfectly balanced', 4.50, 'https://images.pexels.com/photos/851555/pexels-photo-851555.jpeg', 'Cappuccino', 4.7, true),
  ('Latte', 'Smooth and creamy latte with perfectly steamed milk and espresso', 4.75, 'https://images.pexels.com/photos/1082344/pexels-photo-1082344.jpeg', 'Latte', 4.6, true),
  ('Americano', 'Bold espresso diluted with hot water for a smooth, rich taste', 3.75, 'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg', 'Americano', 4.5, false),
  ('Mocha', 'Delicious blend of espresso, chocolate, and steamed milk topped with whipped cream', 5.25, 'https://images.pexels.com/photos/1933320/pexels-photo-1933320.jpeg', 'Specialty', 4.9, true),
  ('Caramel Macchiato', 'Vanilla-flavored drink with espresso, steamed milk, and caramel drizzle', 5.50, 'https://images.pexels.com/photos/2396220/pexels-photo-2396220.jpeg', 'Specialty', 4.8, true),
  ('Flat White', 'Velvety microfoam over a double shot of espresso, Australian style', 4.25, 'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg', 'Espresso', 4.6, false),
  ('Cold Brew', 'Smooth, refreshing cold-steeped coffee served over ice', 4.00, 'https://images.pexels.com/photos/2637827/pexels-photo-2637827.jpeg', 'Cold', 4.7, true),
  ('Iced Latte', 'Chilled espresso with cold milk over ice, refreshing and smooth', 4.75, 'https://images.pexels.com/photos/1458672/pexels-photo-1458672.jpeg', 'Cold', 4.5, false),
  ('Vanilla Latte', 'Sweet vanilla syrup mixed with espresso and steamed milk', 5.00, 'https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg', 'Latte', 4.7, false),
  ('Turkish Coffee', 'Traditional unfiltered coffee with a rich, bold flavor', 4.00, 'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg', 'Specialty', 4.4, false),
  ('Affogato', 'Vanilla ice cream drowned in a shot of hot espresso', 5.75, 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg', 'Dessert', 4.9, true);
