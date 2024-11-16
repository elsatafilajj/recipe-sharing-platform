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
// Load environment variables
dotenv_1.default.config();
// Initialize Prisma Client
const prisma = new client_1.PrismaClient();
// Initialize Express app
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Replace with your frontend URL
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true,
}));
app.use(express_1.default.json());
// API Routes
app.use('/api', recipeRoutes_1.default);
// Default route for testing
app.get('/', (req, res) => {
    res.send('Welcome to the Recipe Sharing Platform API');
});
// Vercel handler
const vercelHandler = (req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        return res.status(200).json({ message: 'Hello from the API!' });
    }
    // Delegate all requests to Express
    app(req, res);
};
// Export for Vercel deployment
exports.default = vercelHandler;
// Start server locally (for development only)
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}
