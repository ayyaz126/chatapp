// Load environment variables
import "./config/env";

// Initialize DB and Redis connections
import "./config/db";
import "./config/redis";

// Import Express app
import app from "./app";

// Start Server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log("✅ PostgreSQL (Drizzle ORM) should be connected");
  console.log("✅ Redis should be connected");
});

