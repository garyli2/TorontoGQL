import { ApolloServer } from "npm:@apollo/server";
import { startStandaloneServer } from "npm:@apollo/server/standalone";
import { resolve } from "https://deno.land/std@0.203.0/path/resolve.ts";
import { DateResolver } from "npm:graphql-scalars";
import { Resolvers } from "./generated/graphql.ts";
import ferryTicketCounts from "./resolvers/ferry-ticket-counts.ts";
import bikeShareStations from "./resolvers/bike-share.ts";
import { startBikeShareAggregator } from "./aggregator/bike-share-aggregator.ts";
import bikeStationTrends from "./resolvers/bike-station-trends.ts";

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
    bikeStationTrends: bikeStationTrends
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// @ts-ignore weird apollo TS error
const { url } = await startStandaloneServer(server);
console.log(`🚀  Server ready at: ${url}`);

// start interval aggregators
startBikeShareAggregator();
