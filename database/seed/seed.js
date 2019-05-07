const { User, Comment, Thread } = require('../models');

const seedUser = [
  {
    id: 1,
    name: 'ifklotsOfGirls',
    hash_password: '1234'
  },
  {
    id: 2,
    name: 'WhiteKnight',
    hash_password: 'imaniceguy'
  },
  {
    id: 3,
    name: 'aznbbygurl',
    hash_password: 'lashes'
  }
];

const seedThread = [
  {
    id: 1,
    title: 'Are ABGs actually hot?',
    description:
      "ABGs are known to be very hot asian girls and I've always thought of them as such. However, I recently saw one of my ABG friends without her make up and holy shit I was shook. What do you guy think?",
    comment_count: 2,
    userId: 1
  },
  {
    id: 2,
    title: 'Do I have a small dick?',
    description:
      'I dunno if its porn thats distorting my view of how big dicks should be but after watching a shit load of porn, I am feeling very insecure. Anyone else feel the same way?',
    comment_count: 1,
    userId: 2
  }
];

const seedComment = [
  {
    id: 1,
    text:
      'Lmao who da fk cares how they look without makeup. If they hot with makeup then dw about it',
    userId: 3,
    threadId: 1
  },
  {
    id: 2,
    text:
      'All girls are beautiful, makeup or without makeup. Stop holding girls to unrealistic standards where they have to be compared to models all the time',
    userId: 2,
    threadId: 1
  },
  {
    id: 3,
    text: 'Ya bruh you just have a small dick. Dont know wat to say',
    userId: 1,
    threadId: 2
  }
];

const seed = async () => {
  // await User.sync({ force: false });
  await User.bulkCreate(seedUser);
  console.log('Users seeded!');
  
  // await Thread.sync({ force: false });
  await Thread.bulkCreate(seedThread);
  console.log('Threads seeded!');
  
  // await Comment.sync({ force: false });
  await Comment.bulkCreate(seedComment);
  console.log('Comments seeded!');
}

seed();

