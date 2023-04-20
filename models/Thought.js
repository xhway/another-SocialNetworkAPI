const { Schema, model, Types } = require("mongoose");
//setup dateFormat file in utils folder
const dateFormat = require("../utils/dateFormat");

const ReactionSchema = new Schema(
    {
        reactionId: {
            //Mongoose's ObjectId data type
            type:Schema.Types.ObjectId,
            // Default value set to a new ObjectId
            default:() => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username:{
            type:String,
            required: true,
        },
        createdAt:{
            type: Date,
            //Default value set to the current timestamp
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp),
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

const ThoughtSchema = new Schema(
    {
        thoughtText:{
            type: String,
            required:"Thought is Required",
            minlength: 1,
            maxLength: 280,
        },
        createdAt:{
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp),
        },
        username:{
            type: String,
            required: true,
        },
        //Array of nested docs created with the reaction schema
        reactions: [ReactionSchema],
    },
    {
        toJSON:{
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

ThoughtSchema.virtual("reactionCount").get(function(){
    return this.reactions.length;
});
const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;