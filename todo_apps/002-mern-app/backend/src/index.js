const app = require("./app");
const { configureMongoose } = require("./config/mongooseConfig");


configureMongoose();

app.listen(3000, () => console.log("Server listening on port 3000..."));
