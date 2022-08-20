const express = require("express");
const morgan = require("morgan");
const adminRouter = require("./routes/adminRoutes");
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const transactionRouter = require("./routes/transactionRoutes");
const cors = require("cors");
const errorHandler = require("./helpers/error-handler");

const app = express();

// 1. MIDDLEWARE
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cors());
app.use(errorHandler);

// 3. Routes
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/login", authRouter);
app.use("/api/v1/transactions", transactionRouter);

// 4. Start the server
module.exports = app;
