import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";

// Create Web App
const server = express();

// Set views for ejs
server.set("view engine", "ejs")

// Configure .env files
dotenv.config();

// Middleware for web security
server.use(helmet());

// Middleware for cross-origin resources
server.use(cors());

// Configure middleware for JSON, public folder, and parsing body
server.use(express.static("public"));
server.use(express.json());
server.use(express.urlencoded({extended:true}))

// Global Error Handling
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something unusual occurred");
});

// Log http request
server.use(morgan("tiny"));


// Landing page
server.route("/")
.get(async (req, res) => {

});

server.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});