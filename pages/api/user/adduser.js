import connectDb from "@/mongodb/connectdb";
import UserData from '../../../mongodb/UserModel';


export default async function handler(req, res) {

    let db_res = await connectDb();
    if (db_res === 'connected') {
        if (req.method === 'POST') {
            let Users
            if (req.body.length === undefined) {
                Users = [req.body]
            } else {
                Users = req.body
            }
            for (let i = 0; i < Users.length; i++) {
                const element = new UserData({
                    name:Users[i].name,
                    email:Users[i].email,
                    image:Users[i].image,
                    password:Users[i].password,
                    isAdmin:Users[i].isAdmin,
                    loggedIn:Users[i].loggedIn,
                })
                try {
                    await element.save().then(console.log("Saved"))
                    res.status(200).json("User is added Sucessfull");
    
                } catch (error) {
                    let err ="Add Product failed"
                    res.status(200).json([err,error]);    
                }
            }    
        } else {
            res.status(200).json("This operation is not allowed");
        }
    } else {
        res.status(200).json(db_res);
    }

}