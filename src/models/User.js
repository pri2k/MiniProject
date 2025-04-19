import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
    username: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    image: { 
        type: String  
    },
}, { timestamps: true });

// Delete the associated volunteer when a user is deleted
userSchema.pre("findOneAndDelete", async function (next) {
    const user = await this.model.findOne(this.getFilter());
    if (user) {
        const Volunteer = (await import("./volunteer.js")).default;
        await Volunteer.findOneAndDelete({ userId: user._id });
        // The volunteer hook will take care of deleting related Calls
    }
    next();
});

const User = models.User || model("User", userSchema);
export default User;
