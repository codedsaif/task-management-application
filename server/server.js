const cors = require("cors");
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();

const server = new createServer(app);

const io = new Server(server, {
  cors: {
    // origin: "http://localhost:3000",
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  },
});

const dotenv = require("dotenv");
dotenv.config();
const morgan = require("morgan");

// db and authenticateUser
const connectDB = require("./db/connect");

// routers
const authRouter = require("./routes/authRoutes.js");
const taskRouter = require("./routes/taskRoutes.js");

if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "Welcome!" });
});
app.get("/api/v1", (req, res) => {
  res.json({ msg: "Version 1 API" });
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/task", taskRouter);

app.all("*", (request, response) => {
  response.json({ msg: "Sorry route doesn't exist" });
});

// socket.io
// you can also use middleware
io.use((socket, next) => {
  next();
});

io.on("connection", (socket) => {
  // console.log("a user connected socket.id", socket.id);
  // Sending data on connect
  // socket.emit("welcome", `Welcome to the server ${socket.id}`);
  // Sending data to others
  // socket.broadcast.emit(
  //   "welcomeOthers",
  //   `Welcome ${socket.id} join the server`
  // );
  // Receiving data on message event
  // socket.on("message", (data) => {
  //   console.log("message date", data);
  //   // Sending this message to others
  //   // io.emit("receiving-message", data); // it's send also self and others
  //   // socket.broadcast.emit("receiving-message", data); // it's send only others but all
  //   socket.to(data?.room).emit("receive-message", data); // sending data only in room. room can be an array or string
  // });
  // for group
  // socket.on("join-room", (room) => {
  //   socket.join(room);
  //   console.log(`User joined room ${room}`);
  // });
  // Getting id when disconnect
  // socket.on("disconnect", () => {
  //   console.log(`User Disconnected ${socket.id}`);
  // });

  socket.on("database-update", () => {
    socket.broadcast.emit("get-updated-data");
  });
});

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    server.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
