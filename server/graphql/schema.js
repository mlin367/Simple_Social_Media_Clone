const graphql = require('graphql');

const { 
  GraphQLObjectType, 
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLInt
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