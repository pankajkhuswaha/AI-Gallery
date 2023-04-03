import { Schema, model, models } from 'mongoose' ;
const PostSchema = new Schema({
    postedBy: {type: String,required:true},
    userimage: {type: String},
    prompt:{type: String ,required:true,unique:true},
    imageurl:{type: String,required:true,unique:true},
}, { timestamps: true });

const PostData = models.PostData || model('PostData', PostSchema);
export default PostData;