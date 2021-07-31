import "reflect-metadata";
import express = require("express");
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { User } from "./entity/User";
import { buildSchema } from "type-graphql";
import { HandShakeResolver } from "./resolvers/HandShakeResolver";

//
// ─── IOC ────────────────────────────────────────────────────────────────────────
//
import { Container } from "typedi";
import { UserResolver } from "./resolvers/UserResolver";
// ────────────────────────────────────────────────────────────────────────────────

//
// ─── CONSTANT ───────────────────────────────────────────────────────────────────
//
const PORT = 4000;
// ────────────────────────────────────────────────────────────────────────────────

// IIFE XD
(async () => {
  const app = express();

  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HandShakeResolver, UserResolver],
      container: Container, // di container
    }),
    context: ({ req, res }) => ({ req, res }),
  });
  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: true });

  app.listen(PORT, () => {
    console.log(`Express server is currently running in port ${PORT}`);
    console.log(
      `🚀 GQL SERVER at http://localhost:${PORT}${apolloServer.graphqlPath}`
    );
  });
})();
