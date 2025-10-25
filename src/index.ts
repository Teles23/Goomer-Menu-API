import "dotenv/config";
import server from "./server/server.js";

const port = process.env.PORT;

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
