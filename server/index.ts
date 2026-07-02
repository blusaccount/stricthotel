import { createServer } from "node:http";
import { Server } from "socket.io";
import type { ClientToServerEvents, ServerToClientEvents } from "../shared/types";
import { DEFAULT_SERVER_PORT } from "../shared/types";
import { HubRoom } from "./rooms/HubRoom";

const httpServer = createServer((req, res) => {
  // Health-Check-Endpoint für Render.com
  if (req.url === "/healthz") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("ok");
    return;
  }
  res.writeHead(404);
  res.end();
});

const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
  cors: { origin: "*" },
});

const hub = new HubRoom(io);
io.on("connection", (socket) => hub.handleConnection(socket));

const port = Number(process.env.PORT ?? DEFAULT_SERVER_PORT);
httpServer.listen(port, () => {
  console.log(`[server] hub listening on :${port}`);
});
