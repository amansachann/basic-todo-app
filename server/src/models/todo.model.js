import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema({
    title: {
        
    }
});

export const Todo = mongoose.model("Todo", todoSchema);
