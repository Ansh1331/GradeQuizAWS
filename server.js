const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;

// Serve static files from the React app's build folder
// const __dirname = path.dirname("");
const buildPath = path.join(__dirname, "dist");
app.use(express.static(buildPath));

// For any routes not covered, send back the index.html from the build folder
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
