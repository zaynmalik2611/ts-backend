import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    content: 'string',
    created_at: 'Date'
});
const Post =  mongoose.model('Post', PostSchema);
export default Post;