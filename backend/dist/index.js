"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
const recipeRoutes_1 = __importDefault(require("./routes/recipeRoutes"));
dotenv_1.default.config(); // loading environment variables from .env file
const app = (0, express_1.default)(); // initializing Express application
const prisma = new client_1.PrismaClient(); // creating a Prisma Client instance to interact with the database
app.use((0, cors_1.default)()); // used CORS middleware for handling cross-origin requests
app.use(express_1.default.json()); // used JSON middleware to parse incoming JSON requests
// Use the recipe routes for the API under the /api/recipes path
app.use('/api', recipeRoutes_1.default);
app.get('/', (req, res) => {
    res.send('Welcome to the Recipe Sharing Platform API');
});
// here starts the server to port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
