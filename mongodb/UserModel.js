import { Schema, model, models } from 'mongoose' ;
const UserSchema = new Schema({

    name: {type: String,required:true},
    email: {type: String,unique:true},
    password:{type : Array ,required:true},
    image:{type : Array , default : []},
    isLogin:{type:Boolean,default:false},
    isAdmin:{type:Boolean,default:false}

}, { timestamps: true });

const UserData = models.UserData || model('UserData', UserSchema);
export default UserData;