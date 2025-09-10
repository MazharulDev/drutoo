import mongoose from "mongoose";
import app from "./app";
import config from "./config";
// import { errorlogger, logger } from "./shared/logger";
import { Server } from "http";
import http from "http";
import { Server as SocketIOServer } from "socket.io";

const httpServer = http.createServer(app);
export const io = new SocketIOServer(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Socket.io connection handling
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Join user to a room based on their mobile number
  socket.on("join", (userData) => {
    if (userData && userData.mobile) {
      socket.join(userData.mobile);
      console.log(`User ${userData.mobile} joined their room`);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
import seedAdmin from "./DB";

process.on("uncaughtException", (error) => {
  console.log(error); //errorlogger.error
  process.exit(1);
});

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    await seedAdmin();
    console.log(`Database is connected`); // logger.info

    server = app.listen(config.port, () => {
      console.log(`Application app listening on port ${config.port}`); //logger.info
    });
  } catch (error) {
    console.log("Failed to connect", error); //errorlogger.error
  }

  process.on("unhandledRejection", (error) => {
    if (server) {
      server.close(() => {
        console.log(error); //errorlogger.error
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main();

// process.on('SIGTERM', () => {
//   logger.info('SIGTERM is received');
//   if (server) {
//     server.close();
//   }
// });
