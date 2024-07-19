// Importa Sequelize y la instancia de conexión a la base de datos
import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js'; // Asegúrate de que 'sequelize' sea la instancia de conexión a tu base de datos

// Define el modelo de la tabla Category
const Fibonacci = sequelize.define('SerieFibonacci', {
  hours: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  minutes: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  seconds: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  serie_fibonacci: {
    type: DataTypes.STRING,
    allowNull: true
  },
  type: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'fibonacci', // Nombre de la tabla en la base de datos
  timestamps: false // Desactiva la gestión automática de marcas de tiempo
});

// Exporta el modelo Category
export { Fibonacci };