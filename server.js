import app from './app.js'
import sequelize from './config/db.js'

// Connect to Database
sequelize
  .authenticate()
  .then(() => console.log("Database connected!"))
  .catch((err) => console.error("Unable to connect to the database:", err.message));


// Sync Models and Start Server
const PORT = process.env.PORT || 3000;
sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => console.log(`Server running on PORT no: ${PORT}`));
});
