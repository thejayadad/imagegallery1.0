import mongoose from "mongoose";

const DonutSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 4
    },
    imageUrl: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: [
            'Hot',
            'Sprinkle',
            'Custom',
            'Filled',
            'Seasonal',
        ]
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: []
    },
    creator: { type: String },
}, {timestamps: true})

export default mongoose?.models?.Donut || mongoose.model("Donut", DonutSchema)