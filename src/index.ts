import "reflect-metadata";
import express = require("express");
import { createConnection, useContainer } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HandShakeResolver } from "./resolvers/HandShakeResolver";

import * as dotenv from 'dotenv'

//
// ─── IOC ────────────────────────────────────────────────────────────────────────
//
import { Container } from "typedi";
import { Container as ORMDIContainer } from "typeorm-typedi-extensions";
import { UserResolver } from "./resolvers/UserResolver";
import { RedirectionResolver } from "./resolvers/RedirectionResolver";
// ────────────────────────────────────────────────────────────────────────────────

//
// ─── FORMATTER ──────────────────────────────────────────────────────────────────
//
import { ApolloFormatErrorPipe } from "./formatter/apollo.formatError";
// ────────────────────────────────────────────────────────────────────────────────

//
// ─── CONSTANT ───────────────────────────────────────────────────────────────────
//
const PORT = process.env.PORT || 4000;
// ────────────────────────────────────────────────────────────────────────────────

//
// ─── LOAD ENV INTO THE PROCESS SCOPE ────────────────────────────────────────────
//
dotenv.config();
// ────────────────────────────────────────────────────────────────────────────────


// IIFE XD
(async () => {
  const app = express();


  useContainer(ORMDIContainer);
  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HandShakeResolver, UserResolver,RedirectionResolver],
      container: Container, // di container
    }),
    context: ({ req, res }) => ({ req, res }),
    formatError: ApolloFormatErrorPipe,
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
