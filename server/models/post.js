import moment from "moment";
import mongoose from "mongoose";

// Create Schema
const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: true,
    },
    contents: {
        type: String,
        required: true,
    },
    views: {
        type: Number,
        default: -2
    },
    fileUrl: {
        type: String,
        default: "http://source.unsplash.com/ramdom/301x201",
    },
    date:{
        type: String,
        default: moment().format("YYYY-MM-DD hh:mm:ss")
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
    },
    comments: [
        {
            post_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "comment",
            },
        },
    ],
    // ref 사용법
    // user.js에서 "user"를 UserSchema에서 참조하겠다고 정의해두었다
    creator: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
    ],
});

const Post = mongoose.model("post", PostSchema);

export default Post;