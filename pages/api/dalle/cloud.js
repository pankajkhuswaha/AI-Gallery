const cloudinary = require('cloudinary').v2;
export default async function handler(req, res) {
    // Configuration 
    cloudinary.config({
        cloud_name: "dav1yhswi",
        api_key: "914453746899229",
        api_secret: "Vs9sw41vERd3W1PXcRfIQtntj5g"
    });

    if (req.method === "POST") {
        const { url, prompt } = req.body
        console.log(req.body)
        try {
            const response = await cloudinary.uploader.upload(url, { public_id: prompt.trim() });
            console.log(response)
            res.status(200).json(response.secure_url);
        } catch (error) {
            console.log(error)
            res.status(200).json(error.response.message);
        }
    } else {
        res.status(200).json("This operation is not allowed");
    }

}