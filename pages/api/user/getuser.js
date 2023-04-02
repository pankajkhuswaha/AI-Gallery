import connectDb from "@/mongodb/connectdb";
import UserData from '../../../mongodb/UserModel';


export default async function handler(req, res) {

    let db_res = await connectDb();
    if (db_res === 'connected') {
        const data = await UserData.find();
        let product = JSON.parse(JSON.stringify(data))
        res.status(200).json(product);
    } else {
        res.status(200).json(db_res);
    }

}