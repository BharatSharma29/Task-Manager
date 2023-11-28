const express = require("express");
const app = express();
const taskRouter = require("./routes/tasks");
const connectDb = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

app.use(express.static("./public"));
app.use(express.json());
app.use("/api/v1/tasks", taskRouter);

//routes
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, console.log(`Server listening at port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
