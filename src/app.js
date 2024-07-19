import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { fileURLToPath } from 'url';
import path from 'path';
import cors from 'cors';
import fibonacciRoutes from './routes/fibonacci.route.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define las opciones de Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation Fibonacci',
      version: '1.0.1',
      description: 'Documentación de la API',
    },
  },
  // Añade las rutas donde están definidas las anotaciones Swagger
  apis: [path.join(__dirname, './routes/*.js')],
};

// Genera la especificación Swagger
const specs = swaggerJsdoc(options);

// Usa Swagger UI en la ruta /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Añade el middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Habilita CORS
app.use(cors());

// Usa las rutas
app.use('/api/v1', fibonacciRoutes);

// Middleware para manejar rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({
    message: 'Endpoint not found',
  });
});

export default app;
  