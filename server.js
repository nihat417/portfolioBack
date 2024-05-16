require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");
const DATABASE_URL = process.env.CONNECTION_STRING;
const cluster = require("cluster");
const os = require("os");
 
const app = express();
const cpuNum = os.cpus().length;
 
app.use(express.json());
app.use(cors());
 
if (cluster.isMaster) {
  for (let i = 0; i < cpuNum; i++) {
    cluster.fork();
  }
 
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker with pid ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  app.listen(4000, () => {
    console.log(`Server running on ${process.pid} @ 4000`);
  });
}
 
mongoose
  .connect('mongodb+srv://akreminihat:Admin12!@portfolioclaster.xc2npep.mongodb.net/?retryWrites=true&w=majority&appName=portfolioclaster')
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Error connecting to MongoDB Atlas:", err));

console.log('MongoDB URI:', process.env.MONGODB_URI);

 

app.use("/blogs", blogRoutes);
app.use("/auth", authRoutes);