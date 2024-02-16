
//Variables
const express = require('express');
const Joi = require('joi');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();

app.use(express.json());
// Middleware to parse JSON bodies
app.use(bodyParser.json());

// User data
const users = [
    { 
        id: 1,
        username: 'JC', 
        password: 'password1' 
    },
    { 
        id: 2, 
        username: 'Bell', 
        password: 'password2' 
    },
    { 
        id: 2, 
        username: 'May', 
        password: 'password3' }
];


const recipes = [
    {
        id: 1,
        name: "Pasta Carbonara",
        category: "Dinner",
        ingredients: ["Spaghetti", "Bacon", "Eggs"],
        instructions:["1. Use about 4 quarts of water for every 1 lb of pasta.", "2. Never forget to salt the water.", "3. Do not break the pasta! It will only take 30 seconds for your pasta to soften up and sink into the pot.", "4. Stir the pasta well using tongs to avoid the noodles form sticking to the pot.", "5. Do not hesitate to taste the pasta. For about 5 minutes beofre the end of the cooking duration, test if the pasta is already al dante (sticks to the tooth, chewy).", "6. Just because its already cooked doesn't mean you can leave it for good. Drain the pasta immediately, and be sure to add the sauce right away. ",]
    },
    {
        id: 2,
        name: "Cheesy Bacsilog",
        category:"Breakfast",
        ingredients: ["Bacon", "Eggs","Rice", "Cheese"],
        instructions:["1. Cook over low heat", "mixing continuously", "until the cheese melts and the mixture is thick."," 2. Assemble your bacsilog by grabbing some bowls and filling them with a serving of rice, bacon, and egg.","3. Drizzle each bowl with the bacsilog cheese.", "4. Enjoy your bacsilog as is or add extra Knorr Liquid Seasoning for a deeper" ," unamiu-taste."],
    },
    {
        id: 3,
        name: "Perfect Spinach Salad",
        category:"Breakfast",
        ingredients: ["3 whole eggs", "Ice", "7 slices thick-cut peppered bacon", "1 small whole red onion", "1 package white button mushrooms", "3 table spoons red wine vinegar", "2 teaspoons sugar", "1/2 teaspoon Dijon mustard", "1 dash salt", " 8 ounces baby spinach, washed, dried and steams removed"],
        instructions:["1. Place the eggs in a saucepan, cover with water and bring to a boil. Then turn off the heat and allow to sit  in the water for 20 minutes. Drain off the water and ice on top of the eggs.", "2. Fry the bacon in a skillet until crispy/chewy. Remove to a paper towel. Drain the fat into a bowl and reserve. Give the skillet a wipe with a kitchen paper.", "3. Slice the red onion very thinly, and then add to the skillet. Cook slowly until the onions are caramelized and reduced. Remove to a plate and set aside.", "4. Slice the Mushrooms and add them to the same skillet with a little of the reserved bacon fat if needed. Cook slowly until caramelized and brown. Remove to a plate and set aside. Chop the bacon. Peel and slice the eggs.", "5. Make the hot bacon dressing.", "6. Add 3 tablespoons of the reserved bacon fat, vinegar, sugar, Dijon and salt to a small saucepan or skillet over medium-low heat. Whisk together and heat thoroughly until bubbly. Add the spinach to a large bowl, Arrage the onions, mushrooms and bacon on top. Pour the hot dressing over the top; toss to combine. Arrange the eggs over the top and serve", "7. Per serving: Calories 270; Total Fat 22.5 grams; Saturated Fat 7.5 grams; Protein 10 grams; Total Carbohydrate 7 grams; Sugar: 2 grams; Fiber 2 grams; Cholesterol 123 miligrams; Sodium 526 milligrams.",]
    },
    {
        id: 4,
        name: "Chocolate Chip Cookies",
        category: "Dessert",
        ingredients: ["Flour", "Sugar", "Butter", "Chocolate Chips"],
        instructions: ["1. Preheat oven to 350°F and line baking sheets.", "2. Whisk flour, baking soda, butter, sugar, salt, vanilla extract, eggs, flour mixture, and semisweet chocolate chips.", "3. Drop dough onto baking sheets, bake for 8-10 minutes, and let cool.", "4. Enjoy with milk or your favorite beverage. Store leftovers in an airtight container for up to several days."]
    },
    {
        id: 5,
        name: "Chicken Shawarma",
        category: "Lunch",
        ingredients: ["Chicken Breast", "Garlic", "Paprika", "Lemon Juice", "Toppings", "Salt", "Pepper", "Cinnamon", "Coriander"],
        instructions: ["1. Mix minced garlic, cumin, paprika, turmeric, coriander, cinnamon, cayenne pepper, lemon juice, olive oil, salt, and pepper in a bowl.", "2. Add thinly sliced chicken and marinate in the refrigerator for 30 minutes or up to 4 hours.", "3. Preheat grill or pan, thread chicken onto skewers, and grill for 4-5 minutes per side.", "4. Warm pita bread or flatbreads, add grilled chicken, and add desired toppings.", "5. Roll up the shawarma and serve. Enjoy this delicious meal or snack."]
    }
]

// Middleware for sessions
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // Simulate user authentication (you would typically query a database)
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        // Set up session data
        req.session.userId = user.id;
        
        // Redirect to dashboard or profile page
        res.redirect('/api/recipes');
    } else {
        res.status(401).send('Invalid username or password');
    }
});

// Registration route
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    
    // Check if username is already taken
    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
        return res.status(400).send('Username already exists');
    }
    
    // Generate a unique ID for the new user
    const id = users.length + 1;
    
    // Add the new user to the list
    const newUser = { id, username, password };
    users.push(newUser);
    
    // Set up session data
    req.session.userId = id;
    
    // Redirect to dashboard or profile page
    res.redirect('/api/recipes');
});

app.get('/api/recipes/:type', (req, res) => {
    const type = req.params.type;
    const recipe = recipes.find(recipe => {
        if (isNaN(type)) {
            return recipe.name === type || recipe.category === type;
        } else {
            return recipe.id === parseInt(type);
        }
    });

    if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
    }

    res.send(recipe);
});
// Send back one specific recipe based on its ID, name, or category

app.get('/api/recipes', (req, res) => {
  if(req.query.sortBy === 'name') {
    recipes.sort ((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
  });
}
res.send(recipes);
});

app.post('/api/recipes', (req, res) => {
  const recipe = {
    id: recipes.length + 1,
    name: req.body.name,    
  };
  recipes.push(recipe);
  res.send(recipe);
});


//Post
app.post('/api/recipes', (req, res) => {
  if (!req.body.name || req.body.name.length < 3)
  {
    res
        .status(400)
        .send('Name is required and should be minimum 3 characters.');
    return;
  }

const schema = Joi.object({
    name: Joi.string().min(3).required(),
});

const result = schema.validate(req.body);
if(result.error)
{
    res.status(400).send(result.error.details[0].message);
    return;
}

});

app.put('/api/recipes/:id', (req, res) => {
const recipe = recipes.find((c) => c.id === parseInt(req.params.id));
    if(!recipe)
        return res.status(404).send('The recipe was not found using the given ID.');

    const schema = Joi.object({
        name: Joi.string().min(3).required(),
    });

    const result = schema.validate(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    recipe.name = req.body.name;
    res.send(recipe);
});

app.delete('/api/recipes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    // Find index of item with given ID
    const index = recipes.findIndex(recipe => recipe.id === id);
    
    if (index !== -1) {
        // If item found, delete it
        recipes.splice(index, 1);
        res.status(204).send("The recipe was successfully deleted."); // No content - item successfully deleted
    } else {
        // If item not found, return 404 Not Found
        res.status(404).json({ message: 'Recipe not found. Please specify the id of the recipe.' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => 
{
    console.log('Listening on     http://localhost:${port}...')
}
);