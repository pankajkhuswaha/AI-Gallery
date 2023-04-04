const axios = require("axios");


export default async function handler(req, res) {
    if (req.method === "POST") {
        const prompt = req.body.prompt;
        const datas = {
            prompt,
            n: 2,
            size: "1024x1024"
        }
        const options = {
            method: 'POST',
            url: 'https://openai80.p.rapidapi.com/images/generations',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': process.env.OPENAI_RAPID_API_KEY,
                'X-RapidAPI-Host': 'openai80.p.rapidapi.com'
            },
            data: JSON.stringify(datas)
        };

        axios.request(options).then(function (response) {
            res.status(200).json(response.data.data);
        }).catch(function (error) {
            res.status(500).json(error.response.data.message);
        });

    } else {
        res.status(200).json("This is not allowed");
    }
}