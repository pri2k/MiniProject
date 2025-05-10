import { Schema, models, model } from "mongoose";

const messageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    sentAt: {
        type: Date,
        default: Date.now,
    }
}, { _id: false });

const chatSchema = new Schema({
    participants: {
        type: [Schema.Types.ObjectId],
        ref: "User",
    },
    messages: [messageSchema]
}, { timestamps: true });

chatSchema.index({ participants: 1 }, { unique: true });

const Chat = models.Chat || model("Chat", chatSchema);
export default Chat;
