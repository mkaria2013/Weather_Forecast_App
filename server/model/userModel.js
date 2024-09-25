import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    city: {
        type: String,
        trim: true,
        require: true
    }
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (e) {
        console.log(`Password not hashed due to technical error: ${e}`);
    }
})

userSchema.methods.verfiyPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

export default mongoose.model('Users', userSchema);