const { Thought, User } = require("../models");

module.exports = {
  // get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find({});
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // get a single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).select("-__v");

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);

      await User.findOneAndUpdate(
        { username: thought.username },
        { $addToSet: { thoughts: thought } },
        { runValidators: true, new: true }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // update a thought
  async updateThought (req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        );

        if (!thought) {
            res.status(404).json({ message: "No thought with that ID" });
        };
        
        res.json(thought);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
  },
  // delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        res.status(404).json({ message: "No thought with that ID" });
      }

      res.json({ message: "Thought successfully deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a reaction
  async createReaction (req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        );

        if (!thought) {
            res.status(404).json({ message: "No thought with that ID" });
        };

        res.json(thought);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
  },
  // delete a reaction
  async deleteReaction (req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.params.reactionId } } },
            { runValidators: true, new: true}
        );

        if (!thought) {
            return res.status(404).json({ message: "No thought or reaction found with that ID"});
        };

        res.json({ message: "Reaction successfully deleted!" });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
  }
};
