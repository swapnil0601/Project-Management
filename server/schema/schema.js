import { projects, clients } from "./SampleData.js";

import Client from "../models/Client.js";
import Project from "../models/Project.js";

import {
  GraphQLID,
  GraphQLString,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
} from "graphql";

//Client Type
const ClientType = new GraphQLObjectType({
  name: "Client",
  description: "This represents a Client of a project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

//Project Type
const ProjectType = new GraphQLObjectType({
  name: "Project",
  description: "This represents a Project assigned to a client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve: (parent, args) => {
        return Client.findById(parent.clientId);
      },
    },
  }),
});

//Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Root Query",
  fields: {
    projects: {
      type: new GraphQLList(ProjectType),
      resolve: (parent, args) => {
        return Project.find();
      },
    },
    clients: {
      type: new GraphQLList(ClientType),
      resolve: (parent, args) => {
        return Client.find();
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return Project.findById(args.id);
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return Client.findById(args.id);
      },
    },
  },
});

//Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
      },
      resolve(parent, args) {
        let client = {
          name: args.name,
          email: args.email,
          phone: args.phone,
        };
        clients.push(client);
        return client;
      },
    },
    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        clientId: { type: GraphQLID },
      },
      resolve(parent, args) {
        let project = {
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
        };
        projects.push(project);
        return project;
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
});
