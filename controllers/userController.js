const { User, Thought } = require("../models");

module.exports = {
  // get all users
  async getUsers(req, res) {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate("thoughts")
      .populate("friends");

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json({
        user,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // update a user
  async updateUser (req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: "No user with that ID" });
      };

      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    };
  },
  // delete a user and their thoughts
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({
        _id: req.params.userId,
      });

      if (!user) {
        return res.status(404).json({ message: "No such user exists" });
      }

      const thoughts = await Thought.findOneAndUpdate(
        { users: req.params.username },
        { $pull: { users: req.params.username } },
        { new: true }
      );

      if (!thoughts) {
        return res.status(404).json({
          message: "User deleted, but no thoughts found",
        });
      }

      res.json({ message: "User successfully deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // add a friend
  async addFriend (req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true , new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: "No user with that ID",
        });
      };

      res.json(user);

    } catch (err) {
      console.log(err);
      res.status(500).json(err); 
    }
  },
  // delete a friend
  async deleteFriend (req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true , new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: "No user with that ID",
        });
      };

      res.json(user);

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
