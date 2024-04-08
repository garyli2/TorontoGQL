import { ApolloServer } from "npm:@apollo/server";
import { expressMiddleware } from "npm:@apollo/server/express4";
import cors from "npm:cors";
import express from "npm:express";
import http from "node:http";
import https from "node:https";
import { DateResolver } from "npm:graphql-scalars";
import { resolve } from "https://deno.land/std@0.203.0/path/resolve.ts";
import { Resolvers } from "./generated/graphql.ts";
import ferryTicketCounts from "./resolvers/ferry-ticket-counts.ts";
import bikeShareStations from "./resolvers/bike-share.ts";
import bikeStationTrends from "./resolvers/bike-station-trends.ts";

const configurations = {
  production: { ssl: true, port: 443, hostname: "graphql.howstoronto.ca" },
  development: { ssl: false, port: 4000, hostname: "localhost" },
};

const environment = Deno.env.get("NODE_ENV") === "production"
  ? "production"
  : "development";
const config = configurations[environment];

const __dirname = new URL(".", import.meta.url).pathname;
const decoder = new TextDecoder("utf-8");
const typeDefs = decoder.decode(
  Deno.readFileSync(resolve(__dirname, "./schema.graphql")),
);
const resolvers: Resolvers = {
  DateTime: DateResolver,
  Query: {
    ferryTicketCounts: ferryTicketCounts,
    bikeShareStations: bikeShareStations,
    bikeStationTrends: bikeStationTrends,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
await server.start();

const app = express();
// our express server is mounted at /graphql
app.use(
  "/",
  cors<cors.CorsRequest>(),
  express.json(),
  // @ts-expect-error weird TS error
  expressMiddleware(server),
);

// Create the HTTPS or HTTP server, per configuration
let httpServer;
if (config.ssl) {
  httpServer = https.createServer(
    {
      key: decoder.decode(
        Deno.readFileSync("/ssl/live/graphql.howstoronto.ca/privkey.pem"),
      ),
      cert: decoder.decode(
        Deno.readFileSync("/ssl/live/graphql.howstoronto.ca/cert.pem"),
      ),
    },
    app,
  );
} else {
  httpServer = http.createServer(app);
}

await new Promise<void>((resolve) =>
  httpServer.listen({ port: config.port }, resolve)
);

console.log(
  "🚀 Server ready at",
  `http${config.ssl ? "s" : ""}://${config.hostname}:${config.port}/`,
);
