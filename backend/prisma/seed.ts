import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      { name: 'John Doe', email: 'john.doe@example.com' },
      { name: 'Jane Smith', email: 'jane.smith@example.com' },
      { name: 'Alice Johnson', email: 'alice.johnson@example.com' },
      { name: 'Bob Brown', email: 'bob.brown@example.com' },
      { name: 'Charlie Green', email: 'charlie.green@example.com' },
      { name: 'Daisy White', email: 'daisy.white@example.com' },
      { name: 'Eva Black', email: 'eva.black@example.com' },
      { name: 'Frank Blue', email: 'frank.blue@example.com' },
      { name: 'Grace Yellow', email: 'grace.yellow@example.com' },
      { name: 'Hank Pink', email: 'hank.pink@example.com' },
      { name: 'Ivy Purple', email: 'ivy.purple@example.com' },
      { name: 'Jack Orange', email: 'jack.orange@example.com' },
      { name: 'Kate Red', email: 'kate.red@example.com' },
      { name: 'Leo Cyan', email: 'leo.cyan@example.com' },
      { name: 'Mia Magenta', email: 'mia.magenta@example.com' },
      { name: 'Nina Silver', email: 'nina.silver@example.com' },
      { name: 'Oscar Gold', email: 'oscar.gold@example.com' },
    ],
  });

  console.log('Users created.');

  // recipes with cloudinary URL-s
  await prisma.recipe.createMany({
    data: [
      {
        title: 'Healthy Breakfast',
        content: 'A warm bowl of oatmeal topped with fresh berries, banana slices, and a sprinkle of nuts.',
        imageUrl: 'https://res.cloudinary.com/dtuq9qcvc/image/upload/v1730834606/yehinh9kt4g88c6qh2vr.jpg',
        userId: 1, 
        ingredients: '1 cup Oatmeal (rolled oats) • 1/2 cup Fresh berries • 1 Banana, sliced • 1/4 cup Nuts • 1 tbsp Honey • 1/2 cup Milk • A pinch of Cinnamon • Preparation Time: 5 minutes • Cooking Time: 5 minutes • Total Time: 10 minutes',
        
      },
      {
        title: 'Fruit Salad Bowl',
        content: 'A vibrant mix of seasonal fruits topped with a drizzle of honey and a sprinkle of mint.',
        imageUrl: 'https://res.cloudinary.com/dtuq9qcvc/image/upload/v1730834616/llg5xqedwdavpufxmpbe.jpg',
        userId: 2, 
        ingredients: '1 cup Seasonal fruits (e.g., oranges, apples, grapes, kiwi, or watermelon) • 1-2 tbsp Honey • A few Mint leaves (chopped) • 1/2 Lime (optional for zest) • Preparation Time: 10 minutes • Total Time: 10 minutes'
      },
      {
        title: 'Classic Cheeseburger',
        content: 'Juicy beef patty topped with melted cheddar cheese, fresh lettuce, tomato, and pickles on a toasted bun.',
        imageUrl: 'https://res.cloudinary.com/dtuq9qcvc/image/upload/v1730834619/mxglvm1lzqsjtd70uakd.jpg',
        userId: 3, 
        ingredients: '1 Beef patty (about 1/3 lb) • 1 slice Cheddar cheese • 1 Lettuce leaf • 2 slices Tomato • 3-4 Pickles, sliced • 1 Hamburger bun (toasted) • Preparation Time: 5 minutes • Cooking Time: 8-10 minutes • Total Time: 15 minutes'
      },
      {
        title: 'Blueberry Muffins',
        content: 'Soft and fluffy muffins bursting with fresh blueberries, perfect for breakfast or a snack.',
        imageUrl: 'https://res.cloudinary.com/dtuq9qcvc/image/upload/v1730834622/dqmtjexzu1o8apxwgasn.jpg',
        userId: 4, 
        ingredients: '1 1/2 cups All-purpose flour • 3/4 cup Sugar • 1 cup Fresh or frozen blueberries • 2 Eggs • 1/2 cup Butter, melted • 2 tsp Baking powder • 1/2 tsp Salt • 1/2 cup Milk (optional for added moisture) • 1 tsp Vanilla extract (optional for flavor) • Preparation Time: 15 minutes • Baking Time: 20-25 minutes • Total Time: 40 minutes'
      },
      {
        title: 'Classic Eggs Benedict',
        content: 'Poached eggs served on toasted English muffins with ham and drizzled with hollandaise sauce.',
        imageUrl: 'https://res.cloudinary.com/dtuq9qcvc/image/upload/v1730834628/ofhh6y2j1svm4f7eket2.jpg',
        userId: 5,
        ingredients: '2 Eggs • 2 English muffins, split in half • 4 slices Ham (or Canadian bacon) • 1/2 cup Hollandaise sauce (store-bought or homemade) • Fresh parsley (optional, for garnish) • Salt and pepper (to taste) • 1 tbsp Butter (for toasting the muffins) • Preparation Time: 10 minutes • Cooking Time: 15 minutes • Total Time: 25 minutes' 
      },
      {
        title: 'Classic Egg Salad',
        content: 'A creamy salad made with hard-boiled eggs, mayonnaise, and crunchy vegetables, served on lettuce.',
        imageUrl: 'https://res.cloudinary.com/dtuq9qcvc/image/upload/v1730834635/pf7aigdrk8xys8xp6yx5.jpg',
        userId: 6, 
        ingredients: '4 Hard-boiled eggs • 3 tbsp Mayonnaise • 2 leaves Lettuce (any variety) • 1/4 cup diced Vegetables (e.g., celery, onion, cucumber, or bell pepper) • Salt and pepper (to taste) • 2 slices of bread (white, whole wheat, or any preferred type) • Optional: 1 tsp Mustard (for added flavor) • Fresh herbs for garnish (optional, like parsley or dill) • Preparation Time: 10 minutes • Cooking Time: 5 minutes (if toasting bread) • Total Time: 15 minutes'
      },
      {
        title: 'Classic Oatmeal',
        content: 'Warm oatmeal topped with fresh fruits and a drizzle of honey for a wholesome breakfast.',
        imageUrl: 'https://res.cloudinary.com/dtuq9qcvc/image/upload/v1730834646/agocztccbrgg6nk5pfqa.jpg',
        userId: 7, 
        ingredients: '1/2 cup Oats (rolled oats or instant oats) • 1 cup Water or Milk (for cooking oats) • 1/2 cup Fresh fruits (e.g., berries, banana slices, apple slices, or your choice of seasonal fruits) • 1-2 tbsp Honey (or to taste) • Optional: Nuts (e.g., almonds, walnuts), seeds (e.g., chia, flax), or yogurt for topping • Preparation Time: 5 minutes • Cooking Time: 5-10 minutes (depending on oat type) • Total Time: 10-15 minutes'
      },
      {
        title: 'Grilled Chicken with Quinoa Salad',
        content: 'Juicy grilled chicken breast served over a bed of quinoa mixed with fresh vegetables and herbs.',
        imageUrl: 'https://res.cloudinary.com/dtuq9qcvc/image/upload/v1730834660/j82a9izprwdwdholk0lb.jpg',
        userId: 8, 
        ingredients: '2 Chicken breasts (boneless, skinless) • 1 cup Quinoa (rinse before cooking) • 1 1/2 cups Water or Chicken broth (for cooking quinoa) • 1 1/2 cups Mixed vegetables (e.g., bell peppers, zucchini, broccoli, carrots, or your choice of seasonal vegetables) • 2 tbsp Olive oil (for cooking) • 1 tsp Garlic powder • 1 tsp Onion powder • 1 tsp Dried thyme (or your choice of fresh herbs like rosemary, parsley, or oregano) • Salt and pepper (to taste) • Fresh lemon juice (optional, for added flavor) • Optional: Fresh herbs for garnish (e.g., parsley or cilantro) • Preparation Time: 10 minutes • Cooking Time: 25 minutes • Total Time: 35 minutes'
      },
      {
        title: 'Strawberry Muffins',
        content: 'Soft and fluffy muffins bursting with fresh strawberries, perfect for breakfast or a snack.',
        imageUrl: 'https://res.cloudinary.com/dtuq9qcvc/image/upload/v1730834685/iiiaq70ixlepb6arvvhe.jpg',
        userId: 9, 
        ingredients: '2 cups All-purpose flour • 1/4 cup Granulated sugar (plus extra for strawberries) • 1 tsp Baking powder • 1/2 tsp Salt • 1/2 cup Unsalted butter (cold, cut into small pieces) • 2/3 cup Milk (or as needed) • 1 large Egg (for the dough) • 1 lb Fresh strawberries (hulled and sliced) • 1/4 cup Granulated sugar (for macerating strawberries) • Whipped cream or vanilla ice cream (optional, for serving) • Preparation Time: 15 minutes • Cooking Time: 25 minutes • Total Time: 40 minutes'
      },
      {
        title: 'Spaghetti Aglio e Olio',
        content: 'A simple and classic Italian dish made with spaghetti, garlic, olive oil, and chili flakes.',
        imageUrl: 'https://res.cloudinary.com/dtuq9qcvc/image/upload/v1730834700/fjefc4zoar9jrm2jamzl.jpg',
        userId: 10, 
        ingredients: '200g Spaghetti (or pasta of choice) • 4-5 Garlic cloves (thinly sliced) • 1/4 cup Extra virgin olive oil • 1/2 tsp Red chili flakes (adjust to taste) • Salt (to taste) • Fresh parsley (optional, for garnish) • Grated Parmesan (optional, for serving) • Preparation Time: 5 minutes • Cooking Time: 15 minutes • Total Time: 20 minutes'
      },
      {
        title: 'Pepperoni Pizza',
        content: 'A classic pepperoni pizza topped with mozzarella cheese and zesty tomato sauce on a crispy crust.',
        imageUrl: 'https://res.cloudinary.com/dtuq9qcvc/image/upload/v1730834718/xwvmlczu3y0v144izmid.jpg',
        userId: 11, 
        ingredients: '1 pizza dough (store-bought or homemade) • 1/2 cup Tomato sauce (or pizza sauce) • 1 1/2 cups Mozzarella cheese (shredded) • 100g Pepperoni (sliced) • Olive oil (for brushing) • Dried oregano (optional, for sprinkling) • Fresh basil leaves (optional, for garnish) • Preparation Time: 10 minutes • Cooking Time: 15-20 minutes • Total Time: 25-30 minutes'
      },
      {
        title: 'Classic Club Sandwich',
        content: 'A hearty club sandwich layered with turkey, ham, bacon, lettuce, tomato, and mayonnaise, served on toasted bread.',
        imageUrl: 'https://res.cloudinary.com/dtuq9qcvc/image/upload/v1730834722/g7m0z7mkqroralpi0gno.jpg',
        userId: 12, 
         ingredients: '2 slices of bread (your choice of bread, like whole wheat, sourdough, or ciabatta) • 2 slices of turkey breast • 2 slices of ham • 2 slices of crispy bacon • 2-3 leaves of lettuce (romaine or iceberg) • 2-3 slices of tomato • 1-2 tablespoons of mayonnaise (or more, to taste) • Salt and pepper (to taste) • Preparation Time: 10 minutes • Cooking Time: 5-10 minutes (if cooking bacon) • Total Time: 15-20 minutes'
      },
      {
        title: 'Spaghetti Bolognese',
        content: 'A rich and hearty spaghetti dish topped with a flavorful meat sauce made from ground beef, tomatoes, and herbs.',
        imageUrl: 'https://res.cloudinary.com/dtuq9qcvc/image/upload/v1730834728/qk0bwmgm6rwzgvjvbz3r.jpg',
        userId: 13, 
        ingredients: '1 lb (450g) ground beef • 2 tomatoes, diced (or 1 can of crushed tomatoes) • 1 onion, finely chopped • 2 cloves garlic, minced (optional, for extra flavor) • 2 tablespoons olive oil • 2 teaspoons dried herbs (like oregano, basil, and thyme) • 1 teaspoon salt • 1/2 teaspoon pepper • 8 oz (225g) spaghetti • 1/4 cup water or beef broth (optional, to adjust sauce consistency) • Preparation Time: 10 minutes • Cooking Time: 25-30 minutes • Total Time: 35-40 minutes'
      },
      {
        title: 'California Roll',
        content: 'A delicious sushi roll made with crab (or imitation crab), avocado, and cucumber, wrapped in sushi rice and nori.',
        imageUrl: 'https://res.cloudinary.com/dtuq9qcvc/image/upload/v1730834776/okbufvi4z1q5wigucppm.jpg',
        userId: 14, 
        ingredients: '1/2 lb (225g) crab meat (or imitation crab, shredded) • 1 ripe avocado, sliced • 1/2 cucumber, julienned (thin strips) • 1 cup sushi rice • 2 tablespoons rice vinegar • 1 tablespoon sugar • 1 teaspoon salt • 4-5 sheets of nori (seaweed) • Optional: Soy sauce, wasabi, or pickled ginger for serving • Preparation Time: 15 minutes • Cooking Time: 10 minutes (for sushi rice) '
      },
      {
        title: 'Vegetarian Pizza',
        content: 'A flavorful vegetarian pizza topped with fresh bell peppers, mushrooms, olives, and mozzarella cheese on a crispy crust.', 
        imageUrl: 'https://res.cloudinary.com/dtuq9qcvc/image/upload/v1730834984/f2ly2adkobg0mykrmmn9.jpg',
        userId: 15, 
        ingredients: '1 bell pepper, sliced • 1/2 cup mushrooms, sliced • 1/4 cup black olives, sliced • 1 1/2 cups mozzarella cheese, shredded • 1 pizza dough (store-bought or homemade) • Olive oil (for brushing) • Salt and pepper, to taste • Optional: Oregano or basil for garnish • Preparation Time: 10 minutes • Cooking Time: 15-20 minutes •'
      },
      {
        title: 'Juicy Burger with Fries',
        content: 'A mouth-watering beef burger topped with lettuce, tomato, and cheese, served with a side of crispy French fries.',
        imageUrl: 'https://res.cloudinary.com/dtuq9qcvc/image/upload/v1730834927/wwhda3hmb1bchlh6ik5u.jpg',
        userId: 16, 
         ingredients: '1 beef patty (about 4 oz) • 1 lettuce leaf • 2 tomato slices • 1 slice of cheese (cheddar or American) • 1 burger bun (top and bottom) • 1 cup frozen fries (or fresh potatoes for homemade fries) • Salt and pepper to taste • Optional: Pickles, ketchup, mustard, or mayonnaise • Preparation Time: 10 minutes • Cooking Time: 20-25 minutes • Total Time: 30-35 minutes'
      },
    ],
  });

  console.log('Recipes created.');
}

main()
  .catch((error) => {
    console.error('Error during seeding:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
