import connectDb from "@/mongodb/connectdb";
import UserData from '../../../mongodb/UserModel';


export default async function handler(req, res) {

    let db_res = await connectDb();
    if (db_res === 'connected'&&req.method==="POST") {
        let User = req.body;
        let email = User?.email;
        try {
            await UserData.findOneAndUpdate({email}, User);
            console.log("Updation is done")
            res.status(200).json("Update Operation is done.");
        } catch (error) {
            console.log(error)
            res.status(200).json("Update Operation is failed.");
        }
    } else if (req.method!=="POST") {
        res.status(200).json("This is not allowed");
    }else{
        res.status(200).json(db_res);
    }

}