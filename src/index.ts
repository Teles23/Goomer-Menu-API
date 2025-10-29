import "dotenv/config";
import server from "./server/server.js";

const port = Number(process.env.PORT);

server.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
