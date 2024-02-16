This project is a group performance test which is a requirement for Web Programming 2. It is a Recipe Sharing API that allows users to share different kinds of recipes. Users can view the information about the recipe such as name, category, ingredients, and cooking instructions. Users also should be able to view, edit, and delete the recipes.

Our group is consists of three(3) members named John Carl Lecaros, Jonabell Mago, and May Maming.

Steps to set up the projecy locally: 
Initially the user should download and install Node.js from the web.
To use the project the user should install different modules using the IDE terminal:
npm i express express-session body-parser
npm install --save-dev nodemon
npm install joi

To access and modify the recipes the users can use these different API endpoints:

http://localhost:3000 - this is the default url for testing.
POST http://localhost:3000/login - the endpoint for users to login
POST http://localhost:3000/register - the endpoint for users to register
GET http://localhost:3000/api/recipes - the endpoint for viewing all the recipes
GET http://localhost:3000/api/recipes/1 - the endpoint for viewing a specific recipe using its ID
GET http://localhost:3000/api/recipes/Chicken Shawarma - the endpoint for viewing a specific recipe using its name
GET http://localhost:3000/api/recipes/Dessert - the endpoint for viewing a specific recipe using its category
PUT http://localhost:3000/api/recipes/1 - the endpoint for editing a specific recipe using its ID
DELETE http://localhost:3000/api/recipes/1 - the endpoint for deleting a specific recipe using its ID
