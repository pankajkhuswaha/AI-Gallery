import connectDb from "@/mongodb/connectdb";
import UserData from '../../../mongodb/UserModel';


export default async function handler(req, res) {

    let db_res = await connectDb();
    if (db_res === 'connected'&&req.method==="POST") {
        let User = req.body
        let email = User?.email
        console.log(User)
        
        try {
            await UserData.findOneAndDelete({email});
            console.log("delation is done")
            res.status(200).json("Delete Operation is done.");
        } catch (error) {
            console.log(error)
            res.status(200).json(error.message);
        }
    } else if (req.method!=="POST") {
        res.status(200).json("This is not allowed");
    }else{
        res.status(200).json(db_res);
    }

}