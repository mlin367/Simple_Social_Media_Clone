const graphql = require('graphql');
const { User, Comment, Thread } = require('../../database/models');

const { 
  GraphQLObjectType, 
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLList
} = graphql;

const findOneById = async (Model, id) => {
  let result = await Model.findOne({
    raw: true,
    where: {
      id
    }
  });
  return result;
}

const findAllById = async (Model, id) => {
  let result = await Model.findAll({
    raw: true,
    where: {
      id
    }
  });
  return result;
}

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    id: { type: GraphQLID },
    text: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return findOneById(User, parent.userId);
      }
    },
    thread: {
      type: ThreadType,
      resolve(parent, args) {
        return findOneById(Thread, parent.threadId);
      }
    }
  })
});

const ThreadType = new GraphQLObjectType({
  name: 'Thread',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    description: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return findOneById(User, parent.userId);
      }
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parent, args){
        return findAllById(Thread, parent.id);
      }
    }
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    hash_password: { type: GraphQLString },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parent, args){
        return findAllById(Comment, parent.id);
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    comment: {
      type: CommentType,
      args: { id: { type: GraphQLID }},
      resolve: (parent, args) => {
        return findOneById(Comment, args.id);
      }
    },
    thread: {
      type: ThreadType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        return findOneById(Thread, args.id);
      }
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        return findOneById(User, args.id);
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve: async (parent, args) => {
        let result = await User.create({ name: args.name, hash_password: args.password});
        return result.get({ plain: true });
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})