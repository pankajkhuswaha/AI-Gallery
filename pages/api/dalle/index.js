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
                'X-RapidAPI-Key': '48b0c780f6msha58c62cd28c996ap126f2ajsndad660f4f935',
                'X-RapidAPI-Host': 'openai80.p.rapidapi.com'
            },
            data: JSON.stringify(datas)
        };

        axios.request(options).then(function (response) {
            res.status(200).json(response.data.data);
        }).catch(function (error) {
            console.log(error.message)
            res.status(200).json(error.message);
        });

    } else {
        res.status(200).json("This is not allowed");
    }
}