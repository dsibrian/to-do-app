const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, "public")));

//Client side routing fix on page refresh or direct browsing to non-root directory
app.get("*", function (req, res) {
    res.status(404).send("In progress")
});

//Start the server
app.listen(port, () => console.log(`Sample-node-app listening on port ${port}!`));
