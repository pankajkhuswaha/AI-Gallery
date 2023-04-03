import { Configuration, OpenAIApi } from "openai";
export default async function handler(req, res) {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    if (req.method === "POST") {
        const { prompt } = req.body
        try {
            const response = await openai.createImage({
                prompt,
                n: 2,
                size: "1024x1024",
            })
            res.status(200).json(response.data.data)

        } catch (error) {
            res.status(200).json(error.message)
            
        }
    }
    else {
        res.status(200).json({ error: 'This operation is not allowed' })
    }


}