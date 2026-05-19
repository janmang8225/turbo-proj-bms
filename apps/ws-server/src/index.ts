// import { WebSocketServer } from "ws";
// import { prisma } from "@repo/db/client"


// const server = new WebSocketServer({port: 3001})

// server.on("connection", async (socket) => {
//     const res = await prisma.user.create({
//         data: {
//             username: Math.random().toString(),
//             password: Math.random().toString()
//         }
//     })

//     socket.send("hi, ws server created user: " + res.id.toString())
// })
import "dotenv/config";
import { WebSocketServer } from "ws";
import { prisma } from "@repo/db/client";

const server = new WebSocketServer({ port: 3001 });

server.on("connection", async (socket) => {
  try {
    const res = await prisma.user.create({
      data: {
        username: Math.random().toString(),
        password: Math.random().toString(),
      },
    });
    socket.send("hi, ws server created user: " + res.id.toString());
  } catch (error: any) {
    console.error("Full error:", JSON.stringify(error, null, 2));
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    console.error("Error meta:", error.meta);
    socket.send("error: " + (error.message || "failed to create user"));
    socket.close();
  }
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});