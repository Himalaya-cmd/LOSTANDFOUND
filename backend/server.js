require("dotenv").config();

const express = require("express");
const cors = require("cors");   // 👈 YAHAN

const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors({
  origin: "*"
}));   // 👈 YAHAN (middleware section)

app.use(express.json());

app.use("/api", require("./routes/auth"));
app.use("/api/items", require("./routes/items"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server running"));