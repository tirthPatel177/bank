const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => {
  // console.log(conn.connections);
  console.log("DB CONNECTED SUCCESSFULLY");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}....`);
});
