import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false, // Disable SQL query logging
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // For hosted PostgreSQL services
    },
  },
});

export default sequelize;
