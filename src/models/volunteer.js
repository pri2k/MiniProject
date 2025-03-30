import { Schema, models, model } from "mongoose";

const volunteerSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    image: { 
        type: String 
    },
    age: { 
        type: Number, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    problem: { 
        type: [String], 
        required: true 
    },
    chatCnt: { 
        type: Number, 
        default: 0 
    },
    availability: { 
        type: Boolean, 
        default: true 
    },
}, { timestamps: true });

const Volunteer = models.Volunteer || model("Volunteer", volunteerSchema);
export default Volunteer;
