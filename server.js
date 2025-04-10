const express = require('express');
const app = express();
const { initDb } = require('./data/database'); // Import your DB initialization function

const port = process.env.PORT || 3000;

(async () => {
  try {
    // Initialize the database
    await initdb();

    // Start the server after DB initialization
    app.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('❌ Failed to initialize the database:', error); // ✅ Match 'error'
    process.exit(1); // Exit the process with an error code if DB initialization fails
  }
})();
