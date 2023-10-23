const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // TODO: use a getter method to format the timestamp on query
        },
        username: {
            type: String,
            required: true,
        },
        // Array of nested documents created with reactionSchema
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
    );

thoughtSchema
.virtual('reactionCount')
.get(function () {
    // returning the reactions length for this thought
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;