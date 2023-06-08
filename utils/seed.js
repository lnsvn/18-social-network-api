const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { getRandomUser, getRandomThought } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  await User.deleteMany({});

  await Thought.deleteMany({});

  const users = [];

  for (let i = 0; i < 7; i++) {
    const username = getRandomUser();
    const email = username.replace(" ") + "@email.com";

    const thought = await Thought.create({
      thoughtText: getRandomThought(),
      username,
    });

    users.push({
      username,
      email,
      thoughts: [thought.thoughtText],
    });
  }

  await User.collection.insertMany(users);

  console.table(users);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
