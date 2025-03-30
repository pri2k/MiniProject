import { Schema, models, model } from "mongoose";

const callSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    volunteerId: { 
        type: Schema.Types.ObjectId, 
        ref: "Volunteer", 
        required: true 
    },
    time: { 
        type: Date, 
        required: true 
    },
    duration: { 
        type: Number, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ["pending", "confirmed", "completed", "cancelled"], 
        default: "pending" 
    },
}, { timestamps: true });

const Call = models.Call || model("Call", callSchema);
export default Call;
