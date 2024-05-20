import moment from "moment";
import mongoose from "mongoose";

// Create Schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["MainJuin", "SubJuin", "User"],
        default: "User",
    },
    register_date: {
        type: Date,
        // default: Date.now,
        default: moment().format("YYYY-MM-DD hh:mm:ss"),
    },
    // 일대다 관계의 데이터를 다루는 방법
    comment: [
        {
            post_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "posts",
            },
            comment_id:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "comments",
            },
        },
    ],
    // post는 여러개 있을 수 있으므로 배열 형태로 만든데
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "post",
        },
    ],
});

// User라고 부를땐 user, UserSchema를 참조하겠다는 의미
const User = mongoose.model("user", UserSchema);

export default User;