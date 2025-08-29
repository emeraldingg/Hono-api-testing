import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import { serve } from "@hono/node-server";

const PORT = Number(process.env.PORT) || 3000;
const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    throw new Error("API_KEY is not set in environment variables");
}

const app = new Hono();

app.use("*", bearerAuth({ token: API_KEY }));

app.get("/", (c) => {
    return c.text("Hello, Hono!");
});

const server = serve({
    fetch: app.fetch,
    port: PORT,
}, (info) => {
    console.log(`Listening on http://localhost:${info.port}!`); // Listening on http://localhost:3000
});


// graceful shutdown
process.on("SIGINT", () => {
    server.close();
    process.exit(0);
});
process.on("SIGTERM", () => {
    server.close((err) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        process.exit(0);
    });
});
