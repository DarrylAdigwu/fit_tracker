import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import session from "express-session";
import mysql from "mysql2";
import MySQLStore from "express-mysql-session";


// Create Web App
const server = express();

// Configure .env files
dotenv.config();

// Configure Database
const options = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}

//Create SQL connection pool
const SQLStore = MySQLStore(session);
const dbPool = mysql.createPool(options).promise();

// Create MySQLStore 
const sessionStore = new SQLStore({}, dbPool);

// Create Session
server.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  },
}));

// Set views for ejs
server.set("view engine", "ejs")

// Middleware for web security
server.use(helmet());

// Middleware for cross-origin resources
const corsOptions = {
  origin: ["http://localhost:5173"],
}
server.use(cors(corsOptions));

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
server.use(morgan("dev"))

// Landing page
server.route("/")
.get(async (req, res) => {
  res.send("landing page")
});

server.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});