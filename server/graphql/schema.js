const graphql = require('graphql');
const { User, Comment, Thread } = require('../../database/models');
const bcrypt = require('bcrypt');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean
} = graphql;

const findOneById = async (Model, id) => {
  let result = await Model.findOne({
    raw: true,
    where: {
      id
    }
  });
  return result;
};


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
    comment_count: { type: GraphQLInt },
    user: {
      type: UserType,
      resolve(parent, args) {
        return findOneById(User, parent.userId);
      }
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve: async (parent, args) => {
        let result = await Comment.findAll({
          raw: true,
          where: {
            threadId: parent.id
          }
        });
        return result;
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
      resolve: async (parent, args) => {
        let result = await Comment.findAll({
          raw: true,
          where: {
            userId: parent.id
          }
        });
        return result;
      }
    }
  })
});

const AuthType = new GraphQLObjectType({
  name: 'Auth',
  fields: () => ({
    status: { type: GraphQLBoolean },
    userId: { type: GraphQLID }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    comment: {
      type: CommentType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return findOneById(Comment, args.id);
      }
    },
    thread: {
      type: ThreadType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return findOneById(Thread, args.id);
      }
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return findOneById(User, args.id);
      }
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve: async (parent, args) => {
        let result = await Comment.findAll({raw: true});
        return result
      }
    },
    threads: {
      type: new GraphQLList(ThreadType),
      resolve: async (parent, args) => {
        let result = await Thread.findAll({raw: true});
        return result;
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: async (parent, args) => {
        let result = await User.findAll({raw: true});
        return result;
      }
    },
    isLoggedIn: {
      type: AuthType,
      resolve: (parent, args, { session }) => {
        let status, userId;
        if (!session.userId) {
          status = false;
          userId = 0;
        } else {
          status = true;
          userId = session.userId;
        }
        return { status, userId };
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    login : {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve: async (parent, args, { session }) => {
        const user = await User.findOne({ where: { name: args.name }});
        if (!user) return null;
        const userInfo = await user.get({ plain: true });
        console.log(userInfo)
        const isValidPass = await bcrypt.compare(args.password, user.hash_password);
        if (!isValidPass) return null;
        session.userId = userInfo.id;
        return userInfo;
      }
    },
    logout: {
      type: AuthType,
      resolve: async (parent, args, { session }) => {
        session.destroy();
        return { status: false, userId: 0 };
      }
    },
    addUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve: async (parent, args, { session }) => {
        const checkUser = await User.findOne({ where: { name: args.name }});
        if (checkUser) return 'Username already exists!';
        const password = await bcrypt.hash(args.password, 10);
        const user = await User.create({
          name: args.name,
          hash_password: password
        });
        const userInfo = user.get({ plain: true });
        session.userId = userInfo.id;
        return userInfo;
      }
    },
    addThread: {
      type: ThreadType,
      args: {
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        comment_count: { type: GraphQLInt },
        userId: { type: GraphQLID }
      },
      resolve: async (parent, args) => {
        let result = await Thread.create({
          title: args.title,
          description: args.description,
          comment_count: args.comment_count,
          userId: args.userId
        });
        return result.get({ plain: true });
      }
    },
    addComment: {
      type: CommentType,
      args: {
        text: { type: GraphQLString },
        userId: { type: GraphQLID },
        threadId: { type: GraphQLID }
      },
      resolve: async (parent, args) => {
        let result = await Comment.create({
          text: args.text,
          userId: args.userId,
          threadId: args.threadId
        });
        let updateCommentCount = await Thread.findByPk(args.threadId);
        updateCommentCount.increment('comment_count', { by: 1 });
        return result.get({ plain: true });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
