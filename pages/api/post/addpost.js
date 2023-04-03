import connectDb from "@/mongodb/connectdb";
import PostData from '../../../mongodb/PostModel';


export default async function handler(req, res) {

    let db_res = await connectDb();
    if (db_res === 'connected') {
        if (req.method === 'POST') {
            let Posts
            if (req.body.length === undefined) {
                Posts = [req.body]
            } else {
                Posts = req.body
            }
            console.log(req.body)
            for (let i = 0; i < Posts.length; i++) {
                const element = new PostData({
                    postedBy:Posts[i].postedBy,
                    userimage:Posts[i].userimage,
                    prompt:Posts[i].prompt,
                    imageurl:Posts[i].url,
                })
                try {
                    await element.save()
                    res.status(200).json("Post is added Sucessfull");

                } catch (error) {
                    // console.log(error.message)
                    res.status(200).json(error.message);
                }
            }
        } else {
            res.status(200).json("This operation is not allowed");
        }
    } else {
        res.status(200).json(db_res);
    }

}