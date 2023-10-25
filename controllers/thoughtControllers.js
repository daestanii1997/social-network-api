const { Thought, Reaction, User } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getOneThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })

            if (!thought) {
                return res.status(400).json({ message: 'no thought found'});
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try {
            const dbUserData = await User.findOne({ _id: req.body.userId })
            if (!dbUserData) {
                return res.status(404).json({ message: 'no user found' });
            }

            const dbThoughtData = await Thought.create(req.body);
            const updateUser = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: dbThoughtData._id }},
                { runValidators: true, new: true }
            )

            res.json(updateUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId},
                { $set: req.body },
                { runValidators: true, new: true}
            );
            if (!thought) {
                return res.status(404).json({ message: 'no thought found'});
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'no thought found' });
            }
            res.json({message: 'thought has been deleted'});
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId},
                { $addToSet: { reactions: req.body }}
            );

            if (!thought) {
                return res.status(404).json({ message: 'no thought found!'});
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: {reactionId: req.params.reactionId }}},
                { runValidators: true, new: true }
            )

            if (!thought) {
                return res.status(404).json({ message: 'no thought found!'});
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};