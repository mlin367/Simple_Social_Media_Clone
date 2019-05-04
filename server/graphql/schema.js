const graphql = require('graphql');
const { User, Comment, Thread } = require('../../database/models');

const { 
  GraphQLObjectType, 
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
} = graphql;

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    id: { type: GraphQLID },
    text: { type: GraphQLString },
    created: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {

      }
    },
    thread: {
      type: ThreadType,
      resolve(parent, args) {

      }
    }
  })
});

const ThreadType = new GraphQLObjectType({
  name: 'Thread',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    created: { type: GraphQLString },
    description: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {

      }
    }
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    password: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    comment: {
      type: CommentType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {

      }
    },
    thread: {
      type: ThreadType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {

      }
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {

      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})